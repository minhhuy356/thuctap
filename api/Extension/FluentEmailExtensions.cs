using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace api.Extension
{
    public static class FluentEmailExtensions
    {
        public static void AddFluentEmail(this IServiceCollection services, ConfigurationManager configuration)
        {
            var emailSetting = configuration.GetSection("EmailSettings");

            var defaultFromEmail = emailSetting["DefaultFromEmail"];
            var host = emailSetting["SMTPSetting:Host"];
            var port = emailSetting.GetValue<int>("SMTPSetting:Port");
            var username = emailSetting["SMTPSetting:Username"];
            var password = emailSetting["SMTPSetting:Password"];

            services.AddFluentEmail(defaultFromEmail)
                .AddSmtpSender(new SmtpClient(host)
                {
                    Port = port,
                    Credentials = new NetworkCredential(username, password),
                    EnableSsl = true // Kích hoạt SSL
                })
                .AddRazorRenderer();
        }

    }
}