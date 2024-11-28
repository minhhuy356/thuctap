using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Schedule;
using api.Helper;
using api.Models;

namespace api.Interfaces
{
    public interface IScheduleRepository
    {
        Task<List<Schedule>> GetAllAsync(ScheduleQuery query);
        Task<Schedule?> GetByIdAsync(int id);
        Task<Schedule> CreateAsync(Schedule scheduleModel);
        Task<Schedule?> UpdateAsync(int id, UpdateScheduleRequestDto scheduleDto);
        Task<Schedule?> DeleteAsync(int id);
        Task<bool> ScheduleExist(int id);
        Task<bool> ScheduleDuplicate(CreateScheduleRequestDto scheduleModel);
     
    }
}