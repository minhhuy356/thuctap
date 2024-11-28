using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Email;

namespace api.Interfaces
{
    public interface IEmailService
    {
        Task SendEmailAsync(EmailMetadata emailMetadata, string AppUserId, string Token);
    }
}