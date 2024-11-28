using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.ClassSubject
{
    public class CreateClassSubjectRequestDto
    {
        public string AppUserId { get; set; }
        public int SubjectId { get; set; }
        public string Name { get; set; } // Tên lớp môn học


    }
}