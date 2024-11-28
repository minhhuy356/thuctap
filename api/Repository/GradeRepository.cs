using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Common;
using api.Data;
using api.Dtos.Deparment;
using api.Dtos.Grade;
using api.Helper;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class GradeRepository : IGradeRepository
    {
        private readonly ApplicationDBContext _context;
        public GradeRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<Grade>> GetAllAsync(GradeQuery query)
        {
            var data = await _context.Grade
            .Include(g => g.AppUser)
            .Include(g => g.Section)
            .ThenInclude(s=>s.Subjects)
            .ToListAsync();

            return data;
        }

        public async Task<Grade?> GetByIdAsync(string appUserId,int sectionId)
        {
            return await _context.Grade
            .Include(g => g.AppUser)
            .Include(g => g.Section)
            .FirstOrDefaultAsync(g => g.AppUserId == appUserId && g.SectionId == sectionId);
        }
        public async Task<Grade> CreateAsync(Grade GradeModel)
        {
            await _context.Grade.AddAsync(GradeModel);
            await _context.SaveChangesAsync();
            return GradeModel;
        }

        public async Task<Grade?> DeleteAsync(string appUserId,int sectionId)
        {
            var GradeModel = await _context.Grade.FirstOrDefaultAsync(g => g.AppUserId == appUserId && g.SectionId == sectionId);

            if (GradeModel == null)
            {
                return null;
            }

            _context.Remove(GradeModel);
            await _context.SaveChangesAsync();

            return GradeModel;
        }

        public async Task<Grade?> UpdateAsync(string appUserId,int sectionId, UpdateGradeRequestDto GradeDto)
        {
            var existingGrade = await _context.Grade.FirstOrDefaultAsync(g => g.AppUserId == appUserId && g.SectionId == sectionId);

            if (existingGrade == null) return null;

            existingGrade.isDone = GradeDto.isDone;
            existingGrade.Score = GradeDto.Score;

            await _context.SaveChangesAsync();

            return existingGrade;
        }

        public Task<bool> GradeExist(string appUserId, int sectionId)
        {
            return _context.Grade.AnyAsync(x => x.AppUserId == appUserId && x.SectionId == sectionId);
        }
    }
}