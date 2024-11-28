using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Common;
using api.Data;
using api.Dtos.Deparment;
using api.Helper;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly ApplicationDBContext _context;
        public DepartmentRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Department>> GetAllAsync(DepartmentQuery query)
        {
            var data = await _context.Departments
            .Include(d => d.Majors)
            .ToListAsync();

            if (!string.IsNullOrWhiteSpace(query.Name))
            {
                var normalizedName = VietnameseConverter.ConvertToUnaccented(query.Name);
                data = data.Where(i => VietnameseConverter.ConvertToUnaccented(i.Name).Contains(normalizedName)).ToList();
            }

            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (query.SortBy.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    data = query.IsDecsending ? data.OrderByDescending(i => i.Name).ToList() : data.OrderBy(i => i.Name).ToList();
                }
            }
            if (query.PageSize.HasValue) // Chỉ phân trang khi PageSize có giá trị
            {
                var skipNumber = (query.PageNumber - 1) * query.PageSize.Value;
                data = data.Skip(skipNumber).Take(query.PageSize.Value).ToList();
            }

            return data;
        }

        public async Task<Department?> GetByIdAsync(int id)
        {
            return await _context.Departments
            .Include(d => d.Majors)

            .FirstOrDefaultAsync(c => c.Id == id);
        }
        public async Task<Department> CreateAsync(Department departmentModel)
        {
            await _context.Departments.AddAsync(departmentModel);
            await _context.SaveChangesAsync();
            return departmentModel;
        }

        public async Task<Department?> DeleteAsync(int id)
        {
            var departmentModel = await _context.Departments.FirstOrDefaultAsync(x => x.Id == id);

            if (departmentModel == null)
            {
                return null;
            }

            _context.Remove(departmentModel);
            await _context.SaveChangesAsync();

            return departmentModel;
        }

        public async Task<Department?> UpdateAsync(int id, UpdateDepartmentRequestDto departmentDto)
        {
            var existingDepartment = await _context.Departments.FirstOrDefaultAsync(x => x.Id == id);

            if (existingDepartment == null) return null;

            existingDepartment.Name = departmentDto.Name;

            await _context.SaveChangesAsync();

            return existingDepartment;
        }

        public Task<bool> DepartmentExist(int id)
        {
            return _context.Departments.AnyAsync(i => i.Id == id);
        }


    }
}