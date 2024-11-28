using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.ClassSubjectStudent
{
    public class ClassSubjectStudentDto
    {
        public int AppUserId { get; set; }
        public int ClassSubjectId { get; set; }
        public float? Grade { get; set; }
    }
}