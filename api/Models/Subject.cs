using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Subjects")]
    public class Subject
    {
        public int Id { get; set; }
        public string? Name { get; set; }   // TenMonHoc
        public string Code { get; set; }    //Mã môn
        public int CreditHours { get; set; }      // SoTinChi
        public int? DepartmentId { get; set; }
        public Department? Department { get; set; }
        public ICollection<Section>? Sections { get; set; } = new List<Section>();
       
    }
}