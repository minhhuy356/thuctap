using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Common
{
    public static class Pagination
    {
        public static int PageNumber { get; set; } = 1;
        public static int PageSize { get; set; } = 10;
    }
}