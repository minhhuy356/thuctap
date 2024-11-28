using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace api.Models
{
    public class AppUser : IdentityUser
    {       
        public string? Name { get; set; }
        public DateTime? BirthDate { get; set; }
        public bool Male { get; set; }
        public string? UrlImage { get; set; }
        public int? ClassId { get; set; }
        public Class? Class { get; set; }
        public int? DepartmentId { get; set; }
        public Department? Department { get; set; }
        public int? MajorId { get; set; }
        public Major? Major { get; set; }
        public bool IsInternal { get; set; }
        public ICollection<Grade>? Grades { get; set; } = new List<Grade>();
        public string RefreshToken { get; set; } = string.Empty; // Đảm bảo khởi tạo giá trị
        public DateTime RefreshTokenExpirytime { get; set; }
        [NotMapped]
        public string? RoleName { get; set; } 
    }
}