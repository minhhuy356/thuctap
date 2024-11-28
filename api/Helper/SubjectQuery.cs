using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helper
{
    public class SubjectQuery
    {
        public string? Name { get; set; } = null;
        public int? CreditHours { get; set; } = null;
        public string? SortBy { get; set; } = null;
        public int? DepartmentId { get; set; } = null;
        public bool IsDecsending { get; set; } = false;
        public int PageNumber { get; set; } = 1;
         public int? PageSize { get; set; } // Đặt kiểu dữ liệu là int?
    }
}