using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Major;
using api.Models;

namespace api.Dtos.Deparment
{
    public class DepartmentDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<MajorDto>? Majors { get; set; } = new List<MajorDto>();
    }
}