using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Models;
using Microsoft.AspNetCore.Identity;

namespace api.Interfaces
{
    public interface IExternalLoginService
    {
        Task<SignInResult> ExternalLoginAsync(ExternalLoginInfo externalLoginInfo);
        Task<IdentityResult> AddLoginAsync(AppUser user, ExternalLoginInfo loginInfo);
    }
}