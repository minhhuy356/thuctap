using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Grade;
using api.Models;

namespace api.Mappers
{
    public static class GradeMapper
    {
        public static GradeDto ToGradeDto(this Grade GradeModel)
        {
            return new GradeDto
            {
                AppUserId = GradeModel.AppUserId,
                SectionId = GradeModel.SectionId,
                Score = GradeModel.Score,
                isDone = GradeModel.isDone,
                AppUser = GradeModel.AppUser != null ? new AppUser
                {
                    Id = GradeModel.AppUser.Id,
                    UserName = GradeModel.AppUser.UserName,
                } : null,
                Section = GradeModel.Section != null ? new Section
                {
                    Id = GradeModel.Section.Id,
                    Character = GradeModel.Section.Character,
                    Subjects = GradeModel.Section.Subjects != null ? new Subject{
                        Id = GradeModel.Section.Subjects.Id,
                        Name = GradeModel.Section.Subjects.Name
                    } : null,
                } : null,
            };
        }

        public static Grade ToGradeFromCreateDTO(this CreateGradeRequestDto GradeDto)
        {
            return new Grade
            {
                AppUserId= GradeDto.AppUserId,
                SectionId = GradeDto.SectionId,
                Score = GradeDto.Score,
                isDone = GradeDto.isDone
            };
        }
        public static Grade ToGradeFromUpdateDTO(this UpdateGradeRequestDto GradeDto)
        {
            return new Grade
            {
                Score = GradeDto.Score,
                isDone = GradeDto.isDone
            };
        }
    }

}