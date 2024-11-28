using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Helper;
using api.Models;

namespace api.Interfaces
{
    public interface IAccountRepository
    {
        Task<List<AppUser>> GetAllAsync(AccountQuery query);
        Task<AppUser?> GetByIdAsync(string id);
        Task<AppUser> CreateAsync(AccountQuery accountModel);
        Task<AppUser?> UpdateAsync(string id, UpdateAccountRequestDto accountDto);
        Task<AppUser?> DeleteAsync(string id);
        Task<bool> AccountExist(string id);
    }
}