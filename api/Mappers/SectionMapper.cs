using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Schedule;
using api.Dtos.Section;
using api.Models;

namespace api.Mappers
{
    public static class SectionMapper
    {
        public static SectionDto ToSectionDto(this Section SectionModel)
        {
            return new SectionDto
            {
                Id = SectionModel.Id,
                SemesterId = SectionModel.SemesterId,
                Character = SectionModel.Character,
                SubjectId = SectionModel.SubjectId,
                StartDate = SectionModel.StartDate,
                EndDate = SectionModel.EndDate,
                Semesters = SectionModel.Semesters != null ? new Semester
                {
                    Id = SectionModel.Semesters.Id,
                    Name = SectionModel.Semesters.Name,
                    AcademicYear = SectionModel.Semesters.AcademicYear
                } : null,
                Subjects = SectionModel.Subjects != null ? new Subject
                {
                    Id = SectionModel.Subjects.Id,
                    Name = SectionModel.Subjects.Name,
                    DepartmentId= SectionModel.Subjects.DepartmentId,
                    Department = SectionModel.Subjects.Department != null ? new Department
                    {
                        Id =  SectionModel.Subjects.Department.Id,
                        Name = SectionModel.Subjects.Department.Name
                    } : null,
                } : null,
                Schedules = SectionModel.Schedules.Select(s =>  new ScheduleDto {
                    Id = s.Id,
                    DayOfWeek = s.DayOfWeek,
                    TimeEnd = s.TimeEnd,
                    TimeStart = s.TimeStart,
                    SectionId = s.SectionId
                    
                }).ToList(),
            };
        }

        public static Section ToSectionFromCreateDTO(this CreateSectionRequestDto SectionDto)
        {
            return new Section
            {
                SemesterId = SectionDto.SemesterId,
                Character = SectionDto.Character,
                SubjectId = SectionDto.SubjectId,
                StartDate = SectionDto.StartDate,
                EndDate = SectionDto.EndDate,
            };
        }
        public static Section ToSectionFromUpdateDTO(this UpdateSectionRequestDto SectionDto)
        {
            return new Section
            {
                SemesterId = SectionDto.SemesterId,
                Character = SectionDto.Character,
                SubjectId = SectionDto.SubjectId,
            };
        }
    }
}