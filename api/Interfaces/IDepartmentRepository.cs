using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Deparment;
using api.Helper;
using api.Models;

namespace api.Interfaces
{
    public interface IDepartmentRepository
    {
        Task<List<Department>> GetAllAsync(DepartmentQuery query);
        Task<Department?> GetByIdAsync(int id);
        Task<Department> CreateAsync(Department departmentModel);
        Task<Department?> UpdateAsync(int id, UpdateDepartmentRequestDto departmentDto);
        Task<Department?> DeleteAsync(int id);
        Task<bool> DepartmentExist(int id);
    }
}