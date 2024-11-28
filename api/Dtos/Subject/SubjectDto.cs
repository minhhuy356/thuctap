using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Schedule;
using api.Models;

namespace api.Dtos.Subject
{
    public class SubjectDto
    {
        public int Id { get; set; }
        public string Name { get; set; }   // TenMonHoc
        public string Code { get; set; }    //Mã môn
        public int CreditHours { get; set; }      // SoTinChi
        public int? DepartmentId { get; set; }
        public Department? Department { get; set; }
        public ICollection<api.Models.Section> Sections { get; set; } = new List<api.Models.Section>();
    }
}