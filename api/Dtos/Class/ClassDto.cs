using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

using api.Models;

namespace api.Dtos.Class
{
    public class ClassDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CourseID { get; set; } // Khóa ngoại liên kết với bảng Khóa Học
        public api.Models.Course Course { get; set; } // Thuộc tính điều hướng
        public int? DepartmentId { get; set; }
        public Department? Department { get; set; }
    }

}