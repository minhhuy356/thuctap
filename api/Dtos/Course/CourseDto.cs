using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Course
{
    public class CourseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } //Tên khóa học
        public int StartYear { get; set; }
        public int EndYear { get; set; }
    }
}