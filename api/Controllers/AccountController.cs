using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Dtos.Email;

using api.Helper;
using api.Interfaces;
using api.Mappers;
using api.Models;
using api.Service;
using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/account")]
    [ApiController]
    [EnableCors("AllowSpecificOrigin")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _accountRepo;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IEmailService _emailService;
        private readonly IExternalLoginService _externalLoginService;
        public AccountController(IAccountRepository accountRepo, IExternalLoginService externalLoginService, IEmailService emailService, UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _emailService = emailService;
            _externalLoginService = externalLoginService;
            _accountRepo = accountRepo;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var existingEmail = await _userManager.FindByEmailAsync(registerDto.Email);
                if (existingEmail != null)
                {
                    return BadRequest("Email đã được đăng ký.");
                }

                var appUser = new AppUser
                {
                    UserName = registerDto.UserName,
                    Email = registerDto.Email,
                };

                var createUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (createUser.Succeeded)
                {
                    var roleResult = await _userManager.AddToRoleAsync(appUser, "User");


                    if (roleResult.Succeeded)
                    {
                        var tokenDto = await _tokenService.CreateToken(appUser, true);
                        //Token dùng 1 lần để xác nhận email
                        var token = await _userManager.GenerateEmailConfirmationTokenAsync(appUser);

                        // Cập nhật thông điệp email với đường dẫn xác nhận

                        var emailMetadata = new EmailMetadata(
                            appUser.Email,
                            "Xác Nhận Đăng Ký"
                        );

                        await _emailService.SendEmailAsync(emailMetadata, appUser.Id, token);
                        // Tạo token mới


                        return Ok(
                            new NewUserDto
                            {
                                Id = appUser.Id,
                                UserName = appUser.UserName,
                                Email = appUser.Email,
                                Provider = "local",
                                IsVerify = false,
                                Role = "User",
                                Token = tokenDto // Trả về cả AccessToken và RefreshToken
                            }
                        );
                    }
                    else
                    {
                        return StatusCode(500, roleResult.Errors);
                    }
                }
                else
                {
                    return StatusCode(500, createUser.Errors);
                }
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }
        [HttpPost("external-login")]
        public async Task<IActionResult> ExternalLogin(ExternalLoginServiceDto externalLoginServiceDto)
        {
            // Tạo thông tin đăng nhập từ provider
            var loginInfo = new ExternalLoginInfo(null, externalLoginServiceDto.LoginProvider, externalLoginServiceDto.ProviderKey, null);

            // Gọi service để thực hiện đăng nhập ngoài
            var signInResult = await _externalLoginService.ExternalLoginAsync(loginInfo);

            if (!signInResult.Succeeded)
            {
                // Tìm người dùng bằng tên đăng nhập
                var user = await _userManager.FindByNameAsync(externalLoginServiceDto.UserName);

                if (user == null) // Nếu người dùng không tồn tại, tạo mới người dùng
                {
                    user = new AppUser
                    {
                        UserName = externalLoginServiceDto.UserName,
                        Email = externalLoginServiceDto.UserName,
                        EmailConfirmed = true
                    };

                    var createAppUser = await _userManager.CreateAsync(user);

                    if (!createAppUser.Succeeded)
                    {
                        return BadRequest(new { message = "Tạo người dùng thất bại" });
                    }

                    // Gán vai trò mặc định là "User"
                    var addToRoleResult = await _userManager.AddToRoleAsync(user, "User");

                    if (!addToRoleResult.Succeeded)
                    {
                        return BadRequest(new { message = "Gán vai trò thất bại" });
                    }
                }

                // Kiểm tra nếu người dùng đã tồn tại với ProviderKey
                var createUserProvider = await _userManager.FindByLoginAsync(externalLoginServiceDto.LoginProvider, externalLoginServiceDto.ProviderKey);

                if (createUserProvider == null) // Nếu chưa có thông tin đăng nhập cho provider này, thêm mới
                {
                    // Liên kết thông tin đăng nhập với người dùng
                    var addLoginResult = await _externalLoginService.AddLoginAsync(user, loginInfo);

                    if (!addLoginResult.Succeeded)
                    {
                        return BadRequest(new { message = "Liên kết thông tin đăng nhập thất bại" });
                    }
                }

                // Đăng nhập thành công, tạo token và trả về cho frontend
                var tokenDto = await _tokenService.CreateToken(user, true);

                return Ok(new NewUserDto
                {
                    UserName = externalLoginServiceDto.UserName,
                    Email = externalLoginServiceDto.UserName,
                    Provider = externalLoginServiceDto.LoginProvider,
                    IsVerify = true,
                    Role = "User",
                    Token = tokenDto
                });
            }

            // Nếu đăng nhập thành công
            var existingUser = await _userManager.FindByLoginAsync(externalLoginServiceDto.LoginProvider, externalLoginServiceDto.ProviderKey);
            var token = await _tokenService.CreateToken(existingUser, true);

            return Ok(new NewUserDto
            {
                UserName = externalLoginServiceDto.UserName,
                Provider = externalLoginServiceDto.LoginProvider,
                IsVerify = true,
                Role = "User",
                Token = token
            });
        }
        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail([FromQuery] string userId, [FromQuery] string Token)
        {
            var appUser = await _userManager.FindByIdAsync(userId);
            if (appUser == null)
            {
                return BadRequest("User not found.");
            }

            var result = await _userManager.ConfirmEmailAsync(appUser, Token);
            if (result.Succeeded)
            {
                return Redirect("http://localhost:3000/");
            }

            return BadRequest("Email confirmation failed.");
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = await _userManager.Users.FirstOrDefaultAsync(i => i.UserName == loginDto.UserName);

            if (user == null) return Unauthorized("Tài khoản không hợp lệ!");

            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault() ?? "User"; // Gán mặc định là "User" nếu không có vai trò nào

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized("Tên đăng nhập hoặc mật khẩu không hợp lệ!");

            // Tạo token mới
            var tokenDto = await _tokenService.CreateToken(user, true);

            return Ok(
                new NewUserDto
                {
                    UserName = user.UserName,
                    Role = role,
                    Email = user.Email,
                    Token = tokenDto // Trả về cả access token và refresh token
                }
            );
        }// Endpoint để làm mới refresh token
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequestDto requestDto)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.RefreshToken == requestDto.RefreshToken);

            if (user == null || user.RefreshTokenExpirytime <= DateTime.UtcNow)
            {
                return Unauthorized("Refresh token không hợp lệ hoặc đã hết hạn.");
            }

            // Tạo token mới
            var accessToken = await _tokenService.GenerateAccessTokenFromRefreshToken(requestDto.RefreshToken);

            var roles = await _userManager.GetRolesAsync(user);
            var role = roles.FirstOrDefault() ?? "User"; // Gán mặc định là "User" nếu không có vai trò nào

            // Lấy provider từ bảng AspNetUserLogins
            var userLogins = await _userManager.GetLoginsAsync(user); // Khai báo biến userLogins
            var provider = userLogins.FirstOrDefault()?.LoginProvider; // Lấy provider đầu tiên

            return Ok(
                new NewUserDto
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Role = role,
                    IsVerify = user.EmailConfirmed,
                    Provider = provider,
                    Email = string.IsNullOrEmpty(user.Email) ? user.UserName : user.Email,
                    Token = new TokenDto(
                        AccessToken: accessToken,
                        RefreshToken: requestDto.RefreshToken
                    )
                }
            );
        }

        [HttpPost("role")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> SetRole([FromBody] UserRoleDto userRoleDto)
        {
            try
            {
                // Check if the user exists
                var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == userRoleDto.UserName);

                if (user == null) return NotFound("Người dùng không tồn tại");

                // Check if the role exists
                var roleExists = await _userManager.IsInRoleAsync(user, userRoleDto.RoleName);
                if (roleExists) return BadRequest("Người đùng đã có quyền này!");

                // Add user to the specified role
                var result = await _userManager.AddToRoleAsync(user, userRoleDto.RoleName);

                if (!result.Succeeded)
                {
                    return StatusCode(500, result.Errors);
                }

                return Ok($"Người {user.UserName} đà được thêm quyền {userRoleDto.RoleName}");
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        [HttpGet("roles")]
        [Authorize]
        public async Task<IActionResult> GetAllRoles()
        {
            try
            {
                var roles = _roleManager.Roles.ToList();
                return Ok(roles);
            }
            catch (Exception e)
            {
                return StatusCode(500, e.Message);
            }
        }
        
        [HttpPost("addrole")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddRole(AddRoleDto addRoleDto)
        {
            try
            {
                // Kiểm tra xem Role đã tồn tại chưa
                var roleExists = await _roleManager.RoleExistsAsync(addRoleDto.RoleName);
                if (roleExists)
                {
                    return BadRequest("Role đã tồn tại.");
                }

                // Tạo role mới
                var roleResult = await _roleManager.CreateAsync(new IdentityRole(addRoleDto.RoleName));
                if (roleResult.Succeeded)
                {
                    return Ok($"Role {addRoleDto.RoleName} đã được thêm thành công.");
                }
                else
                {
                    // Trả về lỗi nếu có
                    return StatusCode(500, roleResult.Errors);
                }
            }
            catch (Exception ex)
            {
                // Xử lý lỗi và trả về thông báo lỗi nếu có exception
                return StatusCode(500, $"Đã xảy ra lỗi: {ex.Message}");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] AccountQuery query)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var account = await _accountRepo.GetAllAsync(query);

            var accountDto = account.Select(a => a.ToAccountDto());

            return Ok(accountDto);
        }
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] string id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var account = await _userManager.FindByIdAsync(id);

            return Ok(account.ToAccountDto());
        }
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateUser([FromRoute] string id, [FromBody] UpdateAccountRequestDto normalUserDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var accountModel = await _accountRepo.UpdateAsync(id, normalUserDto);

            if (accountModel == null)
            {
                return NotFound();
            }

            return Ok(accountModel.ToAccountDto());
        }
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] string id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);


            var account = await _accountRepo.DeleteAsync(id);

            if (account != null)
            {
                var appUser = await _userManager.FindByIdAsync(account.Id);

                if (appUser == null)
                {
                    return NotFound();
                }

                var result = await _userManager.DeleteAsync(appUser);

                if (result == null)
                {
                    return NotFound();
                }

            }
            return NoContent();
        }
    }

}
