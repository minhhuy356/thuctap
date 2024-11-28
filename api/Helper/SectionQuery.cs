using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helper
{
    public class SectionQuery
    {
        public string? SortBy { get; set; } = null;
        public bool IsDecsending { get; set; } = false;
        public int PageNumber { get; set; } = 1;
        public int? PageSize { get; set; } // Đặt kiểu dữ liệu là int?
        public int? SubjectId { get; set; } = null;
        public int? SemesterId { get; set; } = null;
        public string? Character { get; set; } = null;
    }
}