using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Semester;
using api.Helper;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/semester")]
    [ApiController]    
    [EnableCors("AllowSpecificOrigin")]
    public class SemesterController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly ISemesterRepository _semesterRepo;
        public SemesterController(ApplicationDBContext context, ISemesterRepository semesterRepo)
        {
            _context = context;
            _semesterRepo = semesterRepo;
        }

        [HttpGet]
        // [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] SemesterQuery query)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var semesteres = await _semesterRepo.GetAllAsync(query);

            var semesterDto = semesteres.Select(x => x.ToSemesterDto());

            return Ok(semesterDto);
        }
        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var Semester = await _semesterRepo.GetByIdAsync(id);

            if (Semester == null)
            {
                return NotFound("Không tìm thấy học kì của này học năm học này!");
            }

            var semesterDto = Semester.ToSemesterDto();

            return Ok(semesterDto);
        }


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateSemesterRequestDto semesterDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var SemesterModel = semesterDto.ToSemesterFromCreateDTO();
            await _semesterRepo.CreateAsync(SemesterModel);

            return CreatedAtAction(nameof(GetById), new { id = SemesterModel.Id }, SemesterModel.ToSemesterDto());
        }

        [HttpPut]
        [Authorize]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateSemesterRequestDto semesterDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var SemesterModel = await _semesterRepo.UpdateAsync(id, semesterDto);

            if (SemesterModel == null)
            {
                return NotFound("Không tìm thấy học kì của này học năm học này!");
            }

            return Ok(SemesterModel.ToSemesterDto());
        }

        [HttpDelete]
        [Authorize]
        [Route("{id:int}")]

        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var SemesterModel = await _semesterRepo.DeleteAsync(id);

            if (SemesterModel == null)
            {
                return NotFound("Không tìm thấy học kì của này học năm học này!");
            }

            return NoContent();
        }

    }
}