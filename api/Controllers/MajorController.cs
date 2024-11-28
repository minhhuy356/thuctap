using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Major;
using api.Helper;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/major")]
    [ApiController]    
    [EnableCors("AllowSpecificOrigin")]
    public class MajorController : ControllerBase
    {
        private readonly IDepartmentRepository _departmentRepo;
        private readonly IMajorRepository _majorRepo;
        public MajorController(IDepartmentRepository departmentRepo, IMajorRepository majorRepo)
        {
            _departmentRepo = departmentRepo;
            _majorRepo = majorRepo;
        }

        [HttpGet]

        public async Task<IActionResult> GetAll([FromQuery] MajorQuery query)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var majors = await _majorRepo.GetAllAsync(query);

            var majorDto = majors.Select(x => x.ToMajorDto());

            return Ok(majorDto);
        }
        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var major = await _majorRepo.GetByIdAsync(id);

            if (major == null)
            {
                return NotFound("Chuyền ngành này không tìm thấy");
            }
            var majorDto = major.ToMajorDto();

            return Ok(majorDto);
        }


        [HttpPost("{departmentId:int}")]
        // [Authorize]
        public async Task<IActionResult> Create([FromRoute] int departmentId, [FromBody] CreateMajorRequestDto majorDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (!await _departmentRepo.DepartmentExist(departmentId))
            {
                return BadRequest("Khoa không tồn tại!"); 
            }
            var majorModel = majorDto.ToMajorFromCreateDTO(departmentId);
            await _majorRepo.CreateAsync(majorModel);

            return CreatedAtAction(nameof(GetById), new { id = majorModel.Id }, majorModel.ToMajorDto());
        }

        [HttpPut]
        [Authorize]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateMajorRequestDto majorDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var majorModel = await _majorRepo.UpdateAsync(id, majorDto);

            if (majorModel == null)
            {
                return NotFound("Chuyền ngành này không tìm thấy");
            }

            return Ok(majorModel.ToMajorDto());
        }
        

        [HttpDelete]
        [Authorize]
        [Route("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var majorModel = await _majorRepo.DeleteAsync(id);

            if (majorModel == null)
            {
                return NotFound("Chuyền ngành này không tìm thấy");
            }

            return NoContent();
        }

    }
}