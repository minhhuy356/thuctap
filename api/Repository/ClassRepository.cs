using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Common;
using api.Data;
using api.Dtos.Class;
using api.Helper;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class ClassRepository : IClassRepository
    {
        ApplicationDBContext _context;
        public ClassRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Class> CreateAsync(Class ClassModel)
        {
            await _context.Classes.AddAsync(ClassModel);
            await _context.SaveChangesAsync();
            return ClassModel;
        }

        public async Task<Class?> DeleteAsync(int id)
        {
            var ClassModel = await _context.Classes.FirstOrDefaultAsync(x => x.Id == id);

            if (ClassModel == null) return null;

            _context.Remove(ClassModel);
            await _context.SaveChangesAsync();

            return ClassModel;
        }

        public async Task<List<Class>> GetAllAsync(ClassQuery query)
        {
            var data = await _context.Classes
                .Include(c => c.Course)
                .Include(c => c.Department)
                .ToListAsync();

            if (!string.IsNullOrWhiteSpace(query.DepartmentId.ToString()))
            {
                data = data.Where(i => i.DepartmentId == query.DepartmentId).ToList();
            }    

            if (!string.IsNullOrWhiteSpace(query.CourseId.ToString()))
            {
                data = data.Where(i => i.CourseId == query.CourseId).ToList();
            }

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

        public async Task<Class?> GetByIdAsync(int id)
        {

            return await _context.Classes.FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Class?> UpdateAsync(int id, UpdateClassRequestDto classDto)
        {
            var existingClass = await _context.Classes
                .FirstOrDefaultAsync(x => x.Id == id);

            if (existingClass == null) return null;

            existingClass.Name = classDto.Name;
            existingClass.DepartmentId = classDto.DepartmentId;
            existingClass.CourseId = classDto.CourseID;

            await _context.SaveChangesAsync();

            return existingClass;
        }

        public Task<bool> ClassExist(int id)
        {
            return _context.Classes.AllAsync(i => i.Id == id);
        }
    }
}