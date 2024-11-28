using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Deparment;
using api.Helper;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/department")]
    [ApiController]
    [EnableCors("AllowSpecificOrigin")]
    public class DepartmentController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly IDepartmentRepository _departmentRepo;
        public DepartmentController(ApplicationDBContext context, IDepartmentRepository departmentRepo)
        {
            _departmentRepo = departmentRepo;
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] DepartmentQuery query)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            // Lấy danh sách các departments cùng với majors và teachers liên quan
            var departments = await _departmentRepo.GetAllAsync(query);

            var departmentDto = departments.Select(i => i.ToDepartmentDto());

            return Ok(departmentDto);
        }

        [HttpGet("{id:int}")]
        [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var department = await _departmentRepo.GetByIdAsync(id);

            if (department == null)
            {
                return NotFound("Khoa không tìm thấy");
            }
            var departmentDto = department.ToDepartmentDto();

            return Ok(departmentDto);
        }


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateDepartmentRequestDto deparmtentDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var departmentModel = deparmtentDto.ToDepartmentFromCreateDTO();
            await _departmentRepo.CreateAsync(departmentModel);

            return CreatedAtAction(nameof(GetById), new { id = departmentModel.Id }, departmentModel.ToDepartmentDto());
        }

        [HttpPut]
        [Authorize]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateDepartmentRequestDto deparmtentDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var departmentModel = await _departmentRepo.UpdateAsync(id, deparmtentDto);

            if (departmentModel == null)
            {
                return NotFound("Khoa không tìm thấy");
            }

            return Ok(departmentModel.ToDepartmentDto());
        }

        [HttpDelete]
        [Authorize]
        [Route("{id:int}")]

        public async Task<IActionResult> DeleteAsync([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var departmentModel = await _departmentRepo.DeleteAsync(id);

            if (departmentModel == null)
            {
                return NotFound("Khoa không tìm thấy");
            }

            return NoContent();
        }
    }
}