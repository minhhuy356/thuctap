using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Attribute;

namespace api.Dtos.Section
{
    public class CreateSectionRequestDto 
    {   
        public int SemesterId { get; set; }
        public int SubjectId { get; set; }
        public string Character { get; set; } = string.Empty;
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }

    }
}