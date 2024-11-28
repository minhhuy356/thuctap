using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.Major
{
    public class MajorDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; } = string.Empty;
        public int DepartmentId { get; set; }
        public Department? Department { get; set; }
        public bool IsSet { get; set; }
    }
}