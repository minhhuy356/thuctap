using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Class;
using api.Dtos.Course;
using api.Models;

namespace api.Mappers
{
    public static class ClassMapper
    {
        public static ClassDto ToClassDto(this Class classModel)
        {
            return new ClassDto
            {
                Id = classModel.Id,
                Name = classModel.Name,
                DepartmentId = classModel.DepartmentId,
                CourseID = classModel.CourseId,
                Department = classModel.Department != null ? new Department
                {
                    Id = classModel.Department.Id,
                    Name = classModel.Department.Name,
                } : null,
                Course = classModel.Course != null ? new Course
                {
                    Id = classModel.Course.Id,
                    Name = classModel.Course.Name,
                } : null,
            };
        }

        public static Class ToClassFromCreateDTO(this CreateClassRequestDto classDto, int departmentID, int courseId)
        {
            return new Class
            {
                Name = classDto.Name,
                CourseId = courseId,
                DepartmentId = departmentID,
            };
        }
        public static Class ToClassFromUpdateDTO(this UpdateClassRequestDto classDto, int departmentID)
        {
            return new Class
            {
                Name = classDto.Name,
                CourseId = classDto.CourseID,
                DepartmentId = departmentID,
            };
        }
    }

}