using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

using api.Models;

namespace api.Dtos.Account
{
    public class RegisterDto
    {
        [Required]
        public string? UserName { get; set; }
        [Required]
        [EmailAddress(ErrorMessage = "Địa chỉ email không hợp lệ.")]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }

    }

}