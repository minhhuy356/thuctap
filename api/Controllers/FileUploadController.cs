using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Dtos.FileUpload;
using api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/file-upload")]
    [ApiController]    
    [EnableCors("AllowSpecificOrigin")]
    public class FileUploadController : ControllerBase
    {

        public FileUploadController()
        {
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> UploadImageUser([FromForm] UploadImageUserRequestDto uploadImageUserRequestDto)
        {
            if (uploadImageUserRequestDto?.file == null || uploadImageUserRequestDto.file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            // Lấy thông tin người dùng hiện tại từ token
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized("User not found.");
            }

            // Lưu file ảnh (giả sử lưu trên hệ thống file)
            var fileName = $"{userId}_{DateTime.UtcNow.Ticks}{Path.GetExtension(uploadImageUserRequestDto.file.FileName)}";
            var filePath = Path.Combine("wwwroot/images/user", fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await uploadImageUserRequestDto.file.CopyToAsync(stream);
            }

            // Trả về phản hồi với đường dẫn ảnh
            var imageUrl = $"{fileName}";
            return Ok(new { message = "Image uploaded successfully.", imageUrl });
        }
    }
}