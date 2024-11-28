using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Deparment;
using api.Dtos.Major;

using api.Models;

namespace api.Mappers
{
    public static class DepartmentMapper
    {

        public static DepartmentDto ToDepartmentDto(this Department departmentModel)
        {
            return new DepartmentDto
            {
                Id = departmentModel.Id,
                Name = departmentModel.Name,
                Majors = departmentModel.Majors.Select(m => new MajorDto
                {
                    Id = m.Id,
                    Name = m.Name,
                    DepartmentId = m.DepartmentId
                }).ToList(),
            };
        }



        public static Department ToDepartmentFromCreateDTO(this CreateDepartmentRequestDto departmentDto)
        {
            return new Department
            {
                Name = departmentDto.Name,
            };
        }
        public static Department ToDepartmentFromUpdateDTO(this UpdateDepartmentRequestDto departmentDto)
        {
            return new Department
            {
                Name = departmentDto.Name,
            };
        }
    }
}