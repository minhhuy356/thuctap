using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Major;
using api.Models;

namespace api.Mappers
{
    public static class MajorMapper
    {
        public static MajorDto ToMajorDto(this Major majorModel)
        {
            return new MajorDto
            {
                Id = majorModel.Id,
                Name = majorModel.Name,
                Description = majorModel.Description,
                DepartmentId = majorModel.DepartmentId,
                Department = majorModel.Department != null ? new Department
                {
                    Id = majorModel.Department.Id,
                    Name = majorModel.Department.Name,
                } : null,
                IsSet = majorModel.isSet,
            };
        }

        public static Major ToMajorFromCreateDTO(this CreateMajorRequestDto majorDto, int departmentId)
        {
            return new Major
            {
                Name = majorDto.Name,
                Description = majorDto.Description,
                DepartmentId = departmentId,
            };
        }
        public static Major ToMajorFromUpdateDTO(this UpdateMajorRequestDto majorDto)
        {
            return new Major
            {
                Name = majorDto.Name,
                Description = majorDto.Description,
                DepartmentId = majorDto.DepartmentId,
            };
        }
    }
}