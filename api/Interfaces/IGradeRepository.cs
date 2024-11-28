using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Grade;
using api.Helper;
using api.Models;

namespace api.Interfaces
{
    public interface IGradeRepository
    {
        Task<List<Grade>> GetAllAsync(GradeQuery query);
        Task<Grade?> GetByIdAsync(string appUserId,int sectionId);
        Task<Grade> CreateAsync(Grade gradeModel);
        Task<Grade?> UpdateAsync(string appUserId,int sectionId, UpdateGradeRequestDto gradeDto);
        Task<Grade?> DeleteAsync(string appUserId,int sectionId);
        Task<bool> GradeExist(string appUserId,int sectionId);
    }
}