using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Grade;
using api.Helper;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/grade")]
    [ApiController]    
    [EnableCors("AllowSpecificOrigin")]
    public class GradeController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IGradeRepository _gradeRepo;
        public GradeController(ApplicationDBContext context, IGradeRepository gradeRepo)
        {
            _context = context;
            _gradeRepo = gradeRepo;
        }

        [HttpGet]
        // [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] GradeQuery query)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var Gradees = await _gradeRepo.GetAllAsync(query);

            var GradeDto = Gradees.Select(x => x.ToGradeDto());

            return Ok(GradeDto);
        }
        [HttpGet("{appUserId}&{sectionId:int}")]
        // [Authorize]
        public async Task<IActionResult> GetById([FromRoute] string appUserId,int sectionId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var Grade = await _gradeRepo.GetByIdAsync(appUserId, sectionId);

            if (Grade == null)
            {
                return NotFound("Không tìm thấy học kì của này học năm học này!");
            }

            var GradeDto = Grade.ToGradeDto();

            return Ok(GradeDto);
        }


        [HttpPost]
        // [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateGradeRequestDto gradeDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Kiểm tra xem Grade đã tồn tại chưa
            var existingGrade = await _gradeRepo.GradeExist(gradeDto.AppUserId, gradeDto.SectionId);
            if (existingGrade)
                return Conflict("Grade đã tồn tại với AppUserId và SectionId này.");

            // Tạo mới
            var gradeModel = gradeDto.ToGradeFromCreateDTO();
            await _gradeRepo.CreateAsync(gradeModel);

            return CreatedAtAction(nameof(GetById), new { appUserId = gradeModel.AppUserId, sectionId = gradeModel.SectionId }, gradeModel.ToGradeDto());
        }

        [HttpPut]
        [Authorize]
        [Route("{appUserId}&{sectionId:int}")]
        public async Task<IActionResult> Update([FromRoute]string appUserId,int sectionId, [FromBody] UpdateGradeRequestDto GradeDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var gradeModel = await _gradeRepo.UpdateAsync(appUserId, sectionId, GradeDto);

            if (gradeModel == null)
            {
                return NotFound("Không tìm thấy học kì của này học năm học này!");
            }

            return Ok(gradeModel.ToGradeDto());
        }

        [HttpDelete]
        [Authorize]
        [Route("{appUserId}&{sectionId:int}")]

        public async Task<IActionResult> Delete([FromRoute] string appUserId,int sectionId)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var GradeModel = await _gradeRepo.DeleteAsync(appUserId, sectionId);

            if (GradeModel == null)
            {
                return NotFound("Không tìm thấy học kì của này học năm học này!");
            }

            return NoContent();
        }

    }
}