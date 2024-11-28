using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Models;

namespace api.Interfaces
{
    public interface ITokenService
    {
        Task<TokenDto> CreateToken(AppUser appUser, bool populateExp);
        Task<string> GenerateAccessTokenFromRefreshToken(string refreshToken);
    }
}