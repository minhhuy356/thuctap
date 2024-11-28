using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Common;
using api.Data;
using api.Dtos.Section;
using api.Helper;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class SectionRepository : ISectionRepository
    {
        ApplicationDBContext _context;
        public SectionRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Section> CreateAsync(Section SectionModel)
        {
            await _context.Sections.AddAsync(SectionModel);
            await _context.SaveChangesAsync();
            return SectionModel;
        }

        public async Task<Section?> DeleteAsync(int id)
        {
            var SectionModel = await _context.Sections.FirstOrDefaultAsync(x => x.Id == id);

            if (SectionModel == null) return null;

            _context.Remove(SectionModel);
            await _context.SaveChangesAsync();

            return SectionModel;
        }

        public async Task<List<Section>> GetAllAsync(SectionQuery query)
        {
            var data = await _context.Sections
            .Include(s => s.Semesters)
            .Include(s=>s.Subjects).ThenInclude(s => s.Department)
            .Include(s=>s.Schedules)
            .ToListAsync();

            if (!string.IsNullOrWhiteSpace(query.SubjectId.ToString()))
            {
                data = data.Where(i => i.SubjectId == query.SubjectId).ToList();
            }
            if (!string.IsNullOrWhiteSpace(query.SemesterId.ToString()))
            {
                data = data.Where(i => i.SemesterId == query.SemesterId).ToList();
            }
            if (!string.IsNullOrWhiteSpace(query.Character))
            {
                var normalizedAcademicYear = VietnameseConverter.ConvertToUnaccented(query.Character);
                data = data.Where(i => VietnameseConverter.ConvertToUnaccented(i.Character).Contains(normalizedAcademicYear)).ToList();
            }
            return data;
        }

        public async Task<Section?> GetByIdAsync(int id)
        {
            return await _context.Sections
            .Include(s => s.Semesters).Include(s=>s.Subjects).Include(s=>s.Schedules)
            .FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<Section?> UpdateAsync(int id, UpdateSectionRequestDto SectionDto)
        {
            var existingSection = await _context.Sections.FirstOrDefaultAsync(x => x.Id == id);

            if (existingSection == null) return null;

            existingSection.Character = SectionDto.Character;
            existingSection.SubjectId = SectionDto.SubjectId;
            existingSection.SemesterId = SectionDto.SemesterId;
            existingSection.StartDate = SectionDto.StartDate;
            existingSection.EndDate = SectionDto.EndDate;

            await _context.SaveChangesAsync();

            return existingSection;
        }
        public Task<bool> SectionExist(int id)
        {
            return _context.Sections.AnyAsync(i => i.Id == id);
        }
    }
}