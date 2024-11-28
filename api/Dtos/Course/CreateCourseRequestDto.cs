using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Common;

namespace api.Dtos.Course
{
    public class CreateCourseRequestDto
    {
        [Required(ErrorMessage = "Tên khóa học là bắt buộc.")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Tên khóa học phải có độ dài từ 1 đến 100 ký tự.")]
        public string Name { get; set; } // Tên khóa học

        [Required(ErrorMessage = "Năm bắt đầu là bắt buộc.")]
        [Range(YearRange.StartYear, YearRange.EndYear, ErrorMessage = "Năm bắt đầu phải nằm trong khoảng từ {1} đến {2}.")]
        public int StartYear { get; set; } // Năm bắt đầu

        [Required(ErrorMessage = "Năm kết thúc là bắt buộc.")]
        [Range(YearRange.StartYear, YearRange.EndYear, ErrorMessage = "Năm bắt đầu phải nằm trong khoảng từ {1} đến {2}.")]
        [GreaterThanYear("StartYear", ErrorMessage = "Năm kết thúc phải lớn hơn năm bắt đầu.")]
        public int EndYear { get; set; } // Năm kết thúc
    }
}