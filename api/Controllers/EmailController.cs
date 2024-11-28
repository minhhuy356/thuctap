using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using api.Dtos.Email;
using api.Interfaces;
using api.Models;
using FluentEmail.Core;
using FluentEmail.Razor;
using FluentEmail.Smtp;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace api.Controllers
{
    [ApiController]    
    [EnableCors("AllowSpecificOrigin")]
    [Route("api/email")]
    public class EmailController : ControllerBase
    {
        private readonly IEmailService _emailService;
        private readonly UserManager<AppUser> _userManager;

        public EmailController(IEmailService emailService, UserManager<AppUser> userManager)
        {
            _emailService = emailService;
            _userManager = userManager;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendEmail(EmailMetadata emailMetadata, string AppUserId, string Token)
        {
            // Kiểm tra xem email đã tồn tại trong hệ thống chưa
            var emailExist = await _userManager.FindByEmailAsync(emailMetadata.ToAddress);

            if (emailExist == null)
            {
                return BadRequest("Email đã tồn tại trong hệ thống.");
            }

            var send = new EmailMetadata(
              emailMetadata.ToAddress,       // Địa chỉ người nhận
              emailMetadata.Subject,         // Chủ đề email
              emailMetadata.Body,            // Nội dung email
              emailMetadata.AttachmentPath   // Đường dẫn tệp đính kèm (nếu có)
            );

            await _emailService.SendEmailAsync(send, AppUserId, Token);
            return Ok("Email đã gửi thành công!");
        }


    }
}