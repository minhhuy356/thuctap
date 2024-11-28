using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Section;
using api.Helper;
using api.Models;

namespace api.Interfaces
{
    public interface ISectionRepository
    {
        Task<List<Section>> GetAllAsync(SectionQuery query);
        Task<Section?> GetByIdAsync(int id);
        Task<Section> CreateAsync(Section SectionModel);
        Task<Section?> UpdateAsync(int id, UpdateSectionRequestDto SectionDto);
        Task<Section?> DeleteAsync(int id);
        Task<bool> SectionExist(int id);
    }
}