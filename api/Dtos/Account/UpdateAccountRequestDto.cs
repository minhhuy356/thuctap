using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.Account
{
    public class UpdateAccountRequestDto
    {
        public string? Name { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string UserName { get; set; }
        public bool Male { get; set; }
        public string? UrlImage { get; set; }
        public int? ClassId { get; set; }
        public int? DepartmentId { get; set; }
        public int? MajorId { get; set; }
        public bool IsInternal { get; set; }

    }
}