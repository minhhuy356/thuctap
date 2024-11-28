using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Subject;
using api.Helper;
using api.Models;

namespace api.Interfaces
{
    public interface ISubjectRepository
    {
        Task<List<Subject>> GetAllAsync(SubjectQuery query);
        Task<Subject?> GetByIdAsync(int id);
        Task<Subject> CreateAsync(Subject subjectModel);
        Task<Subject?> UpdateAsync(int id, UpdateSubjectRequestDto subjectDto);
        Task<Subject?> DeleteAsync(int id);
        Task<bool> SubjectExist(int id);
    }
}