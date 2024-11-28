using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Schedule;
using api.Dtos.Subject;
using api.Models;

namespace api.Mappers
{
    public static class SubjectMapper
    {
        public static SubjectDto ToSubjectDto(this Subject subjectModel)
        {
            return new SubjectDto
            {
                Id = subjectModel.Id,
                Name = subjectModel.Name,
                CreditHours = subjectModel.CreditHours,
                DepartmentId = subjectModel.DepartmentId,
                Code = subjectModel.Code,
                Department = subjectModel.Department != null ? new Department
                {
                    Id = subjectModel.Department.Id,
                    Name = subjectModel.Department.Name,
                } : null,
            };
        }

        public static Subject ToSubjectFromCreateDTO(this CreateSubjectRequestDto subjectDto, int departmentId)
        {
            return new Subject
            {
                Name = subjectDto.Name,
                CreditHours = subjectDto.CreditHours,
                DepartmentId = departmentId,
                Code = subjectDto.Code,
            };
        }
        public static Subject ToSubjectFromUpdateDTO(this UpdateSubjectRequestDto subjectDto)
        {
            return new Subject
            {
                Name = subjectDto.Name,
                CreditHours = subjectDto.CreditHours,
                DepartmentId = subjectDto.DepartmentId,
                Code = subjectDto.Code,
            };
        }
    }
}