using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Major
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; } = string.Empty;
        public int DepartmentId { get; set; }
        public Department Department { get; set; }
        public bool isSet { get; set; } 
    }
}