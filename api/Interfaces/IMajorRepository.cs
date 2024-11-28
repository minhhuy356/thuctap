using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Major;
using api.Helper;
using api.Models;

namespace api.Interfaces
{
    public interface IMajorRepository
    {
        Task<List<Major>> GetAllAsync(MajorQuery query);
        Task<Major?> GetByIdAsync(int id);
        Task<Major> CreateAsync(Major majorModel);
        Task<Major?> UpdateAsync(int id, UpdateMajorRequestDto majorDto);
        Task<Major?> DeleteAsync(int id);
        Task<bool> MajorExist(int id);
    }
}