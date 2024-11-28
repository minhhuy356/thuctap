using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Semester
    {
        public int Id { get; set; }              // Primary Key
        public string Name { get; set; }         // TenHocKy
        public string AcademicYear { get; set; } // NamHoc

    }
}