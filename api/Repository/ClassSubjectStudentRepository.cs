// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using api.Common;
// using api.Data;
// using api.Dtos.ClassSubjectStudent;
// using api.Helper;
// using api.Interfaces;
// using api.Models;
// using Microsoft.EntityFrameworkCore;

// namespace api.Repository
// {
//     public class ClassSubjectStudentRepository : IClassSubjectStudentRepository
//     {
//         ApplicationDBContext _context;
//         public ClassSubjectStudentRepository(ApplicationDBContext context)
//         {
//             _context = context;
//         }

//         public async Task<ClassSubjectStudent> CreateAsync(ClassSubjectStudent ClassSubjectStudentModel)
//         {
//             await _context.ClassSubjectStudents.AddAsync(ClassSubjectStudentModel);
//             await _context.SaveChangesAsync();
//             return ClassSubjectStudentModel;
//         }

//         public async Task<List<ClassSubjectStudent>> GetAllAsync(ClassSubjectStudentQuery query)
//         {
//             var data = await _context.ClassSubjectStudents.ToListAsync();


//             if (query.PageSize.HasValue) // Chỉ phân trang khi PageSize có giá trị
//             {
//                 var skipNumber = (query.PageNumber - 1) * query.PageSize.Value;
//                 data = data.Skip(skipNumber).Take(query.PageSize.Value).ToList();
//             }

//             return data;
//         }

//         public async Task<ClassSubjectStudent?> GetByIdAsync(int AppUserId, int classSubjectId)
//         {
//             return await _context.ClassSubjectStudents
//                 .FirstOrDefaultAsync(cs => cs.AppUserId == AppUserId && cs.ClassSubjectId == classSubjectId);
//         }

//         public async Task<ClassSubjectStudent?> UpdateAsync(int appUserId, int classSubjectId, UpdateClassSubjectStudentRequestDto ClassSubjectStudentDto)
//         {
//             var existingClassSubjectStudent = await _context.ClassSubjectStudents.FirstOrDefaultAsync(cs => cs.AppUserId == appUserId && cs.ClassSubjectId == classSubjectId);

//             if (existingClassSubjectStudent == null) return null;

//             existingClassSubjectStudent.AppUserId = appUserId;
//             existingClassSubjectStudent.ClassSubjectId = classSubjectId;
//             existingClassSubjectStudent.Grade = ClassSubjectStudentDto.Grade;


//             await _context.SaveChangesAsync();

//             return existingClassSubjectStudent;
//         }

//         public async Task<ClassSubjectStudent?> DeleteAsync(int appUserId, int classSubjectId)
//         {
//             var ClassSubjectStudentModel = await _context.ClassSubjectStudents.FirstOrDefaultAsync(cs => cs.AppUserId == appUserId && cs.ClassSubjectId == classSubjectId);

//             if (ClassSubjectStudentModel == null) return null;

//             _context.Remove(ClassSubjectStudentModel);
//             await _context.SaveChangesAsync();

//             return ClassSubjectStudentModel;
//         }
//         public Task<bool> ClassSubjectStudentExist(int appUserId, int classSubjectId)
//         {
//             return _context.ClassSubjectStudents.AnyAsync(cs => cs.AppUserId == appUserId && cs.ClassSubjectId == classSubjectId);
//         }
//     }
// }