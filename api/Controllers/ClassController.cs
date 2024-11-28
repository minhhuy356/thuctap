using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Class;
using api.Helper;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
[Route("api/class")]
[ApiController]
[EnableCors("AllowSpecificOrigin")]
    public class ClassController : ControllerBase
    {
        private readonly IClassRepository _classRepo;
        private readonly IDepartmentRepository _departmentRepo;
        private readonly ICourseRepository _courseRepo;
        public ClassController(IClassRepository classRepo, IDepartmentRepository departmentRepo, ICourseRepository courseRepo)
        {
            _courseRepo = courseRepo;
            _departmentRepo = departmentRepo;
            _classRepo = classRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] ClassQuery query)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var classes = await _classRepo.GetAllAsync(query);

            var classDto = classes.Select(x => x.ToClassDto());

            return Ok(classDto);
        }
        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            // Tìm Class với id được cung cấp và lấy cả các classes
            var Class = await _classRepo.GetByIdAsync(id);

            if (Class == null)
            {
                return NotFound("Không tồn tại Lớp này");
            }

            var classDto = Class.ToClassDto();

            return Ok(classDto);
        }


        [HttpPost("{departmentId:int}")]
        [Authorize]
        public async Task<IActionResult> Create([FromRoute] int departmentId, int courseId, [FromBody] CreateClassRequestDto classDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (!await _departmentRepo.DepartmentExist(departmentId))
            {
                return BadRequest("Khoa không tồn tại!");
            }
            if (!await _courseRepo.CourseExist(courseId))
            {
                return BadRequest("Học kì không tồn tại!");
            }

            var ClassModel = classDto.ToClassFromCreateDTO(departmentId, courseId);
            await _classRepo.CreateAsync(ClassModel);

            return CreatedAtAction(nameof(GetById), new { id = ClassModel.Id }, ClassModel.ToClassDto());
        }

        [HttpPut]
        [Authorize]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateClassRequestDto classDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var ClassModel = await _classRepo.UpdateAsync(id, classDto);

            if (ClassModel == null)
            {
                return NotFound();
            }

            return Ok(ClassModel.ToClassDto());
        }

        [HttpDelete]
        [Authorize]
        [Route("{id:int}")]

        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var ClassModel = await _classRepo.DeleteAsync(id);

            if (ClassModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }

    }
}