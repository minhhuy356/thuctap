using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Section;
using api.Helper;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/section")]
    [ApiController]
    [EnableCors("AllowSpecificOrigin")]
    public class SectionController : ControllerBase
    {
        private readonly ISectionRepository _sectionRepo;
        private readonly ISubjectRepository _subjectRepo;
        private readonly ISemesterRepository _semesterRepo;
        public SectionController(ISemesterRepository semesterRepo,ISubjectRepository subjectRepo, ISectionRepository sectionRepo)
        {
            _subjectRepo = subjectRepo;
            _sectionRepo = sectionRepo;
            _semesterRepo = semesterRepo;
        }

        [HttpGet]
        // [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] SectionQuery query)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var Sections = await _sectionRepo.GetAllAsync(query);

            var SectionDto = Sections.Select(x => x.ToSectionDto());

            return Ok(SectionDto);
        }
        [HttpGet("{id:int}")]
        // [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            // Tìm Section với id được cung cấp và lấy cả các Sectiones
            var Section = await _sectionRepo.GetByIdAsync(id);

            if (Section == null)
            {
                return NotFound();
            }

            var SectionDto = Section.ToSectionDto();

            return Ok(SectionDto);
        }


        [HttpPost()]
        // [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateSectionRequestDto sectionDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if(!await _semesterRepo.SemesterExist(sectionDto.SemesterId) ){
                return BadRequest("Học kỳ không tồn tại!"); 
            } 
            if(!await _subjectRepo.SubjectExist(sectionDto.SubjectId) ){
                return BadRequest("Môn không tồn tại!"); 
            } 

            var sectionModel = sectionDto.ToSectionFromCreateDTO();
            await _sectionRepo.CreateAsync(sectionModel);

            return CreatedAtAction(nameof(GetById), new { id = sectionModel.Id }, sectionModel.ToSectionDto());
        }

        [HttpPut]
        [Authorize]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateSectionRequestDto SectionDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var SectionModel = await _sectionRepo.UpdateAsync(id, SectionDto);

            if (SectionModel == null)
            {
                return NotFound();
            }

            return Ok(SectionModel.ToSectionDto());
        }

        [HttpDelete]
        [Authorize]
        [Route("{id:int}")]

        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var SectionModel = await _sectionRepo.DeleteAsync(id);

            if (SectionModel == null)
            {
                return NotFound();
            }

            return NoContent();
        }

    }
}