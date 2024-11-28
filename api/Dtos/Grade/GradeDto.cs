using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.Grade
{
    public class GradeDto
    {
        public string AppUserId { get; set; }
        public int SectionId { get; set; }
        public float? Score { get; set; }
        public bool isDone { get; set; }
        public api.Models.Section? Section { get; set; }
        public AppUser? AppUser { get; set; }
    }
}