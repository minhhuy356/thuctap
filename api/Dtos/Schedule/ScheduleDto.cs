using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.Schedule
{
    public class ScheduleDto
    {
        public int Id { get; set; }                 // Khóa chính
        public DayOfWeek DayOfWeek { get; set; }    // Ngày học (thứ 2, thứ 5, ...)
        public TimeSpan TimeStart { get; set; }     // Giờ bắt đầu
        public TimeSpan TimeEnd { get; set; }       // Giờ kết thúc
        public int SectionId { get; set; }
        public api.Models.Section? Sections { get; set; } // Quan hệ tới ClassSubject
    }
}