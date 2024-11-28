using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class addTeacherRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "84cde464-1b16-4fc1-9b1a-6244a58bc6b5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "cb92eee6-245b-4566-8deb-9ad3df1dbf6c");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0b1eae21-e492-4659-859e-01838596dbcd", null, "Admin", "ADMIN" },
                    { "dc546118-048c-440d-9a6a-25dbe9122a7c", null, "User", "USER" },
                    { "e72d8d82-86e3-46bc-90a3-3fe3df284282", null, "Teacher", "TEACHER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0b1eae21-e492-4659-859e-01838596dbcd");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dc546118-048c-440d-9a6a-25dbe9122a7c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e72d8d82-86e3-46bc-90a3-3fe3df284282");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "84cde464-1b16-4fc1-9b1a-6244a58bc6b5", null, "Admin", "ADMIN" },
                    { "cb92eee6-245b-4566-8deb-9ad3df1dbf6c", null, "User", "USER" }
                });
        }
    }
}
