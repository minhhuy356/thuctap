using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Schedule;
using api.Models;

namespace api.Dtos.Section
{
    public class SectionDto
    {
        public int Id { get; set; }
        public int SemesterId { get; set; }
        public api.Models.Semester? Semesters { get; set; }
        public int SubjectId { get; set; }
        public api.Models.Subject? Subjects { get; set; }
        public string Character { get; set; } = string.Empty;
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
        public ICollection<ScheduleDto>? Schedules { get; set; }  = new List<ScheduleDto>();
    }
}