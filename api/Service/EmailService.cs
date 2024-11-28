using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using api.Dtos.Email;
using api.Interfaces;
using FluentEmail.Core;
using FluentEmail.Razor;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;

namespace api.Service
{
    public class EmailService : IEmailService
    {
        private readonly IFluentEmail _fluentEmail;

        public EmailService(IFluentEmail fluentEmail)
        {
            _fluentEmail = fluentEmail;
        }

        public async Task SendEmailAsync(EmailMetadata emailMetadata, string AppUserId, string Token)
        {
            try
            {
                // Đường dẫn đến tệp .cshtml của bạn
                string templatePath = @"C:\Users\FPT\OneDrive\Desktop\THUCTAP\InforManageStudent\api\Template\EmailConfirmTemplate.cshtml";

                // Kiểm tra xem tệp có tồn tại không
                if (!File.Exists(templatePath))
                {
                    Console.WriteLine($"Template file does not exist at path: {templatePath}");
                    return; // Hoặc xử lý lỗi theo cách khác
                }

                // Đọc nội dung tệp .cshtml
                string template = await File.ReadAllTextAsync(templatePath);

                // Tạo đối tượng mô hình
                var model = new TemplateConfirm
                {
                    AppUserId = AppUserId,
                    Token = Token
                };

                // Sử dụng template với FluentEmail
                var email = _fluentEmail
                    .To(emailMetadata.ToAddress)
                    .Subject(emailMetadata.Subject)
                    .UsingTemplate(template, model); // Sử dụng template từ tệp .cshtml

                // Nếu có tệp đính kèm, kiểm tra xem tệp có tồn tại và đính kèm
                if (!string.IsNullOrEmpty(emailMetadata.AttachmentPath) && File.Exists(emailMetadata.AttachmentPath))
                {
                    email.AttachFromFilename(emailMetadata.AttachmentPath);
                }

                // Gửi email
                await email.SendAsync();
            }
            catch (Exception ex)
            {
                // Xử lý lỗi, ghi log hoặc thông báo cho người dùng
                Console.WriteLine($"Failed to send email: {ex.Message}");
            }
        }

    }
}