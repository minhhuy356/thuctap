using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.ClassSubject
{
    public class UpdateClassSubjectRequestDto
    {
        public string Name { get; set; } // Tên lớp môn học
        public float? Grade { get; set; }
        public bool isDone { get; set; }
    }
}