using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Newtonsoft.Json;

namespace api.Dtos.Account
{
    public class AccountDto
    {
        public string Id { get; set; } 
        public string RoleName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string UserName { get; set; }
        public string? Name { get; set; }
        public DateTime? BirthDate { get; set; }
        public bool Male { get; set; }
        public string? UrlImage { get; set; }
        public int? ClassId { get; set; }
        public api.Models.Class? Class { get; set; }
        public int? DepartmentId { get; set; }
        public Department? Department { get; set; }
        public int? MajorId { get; set; }
        public api.Models.Major? Major { get; set; }
        public bool IsInternal { get; set; }
        public ICollection<api.Models.Grade>? Grades { get; set; } = new List<api.Models.Grade>();
        public string RefreshToken { get; set; } = string.Empty; // Đảm bảo khởi tạo giá trị
        public DateTime RefreshTokenExpirytime { get; set; }
    }
}