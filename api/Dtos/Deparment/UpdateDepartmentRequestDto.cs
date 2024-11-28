using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Deparment
{
    public class UpdateDepartmentRequestDto
    {
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Tên khóa học phải có độ dài từ 1 đến 100 ký tự.")]
        public string Name { get; set; }
    }
}