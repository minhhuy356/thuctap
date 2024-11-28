using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Common;
using api.Data;
using api.Dtos.Major;
using api.Helper;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class MajorRepository : IMajorRepository
    {
        ApplicationDBContext _context;
        public MajorRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Major> CreateAsync(Major majorModel)
        {
            await _context.Majors.AddAsync(majorModel);
            await _context.SaveChangesAsync();
            return majorModel;
        }

        public async Task<Major?> DeleteAsync(int id)
        {
            var majorModel = await _context.Majors.FirstOrDefaultAsync(x => x.Id == id);

            if (majorModel == null) return null;

            _context.Remove(majorModel);
            await _context.SaveChangesAsync();

            return majorModel;
        }

        public async Task<List<Major>> GetAllAsync(MajorQuery query)
        {
            var data = await _context.Majors.Include(m => m.Department).ToListAsync();

            if (!string.IsNullOrWhiteSpace(query.Name))
            {
                var normalizedName = VietnameseConverter.ConvertToUnaccented(query.Name);
                data = data.Where(i => VietnameseConverter.ConvertToUnaccented(i.Name).Contains(normalizedName)).ToList();
            }

            if (!string.IsNullOrWhiteSpace(query.DepartmentId.ToString()))
            {
                data = data.Where(i => i.DepartmentId == query.DepartmentId).ToList();
            }

            if (query.isSet.HasValue)
            {
                data = data.Where(i => i.isSet == query.isSet).ToList();
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



        public async Task<Major?> GetByIdAsync(int id)
        {
            return await _context.Majors.Include(m => m.Department).FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<Major?> UpdateAsync(int id, UpdateMajorRequestDto MajorDto)
        {
            var existingMajor = await _context.Majors.FirstOrDefaultAsync(x => x.Id == id);

            if (existingMajor == null) return null;

            existingMajor.Name = MajorDto.Name;
            existingMajor.Description = MajorDto.Description;
            existingMajor.DepartmentId = MajorDto.DepartmentId;
            existingMajor.isSet = MajorDto.isSet;

            await _context.SaveChangesAsync();

            return existingMajor;
        }

        public Task<bool> MajorExist(int id)
        {
            return _context.Majors.AnyAsync(x => x.Id == id);
        }
    }
}