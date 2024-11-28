using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Common;
using api.Data;
using api.Dtos.Course;
using api.Helper;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CourseRepository : ICourseRepository
    {
        ApplicationDBContext _context;
        public CourseRepository(ApplicationDBContext context)
        {
            _context = context;
        }

        public async Task<Course> CreateAsync(Course courseModel)
        {
            await _context.Courses.AddAsync(courseModel);
            await _context.SaveChangesAsync();
            return courseModel;
        }

        public async Task<List<Course>> GetAllAsync(CourseQuery query)
        {
            var data = await _context.Courses.ToListAsync();

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

        public async Task<Course?> GetByIdAsync(int id)
        {
            return await _context.Courses.FindAsync(id);
        }

        public async Task<Course?> UpdateAsync(int id, UpdateCourseRequestDto courseDto)
        {
            var existingCourse = await _context.Courses.FirstOrDefaultAsync(x => x.Id == id);

            if (existingCourse == null) return null;

            existingCourse.Name = courseDto.Name;
            existingCourse.StartYear = courseDto.StartYear;
            existingCourse.EndYear = courseDto.EndYear;

            await _context.SaveChangesAsync();

            return existingCourse;
        }
        public async Task<Course?> DeleteAsync(int id)
        {
            var courseModel = await _context.Courses.FirstOrDefaultAsync(x => x.Id == id);

            if (courseModel == null) return null;

            _context.Remove(courseModel);
            await _context.SaveChangesAsync();

            return courseModel;
        }
        public Task<bool> CourseExist(int id)
        {
            return _context.Courses.AnyAsync(i => i.Id == id);
        }
    }
}