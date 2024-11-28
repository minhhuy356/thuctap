using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.FileUpload
{
    public class UploadImageUserRequestDto
    {
        public IFormFile file { get; set; }
    }
}