using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Account
{
    public class NewUserDto
    {
        public string  Id { get; set; }
        public string UserName { get; set; }
        public string? Email { get; set; }
        public string Provider { get; set; }
        public bool IsVerify { get; set; }
        public string Role { get; set; }
        public TokenDto Token { get; set; } // Thay đổi từ string sang TokenDto
    }
}