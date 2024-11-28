using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Common;

namespace api.Dtos.Semester
{
    public class UpdateSemesterRequestDto
    {
        [StringLength(100, ErrorMessage = "Tên học kỳ không được vượt quá 100 ký tự.")]
        public string Name { get; set; }
        [Range(YearRange.BeginYear, 9999, ErrorMessage = "Năm học phải lớn hơn hoặc bằng năm hiện tại.")]
        [StringLength(4, ErrorMessage = "Năm học không được vượt quá 4 ký tự.")]
        public string AcademicYear { get; set; }
    }
}