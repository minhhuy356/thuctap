using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;


namespace api.Service
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;
        private readonly UserManager<AppUser> _userManager;
        public TokenService(IConfiguration config, UserManager<AppUser> userManager)
        {
            _config = config;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:SigningKey"]));
            _userManager = userManager;
        }

        public async Task<TokenDto> CreateToken(AppUser user, bool populateExp)
        {
            // Lấy các vai trò của người dùng
            var userRoles = await _userManager.GetRolesAsync(user); // Sử dụng await để tránh deadlock
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.GivenName, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            // Thêm từng vai trò vào claims
            foreach (var role in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = populateExp ? DateTime.UtcNow.AddHours(2) : (DateTime?)null,
                SigningCredentials = creds,
                Issuer = _config["JWT:Issuer"],
                Audience = _config["JWT:Audience"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var accessToken = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));

            // Tạo refresh token
            var refreshToken = GenerateRefreshToken();

            // Cập nhật refresh token và thời gian hết hạn vào AppUser
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpirytime = DateTime.UtcNow.AddDays(30);

            var updateResult = await _userManager.UpdateAsync(user); // Lưu thay đổi vào database

            if (!updateResult.Succeeded)
            {
                throw new Exception("Không thể cập nhật thông tin người dùng."); // Hoặc xử lý lỗi phù hợp
            }

            // Trả về cả access token và refresh token
            return new TokenDto(accessToken, refreshToken);
        }
        public async Task<string> GenerateAccessTokenFromRefreshToken(string refreshToken)
        {
            // Tìm người dùng dựa trên refresh token
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);

            // Kiểm tra xem người dùng có tồn tại và refresh token còn hạn hay không
            if (user == null || user.RefreshTokenExpirytime <= DateTime.UtcNow)
            {
                throw new UnauthorizedAccessException("Refresh token không hợp lệ hoặc đã hết hạn.");
            }

            // Lấy các vai trò của người dùng
            var userRoles = await _userManager.GetRolesAsync(user);
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.GivenName, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            };

            // Thêm các vai trò vào claims
            foreach (var role in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            // Tạo token mới với thời gian hết hạn ngắn (ví dụ: 30 phút)
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(2), // Hoặc thời gian hết hạn bạn muốn cho access token
                SigningCredentials = creds,
                Issuer = _config["JWT:Issuer"],
                Audience = _config["JWT:Audience"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var accessToken = tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));

            // Trả về access token mới
            return accessToken;
        }


        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }

    }
}