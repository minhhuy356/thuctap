using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Schedule;
using api.Helper;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/schedule")]
    [ApiController]
    [EnableCors("AllowSpecificOrigin")]
    public class ScheduleController : ControllerBase
    {
        private readonly IScheduleRepository _scheduleRepo;
        private readonly ISectionRepository _sectionRepo;
        public ScheduleController(ISectionRepository sectionRepo, IScheduleRepository scheduleRepo)
        {
            _sectionRepo = sectionRepo;
            _scheduleRepo = scheduleRepo;
        }

        [HttpGet]
        // [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] ScheduleQuery query)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var schedules = await _scheduleRepo.GetAllAsync(query);

            var scheduleDto = schedules.Select(x => x.ToScheduleDto());

            return Ok(scheduleDto);
        }
        [HttpGet("{id:int}")]
        // [Authorize]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            // Tìm Schedule với id được cung cấp và lấy cả các Schedulees
            var Schedule = await _scheduleRepo.GetByIdAsync(id);

            if (Schedule == null)
            {
                return NotFound("Lịch học của lớp này không tìm thấy");
            }

            var scheduleDto = Schedule.ToScheduleDto();

            return Ok(scheduleDto);
        }


        [HttpPost()]
        // [Authorize]
        public async Task<IActionResult> Create([FromBody] CreateScheduleRequestDto scheduleDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if(await _scheduleRepo.ScheduleDuplicate(scheduleDto) == false) return BadRequest("Môn học của lớp học này đã bị trùng thời gian!");

            if (!await _sectionRepo.SectionExist(scheduleDto.SectionId))
            {
                return BadRequest("Lớp học không tồn tại!");
            }
            var ScheduleModel = scheduleDto.ToScheduleFromCreateDTO();
            await _scheduleRepo.CreateAsync(ScheduleModel);

            return CreatedAtAction(nameof(GetById), new { id = ScheduleModel.Id }, ScheduleModel.ToScheduleDto());
        }

        [HttpPut]
        [Authorize]
        [Route("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateScheduleRequestDto scheduleDto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var ScheduleModel = await _scheduleRepo.UpdateAsync(id, scheduleDto);

            if (ScheduleModel == null)
            {
                return NotFound("Lịch học của lớp này không tìm thấy");
            }

            return Ok(ScheduleModel.ToScheduleDto());
        }

        [HttpDelete]
        [Authorize]
        [Route("{id:int}")]

        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var ScheduleModel = await _scheduleRepo.DeleteAsync(id);

            if (ScheduleModel == null)
            {
                return NotFound("Lịch học của lớp này không tìm thấy");
            }

            return NoContent();
        }

    }
}