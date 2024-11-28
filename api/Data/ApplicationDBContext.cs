using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }
        public DbSet<Class> Classes { get; set; }
        public DbSet<Grade> Grade { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Major> Majors { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Semester> Semesters { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Section> Sections { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole{
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole{
                    Name = "User",
                    NormalizedName = "USER"
                },
                new IdentityRole{
                    Name = "Teacher",
                    NormalizedName = "TEACHER"
                }
            };
            builder.Entity<IdentityRole>().HasData(roles);
            // Khóa chính cho ClassSubjectStudent (khóa tổng hợp)
            builder.Entity<Grade>()
                .HasKey(g => new { g.AppUserId, g.SectionId });

            // Setting up ClassSubject relationship with no cascading delete
            // Trong phương thức OnModelCreating
            builder.Entity<Grade>()
                .HasOne(g => g.AppUser)
                .WithMany(s => s.Grades)
                .HasForeignKey(cs => cs.AppUserId)
                .OnDelete(DeleteBehavior.NoAction); // Ngăn xóa liên kết theo cascade

            base.OnModelCreating(builder);
        }

    }
}

