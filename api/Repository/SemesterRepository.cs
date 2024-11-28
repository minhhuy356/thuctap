using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Common;
using api.Data;
using api.Dtos.Semester;
using api.Helper;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class SemesterRepository : ISemesterRepository
    {
        ApplicationDBContext _context;
        public SemesterRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Semester> CreateAsync(Semester semesterModel)
        {
            await _context.Semesters.AddAsync(semesterModel);
            await _context.SaveChangesAsync();
            return semesterModel;
        }

        public async Task<Semester?> DeleteAsync(int id)
        {
            var semesterModel = await _context.Semesters.FirstOrDefaultAsync(x => x.Id == id);

            if (semesterModel == null) return null;

            _context.Remove(semesterModel);
            await _context.SaveChangesAsync();

            return semesterModel;
        }

        public async Task<List<Semester>> GetAllAsync(SemesterQuery query)
        {
            var data = await _context.Semesters.ToListAsync();

            if (!string.IsNullOrWhiteSpace(query.Name))
            {
                var normalizedName = VietnameseConverter.ConvertToUnaccented(query.Name);
                data = data.Where(i => VietnameseConverter.ConvertToUnaccented(i.Name).Contains(normalizedName)).ToList();
            }
            if (!string.IsNullOrWhiteSpace(query.AcademicYear))
            {
                var normalizedAcademicYear = VietnameseConverter.ConvertToUnaccented(query.AcademicYear);
                data = data.Where(i => VietnameseConverter.ConvertToUnaccented(i.AcademicYear).Contains(normalizedAcademicYear)).ToList();
            }

            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (query.SortBy.Equals("Name", StringComparison.OrdinalIgnoreCase))
                {
                    data = query.IsDecsending ? data.OrderByDescending(i => i.Name).ToList() : data.OrderBy(i => i.Name).ToList();
                }
            }

            if (!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if (query.SortBy.Equals("AcademicYear", StringComparison.OrdinalIgnoreCase))
                {
                    data = query.IsDecsending ? data.OrderByDescending(i => i.AcademicYear).ToList() : data.OrderBy(i => i.AcademicYear).ToList();
                }
            }
            if (query.PageSize.HasValue) // Chỉ phân trang khi PageSize có giá trị
            {
                var skipNumber = (query.PageNumber - 1) * query.PageSize.Value;
                data = data.Skip(skipNumber).Take(query.PageSize.Value).ToList();
            }

            return data;
        }

        public async Task<Semester?> GetByIdAsync(int id)
        {
            return await _context.Semesters.FindAsync(id);
        }

        public async Task<Semester?> UpdateAsync(int id, UpdateSemesterRequestDto semesterDto)
        {
            var existingSemester = await _context.Semesters.FirstOrDefaultAsync(x => x.Id == id);

            if (existingSemester == null) return null;

            existingSemester.Name = semesterDto.Name;
            existingSemester.AcademicYear = semesterDto.AcademicYear;

            await _context.SaveChangesAsync();

            return existingSemester;
        }
        public Task<bool> SemesterExist(int id)
        {
            return _context.Semesters.AnyAsync(i => i.Id == id);
        }
    }
}