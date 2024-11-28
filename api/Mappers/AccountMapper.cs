using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Dtos.Major;
using api.Models;

namespace api.Mappers
{
    public static class AccountMapper
    {
         public static AccountDto ToAccountDto(this AppUser accountModel)
        {
            return new AccountDto
            {
                Id = accountModel.Id,
                RoleName = accountModel.RoleName,
                UserName = accountModel.UserName,
                Email = accountModel.Email,
                PhoneNumber = accountModel.PhoneNumber,
                Name = accountModel.Name,
                BirthDate = accountModel.BirthDate,
                UrlImage = accountModel.UrlImage,
                Male = accountModel.Male,
                MajorId = accountModel.MajorId,
                DepartmentId =accountModel.DepartmentId,
                Department = accountModel.Department != null ? new Department
                {
                    Id = accountModel.Department.Id,
                    Name = accountModel.Department.Name,
                } : null,
                Class = accountModel.Class != null ? new Class
                {
                    Id = accountModel.Class.Id,
                    Name = accountModel.Class.Name,
                } : null,

                Major = accountModel.Major != null ? new Major
                {
                    Id = accountModel.Major.Id,
                    Name = accountModel.Major.Name,
                } : null,
                IsInternal = accountModel.IsInternal,
                ClassId = accountModel.ClassId,
                RefreshToken = accountModel.RefreshToken,
                RefreshTokenExpirytime = accountModel.RefreshTokenExpirytime,
            };
        }
        public static AppUser ToAccountFromUpdateDTO(this UpdateAccountRequestDto accountDto)
        {
            return new AppUser
            {
                UserName = accountDto.UserName,
                Email = accountDto.Email,
                PhoneNumber = accountDto.PhoneNumber,
                Name = accountDto.Name,
                BirthDate = accountDto.BirthDate,
                UrlImage = accountDto.UrlImage,
                Male = accountDto.Male,
                MajorId = accountDto.MajorId,

                DepartmentId =accountDto.DepartmentId,
                IsInternal = accountDto.IsInternal,
                ClassId = accountDto.ClassId,

            };
        }
    }
}