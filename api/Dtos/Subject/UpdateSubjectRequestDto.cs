using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.Subject
{
    public class UpdateSubjectRequestDto
    {
        [StringLength(100, ErrorMessage = "Tên môn học không được vượt quá 100 ký tự.")]
        public string Name { get; set; }
        [Range(1, 10, ErrorMessage = "Số tín chỉ phải nằm trong khoảng từ 1 đến 10.")]
        public int CreditHours { get; set; }
        public string Code { get; set; }    //Mã môn
        public int? DepartmentId { get; set; }
    }
}