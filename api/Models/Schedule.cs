using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    [Table("Schedules")]
    public class Schedule
    {
        public int Id { get; set; }                 // Khóa chính
        public DayOfWeek DayOfWeek { get; set; }    // Ngày học (thứ 2, thứ 5, ...)
        public TimeSpan TimeStart { get; set; }     // Giờ bắt đầu
        public TimeSpan TimeEnd { get; set; }       // Giờ kết thúc
        public int SectionId { get; set; }
        public Section? Sections { get; set; } // Quan hệ tới ClassSubject
    }
}