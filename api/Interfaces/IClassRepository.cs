using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Class;
using api.Helper;
using api.Models;

namespace api.Interfaces
{
    public interface IClassRepository
    {
        Task<List<Class>> GetAllAsync(ClassQuery query);
        Task<Class?> GetByIdAsync(int id);
        Task<Class> CreateAsync(Class classModel);
        Task<Class?> UpdateAsync(int id, UpdateClassRequestDto classDto);
        Task<Class?> DeleteAsync(int id);
        Task<bool> ClassExist(int id);
    }
}