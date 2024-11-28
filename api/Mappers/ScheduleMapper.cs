using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Major;
using api.Dtos.Schedule;
using api.Models;

namespace api.Mappers
{
    public static class ScheduleMapper
    {
        public static ScheduleDto ToScheduleDto(this Schedule scheduleModel)
        {
            return new ScheduleDto
            {
                Id = scheduleModel.Id,
                TimeStart = scheduleModel.TimeStart,
                TimeEnd = scheduleModel.TimeEnd,
                SectionId= scheduleModel.SectionId,
                DayOfWeek = scheduleModel.DayOfWeek,
                Sections = scheduleModel.Sections != null ? new Section
                {
                    Id = scheduleModel.Sections.Id,
                    Semesters = scheduleModel.Sections.Semesters != null ? new Semester
                    {
                        Id = scheduleModel.Sections.Semesters.Id,
                        Name = scheduleModel.Sections.Semesters.Name,
                        AcademicYear = scheduleModel.Sections.Semesters.AcademicYear
                    } : null,
                    Subjects = scheduleModel.Sections.Subjects != null ? new Subject
                    {
                        Id = scheduleModel.Sections.Subjects.Id,
                        Name = scheduleModel.Sections.Subjects.Name,
                        DepartmentId= scheduleModel.Sections.Subjects.DepartmentId
                    } : null,
                    Character = scheduleModel.Sections.Character
                } : null,
            };
        }

        public static Schedule ToScheduleFromCreateDTO(this CreateScheduleRequestDto scheduleDto)
        {
            return new Schedule
            {
                TimeStart = scheduleDto.TimeStart,
                TimeEnd = scheduleDto.TimeEnd,
                SectionId= scheduleDto.SectionId,
                DayOfWeek = scheduleDto.DayOfWeek,
            };
        }
        public static Schedule ToScheduleFromUpdateDTO(this UpdateScheduleRequestDto scheduleDto)
        {
            return new Schedule
            {

                TimeStart = scheduleDto.TimeStart,
                TimeEnd = scheduleDto.TimeEnd,
                SectionId= scheduleDto.SectionId,
                DayOfWeek = scheduleDto.DayOfWeek,
            };
        }
    }

}