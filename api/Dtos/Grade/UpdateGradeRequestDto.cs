using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Grade
{
    public class UpdateGradeRequestDto
    {
        public float? Score { get; set; }
        public bool isDone { get; set; }
    }
}