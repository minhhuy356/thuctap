using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Semester;
using api.Helper;
using api.Models;

namespace api.Interfaces
{
    public interface ISemesterRepository
    {
        Task<List<Semester>> GetAllAsync(SemesterQuery query);
        Task<Semester?> GetByIdAsync(int id);
        Task<Semester> CreateAsync(Semester semesterModel);
        Task<Semester?> UpdateAsync(int id, UpdateSemesterRequestDto semesterDto);
        Task<Semester?> DeleteAsync(int id);
        Task<bool> SemesterExist(int id);
    }
}