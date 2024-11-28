using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Section
    {
        public int Id { get; set; }
        public int SemesterId { get; set; }
        public Semester? Semesters { get; set; }
        public int SubjectId { get; set; }
        public Subject? Subjects { get; set; }
        public string Character { get; set; } = string.Empty;
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
        public ICollection<Schedule>? Schedules { get; set; }  = new List<Schedule>();

    }
}