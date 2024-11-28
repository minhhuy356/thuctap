using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Quic;
using System.Threading.Tasks;
using api.Common;
using api.Data;
using api.Dtos.Schedule;
using api.Helper;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class ScheduleRepository : IScheduleRepository
    {
        ApplicationDBContext _context;
        public ScheduleRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Schedule> CreateAsync(Schedule scheduleModel)
        {
            await _context.Schedules.AddAsync(scheduleModel);
            await _context.SaveChangesAsync();
            return scheduleModel;
        }


        public async Task<Schedule?> DeleteAsync(int id)
        {
            var scheduleModel = await _context.Schedules.FirstOrDefaultAsync(x => x.Id == id);

            if (scheduleModel == null) return null;

            _context.Remove(scheduleModel);
            await _context.SaveChangesAsync();

            return scheduleModel;
        }

        public async Task<List<Schedule>> GetAllAsync(ScheduleQuery query)
        {
            var data = _context.Schedules
            .Include(s => s.Sections)
            .ThenInclude(s => s.Subjects )
            .Include(s => s.Sections) // Lặp lại Include Sections
            .ThenInclude(s => s.Semesters) // Bao gồm Semester bên trong mỗi Section
            .AsQueryable();
            return await data.ToListAsync();
        }


        public async Task<Schedule?> GetByIdAsync(int id)
        {
            return await _context.Schedules.FindAsync(id);
        }

        public async Task<Schedule?> UpdateAsync(int id, UpdateScheduleRequestDto scheduleDto)
        {
            var existingSchedule = await _context.Schedules.FirstOrDefaultAsync(x => x.Id == id);

            if (existingSchedule == null) return null;

            existingSchedule.TimeStart = scheduleDto.TimeStart;
            existingSchedule.TimeEnd = scheduleDto.TimeEnd;
            existingSchedule.DayOfWeek = scheduleDto.DayOfWeek;
            existingSchedule.SectionId = scheduleDto.SectionId;

            await _context.SaveChangesAsync();

            return existingSchedule;
        }
        public Task<bool> ScheduleExist(int id)
        {
            return _context.Schedules.AnyAsync(i => i.Id == id);
        }
        public async Task<bool> ScheduleDuplicate(CreateScheduleRequestDto scheduleModel)
        {
             var existingSubject = await _context.Schedules
                .Where(s => s.DayOfWeek == scheduleModel.DayOfWeek)
                .Where(s => 
                    (scheduleModel.TimeStart >= s.TimeStart && scheduleModel.TimeStart < s.TimeEnd) ||
                    (scheduleModel.TimeEnd > s.TimeStart && scheduleModel.TimeEnd <= s.TimeEnd))
    
                .FirstOrDefaultAsync();

            if (existingSubject != null)
            {
                return false;
            }
            return true;
        }
    }
}