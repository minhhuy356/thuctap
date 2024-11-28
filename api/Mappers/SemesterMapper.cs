using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Semester;
using api.Models;

namespace api.Mappers
{
    public static class SemesterMapper
    {
        public static SemesterDto ToSemesterDto(this Semester semesterModel)
        {
            return new SemesterDto
            {
                Id = semesterModel.Id,
                Name = semesterModel.Name,
                AcademicYear = semesterModel.AcademicYear,
            };
        }

        public static Semester ToSemesterFromCreateDTO(this CreateSemesterRequestDto SemesterDto)
        {
            return new Semester
            {
                Name = SemesterDto.Name,
                AcademicYear = SemesterDto.AcademicYear,
            };
        }
        public static Semester ToSemesterFromUpdateDTO(this UpdateSemesterRequestDto SemesterDto)
        {
            return new Semester
            {
                Name = SemesterDto.Name,
                AcademicYear = SemesterDto.AcademicYear,
            };
        }
    }
}