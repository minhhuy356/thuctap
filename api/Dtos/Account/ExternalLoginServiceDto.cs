using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Account
{
    public class ExternalLoginServiceDto
    {
        public string UserName { get; set; }
        public string LoginProvider { get; set; }
        public string ProviderKey { get; set; }

    }
}