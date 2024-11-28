using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;

namespace api.Service
{
    public class ExternalLoginService : IExternalLoginService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ApplicationDBContext _context;
        public ExternalLoginService(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, ApplicationDBContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
        }

        public async Task<SignInResult> ExternalLoginAsync(ExternalLoginInfo loginInfo)
        {
            // Tìm người dùng dựa trên thông tin provider
            var user = await _userManager.FindByLoginAsync(loginInfo.LoginProvider, loginInfo.ProviderKey);

            if (user != null)
            {
                // Đăng nhập nếu đã có thông tin
                return await _signInManager.ExternalLoginSignInAsync(loginInfo.LoginProvider, loginInfo.ProviderKey, isPersistent: false);
            }

            return SignInResult.Failed;
        }

        public async Task<IdentityResult> AddLoginAsync(AppUser user, ExternalLoginInfo loginInfo)
        {
            // Thêm thông tin đăng nhập của provider vào người dùng
            return await _userManager.AddLoginAsync(user, loginInfo);
        }

    }

}