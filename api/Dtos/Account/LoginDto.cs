using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Account
{
    public class LoginDto
    {
        [Required(ErrorMessage = "Bạn cần nhập tên đăng nhập!")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Bạn cần nhập mật khẩu!")]
        public string Password { get; set; }
    }
}