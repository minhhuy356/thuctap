using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Deparment;
using api.Dtos.Subject;
using api.Helper;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/subject")]
    [ApiController]    
    [EnableCors("AllowSpecificOrigin")]
    public class SubjectController : ControllerBase
    {
        private readonly ISubjectRepository _subjectRepo;
        private readonly IDepartmentRepository _departmentRepo;
        public SubjectController(IDepartmentRepository departmentRepo, ISubjectRepository subjectRepo)
        {
            _departmentRepo = departmentRepo;
            _subjectRepo = subjectRepo;
        }

        [HttpGet]
        // [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] SubjectQuery query)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            // Lấy danh sách các Subjects cùng với majors và teachers liên quan
            var Subjects = await _subjectRepo.GetAllAsync(query);

            var SubjectDto = Subjects.Select(i => i.ToSubjectDto());

            return Ok(SubjectDto);
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var Subject = await _subjectRepo.GetByIdAsync(id);

            if (Subject == null)
            {
                return NotFound("Không tìm thấy lớp học này");
            }
            var SubjectDto = Subject.ToSubjectDto();

            return Ok(SubjectDto);
        }


        [HttpPost("{departmentId:int}")]
        [Authorize]
        public async Task<IActionResult> Create([FromRoute] int departmentId, [FromBody] CreateSubjectRequestDto subjectDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (!await _departmentRepo.DepartmentExist(departmentId))
            {
                return BadRequest("Khoa không tồn tại!");
            }
            var SubjectModel = subjectDto.ToSubjectFromCreateDTO(departmentId);
            await _subjectRepo.CreateAsync(SubjectModel);

            return CreatedAtAction(nameof(GetById), new { id = SubjectModel.Id }, SubjectModel.ToSubjectDto());
        }

        [HttpPut]
        [Authorize]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateSubjectRequestDto subjectDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var SubjectModel = await _subjectRepo.UpdateAsync(id, subjectDto);

            if (SubjectModel == null)
            {
                return NotFound("Không tìm thấy lớp học này");
            }

            return Ok(SubjectModel.ToSubjectDto());
        }

        [HttpDelete]
        [Authorize]
        [Route("{id:int}")]

        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var SubjectModel = await _subjectRepo.DeleteAsync(id);

            if (SubjectModel == null)
            {
                return NotFound("Không tìm thấy lớp học này");
            }

            return NoContent();
        }
    }
}