using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helper
{
    public class MajorQuery
    {
        public string? Name { get; set; } = null;
        public int? DepartmentId { get; set; } = null;
        public bool? isSet { get; set; }
        public string? SortBy { get; set; } = null;
        public bool IsDecsending { get; set; } = false;
        public int PageNumber { get; set; } = 1;
        public int? PageSize { get; set; } // Đặt kiểu dữ liệu là int?
    }
}