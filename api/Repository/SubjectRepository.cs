using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Common;
using api.Data;
using api.Dtos.Subject;
using api.Helper;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class SubjectRepository : ISubjectRepository
    {
        ApplicationDBContext _context;
        public SubjectRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Subject> CreateAsync(Subject subjectModel)
        {
            await _context.Subjects.AddAsync(subjectModel);
            await _context.SaveChangesAsync();
            return subjectModel;
        }

        public async Task<Subject?> DeleteAsync(int id)
        {
            var subjectModel = await _context.Subjects.FirstOrDefaultAsync(x => x.Id == id);

            if (subjectModel == null) return null;

            _context.Remove(subjectModel);
            await _context.SaveChangesAsync();

            return subjectModel;
        }

        public async Task<List<Subject>> GetAllAsync(SubjectQuery query)
        {
            var data = await _context.Subjects.Include(s => s.Department).ToListAsync();

            if (!string.IsNullOrWhiteSpace(query.Name))
            {
                var normalizedName = VietnameseConverter.ConvertToUnaccented(query.Name);
                data = data.Where(i => VietnameseConverter.ConvertToUnaccented(i.Name).Contains(normalizedName)).ToList();
            }
            if (!string.IsNullOrWhiteSpace(query.CreditHours.ToString()))
            {
                data = data.Where(i => i.CreditHours == query.CreditHours).ToList();
            }
            
           if (!string.IsNullOrWhiteSpace(query.DepartmentId.ToString()))
            {
                data = data.Where(i => i.DepartmentId == query.DepartmentId).ToList();
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
                if (query.SortBy.Equals("CreditHours", StringComparison.OrdinalIgnoreCase))
                {
                    data = query.IsDecsending ? data.OrderByDescending(i => i.CreditHours).ToList() : data.OrderBy(i => i.CreditHours).ToList();
                }
            }
            if (query.PageSize.HasValue) // Chỉ phân trang khi PageSize có giá trị
            {
                var skipNumber = (query.PageNumber - 1) * query.PageSize.Value;
                data = data.Skip(skipNumber).Take(query.PageSize.Value).ToList();
            }

            return data;
        }

        public async Task<Subject?> GetByIdAsync(int id)
        {
            return await _context.Subjects
            .Include(s => s.Department)
            .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<Subject?> UpdateAsync(int id, UpdateSubjectRequestDto subjectDto)
        {
            var existingSubject = await _context.Subjects.FirstOrDefaultAsync(x => x.Id == id);

            if (existingSubject == null) return null;

            existingSubject.Name = subjectDto.Name;
            existingSubject.CreditHours = subjectDto.CreditHours;
            existingSubject.DepartmentId = subjectDto.DepartmentId;
            existingSubject.Code = subjectDto.Code;
            
            await _context.SaveChangesAsync();

            return existingSubject;
        }
        public Task<bool> SubjectExist(int id)
        {
            return _context.Subjects.AnyAsync(i => i.Id == id);
        }
    }
}