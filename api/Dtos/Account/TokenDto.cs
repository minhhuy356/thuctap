using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Account
{
    public record TokenDto(string AccessToken, string RefreshToken);
}