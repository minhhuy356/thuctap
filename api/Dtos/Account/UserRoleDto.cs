using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Account
{
    public class UserRoleDto
    {
        [Required(ErrorMessage = "Tên đăng nhập không hợp lệ")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Role không hợp lệ")]
        public string RoleName { get; set; }
    }
}