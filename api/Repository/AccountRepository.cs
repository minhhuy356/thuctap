using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Common;
using api.Dtos.Account;
using api.Helper;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public AccountRepository(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public Task<AppUser> CreateAsync(AccountQuery accountModel)
        {
            throw new NotImplementedException();
        }

        public async Task<AppUser?> DeleteAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return null; // Không tìm thấy người dùng
            }

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
            {
                throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));
            }

            return user;
        }

        public async Task<List<AppUser>> GetAllAsync(AccountQuery query)
        {
            var datas = await _userManager.Users
                .Include(c => c.Class)
                .Include(c => c.Department)
                .Include(c => c.Major)
                .ToListAsync();

            foreach (var data in datas)
            {
                // Lấy danh sách các vai trò của người dùng
                var roles = await _userManager.GetRolesAsync(data);
                // Gắn vai trò vào thuộc tính RoleName của AppUser (giả sử bạn có một thuộc tính như vậy trong AppUser)
                data.RoleName = roles.Any() ? string.Join(", ", roles) : "No Role"; 
            }


            return datas;
        }


        public async Task<AppUser?> GetByIdAsync(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if(user != null){
                return null;
            }

            return user;
        }

        public async Task<AppUser?> UpdateAsync(string id, UpdateAccountRequestDto accountDto)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return null; // Không tìm thấy người dùng
            }

            // Cập nhật thông tin người dùng từ classDto
            user.UserName = accountDto.UserName;
            user.Email = accountDto.Email;
            user.PhoneNumber = accountDto.PhoneNumber;
            user.BirthDate = accountDto.BirthDate;
            user.ClassId = accountDto.ClassId;
            user.DepartmentId = accountDto.DepartmentId;
            user.IsInternal = accountDto.IsInternal;
            user.MajorId = accountDto.MajorId;
            user.UrlImage = accountDto.UrlImage;
            user.Male = accountDto.Male;
            user.Name = accountDto.Name;
            // Thêm các thuộc tính khác nếu có

            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                throw new Exception(string.Join(", ", result.Errors.Select(e => e.Description)));
            }

            return user;
        }

        public async Task<bool> AccountExist(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return false;
            }

            return true;
        }
    }
}