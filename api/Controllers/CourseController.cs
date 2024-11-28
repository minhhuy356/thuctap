using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Course;
using api.Helper;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/course")]
    [ApiController]    
    [EnableCors("AllowSpecificOrigin")]
    public class CourseController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly ICourseRepository _courseRepo;
        public CourseController(ApplicationDBContext context, ICourseRepository courseRepo)
        {
            _context = context;
            _courseRepo = courseRepo;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] CourseQuery query)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var courses = await _courseRepo.GetAllAsync(query);

            var courseDto = courses.Select(x => x.ToCourseDto());

            return Ok(courseDto);
        }
        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var Course = await _courseRepo.GetByIdAsync(id);

            if (Course == null)
            {
                return NotFound("Năm học không tìm thấy");
            }

            var courseDto = Course.ToCourseDto();

            return Ok(courseDto);
        }


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateCourseRequestDto courseDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var CourseModel = courseDto.ToCourseFromCreateDTO();
            await _courseRepo.CreateAsync(CourseModel);

            return CreatedAtAction(nameof(GetById), new { id = CourseModel.Id }, CourseModel.ToCourseDto());
        }

        [HttpPut]
        [Authorize]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCourseRequestDto courseDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var CourseModel = await _courseRepo.UpdateAsync(id, courseDto);

            if (CourseModel == null)
            {
                return NotFound("Năm học không tìm thấy");
            }

            return Ok(CourseModel.ToCourseDto());
        }

        [HttpDelete]
        [Authorize]
        [Route("{id:int}")]

        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var CourseModel = await _courseRepo.DeleteAsync(id);

            if (CourseModel == null)
            {
                return NotFound("Năm học không tìm thấy");
            }

            return NoContent();
        }

    }
}