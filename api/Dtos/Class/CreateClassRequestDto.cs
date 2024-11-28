using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.Class
{
    public class CreateClassRequestDto
    {
        [Required(ErrorMessage = "Tên lớp là bắt buộc.")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Tên lớp phải có độ dài từ 2 đến 100 ký tự.")]
        public string Name { get; set; }
    }
}