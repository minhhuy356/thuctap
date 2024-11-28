using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.Major
{
    public class CreateMajorRequestDto
    {
        [Required(ErrorMessage = "Tên là bắt buộc.")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Tên không được vượt quá 100 ký tự.")]
        public string Name { get; set; }
        [StringLength(1000, ErrorMessage = "Mô tả không được vượt quá 1000 ký tự.")]
        public string? Description { get; set; } = string.Empty;
        [Required]
        public bool IsSet { get; set; }
    }
}