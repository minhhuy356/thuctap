using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Course;
using api.Models;

namespace api.Mappers
{
    public static class CourseMapper
    {
        public static CourseDto ToCourseDto(this Course courseModel)
        {
            return new CourseDto
            {
                Id = courseModel.Id,
                Name = courseModel.Name,
                StartYear = courseModel.StartYear,
                EndYear = courseModel.EndYear
            };
        }

        public static Course ToCourseFromCreateDTO(this CreateCourseRequestDto courseDto)
        {
            return new Course
            {
                Name = courseDto.Name,
                StartYear = courseDto.StartYear,
                EndYear = courseDto.EndYear
            };
        }
        public static Course ToCourseFromUpdateDTO(this UpdateCourseRequestDto courseDto)
        {
            return new Course
            {
                Name = courseDto.Name,
                StartYear = courseDto.StartYear,
                EndYear = courseDto.EndYear
            };
        }
    }
}