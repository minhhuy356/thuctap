using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    
    public class Grade
    {
        public string AppUserId { get; set; }
        public int SectionId { get; set; }
        public float? Score { get; set; }
        public bool isDone { get; set; }
        public Section? Section { get; set; }
        public AppUser? AppUser { get; set; }

    }

}