using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.ClassSubject
{
    public class ClassSubjectDto
    {
        public string AppUserId { get; set; }
        public int SubjectId { get; set; }
        public string Name { get; set; } // Tên lớp môn học
        public float? Grade { get; set; }
        public bool isDone { get; set; }
        public api.Models.Subject? Subject { get; set; }
        public AppUser? AppUser { get; set; }
    }
}