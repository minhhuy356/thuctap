using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.ClassSubjectStudent
{
    public class UpdateClassSubjectStudentRequestDto
    {
        [Range(0, 10, ErrorMessage = "Điểm số phải nằm trong khoảng từ 0 đến 10.")]
        public float? Grade { get; set; }
    }
}