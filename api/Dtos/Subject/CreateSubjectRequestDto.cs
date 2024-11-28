using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.Subject
{
    public class CreateSubjectRequestDto
    {
        public string Name { get; set; }   // TenMonHoc
        public string Code { get; set; }    //Mã môn
        public int CreditHours { get; set; }      // SoTinChi
    }
}