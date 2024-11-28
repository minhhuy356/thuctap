using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace api.Models
{
    public class Class
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int CourseId { get; set; } // Khóa ngoại liên kết với bảng Khóa Học
        public Course? Course { get; set; } // Thuộc tính điều hướng
        public int? DepartmentId { get; set; }
        public Department? Department { get; set; }
    }

}