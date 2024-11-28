using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helper
{
    public class ClassSubjectStudentQuery
    {
        public float? Grade { get; set; } = null;
        public string? SortBy { get; set; } = null;
        public bool IsDecsending { get; set; } = false;

        public int PageNumber { get; set; } = 1;
        public int? PageSize { get; set; } // Đặt kiểu dữ liệu là int?
    }
}