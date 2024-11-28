using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace api.Template
{
    public class EmailConfirmTemplate : PageModel
    {
        private readonly ILogger<EmailConfirmTemplate> _logger;

        public EmailConfirmTemplate(ILogger<EmailConfirmTemplate> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}