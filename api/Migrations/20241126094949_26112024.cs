using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class _26112024 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "30e0e3fd-a5cd-49eb-b5c8-452a3dfb2e50");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "da6713db-42b1-45ff-8d8a-38a448a6cf88");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e79e4129-ae7a-4bd4-8ae1-03ef042f726a");

            migrationBuilder.AlterColumn<string>(
                name: "Character",
                table: "Sections",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "2f547d24-00d6-4e08-9b7c-6ff965ab973d", null, "Admin", "ADMIN" },
                    { "b6da7a30-4310-4873-9a30-4dc462dcd9b5", null, "User", "USER" },
                    { "d17296fc-0411-41cc-8e42-e51788763bde", null, "Teacher", "TEACHER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "2f547d24-00d6-4e08-9b7c-6ff965ab973d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b6da7a30-4310-4873-9a30-4dc462dcd9b5");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d17296fc-0411-41cc-8e42-e51788763bde");

            migrationBuilder.AlterColumn<string>(
                name: "Character",
                table: "Sections",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "30e0e3fd-a5cd-49eb-b5c8-452a3dfb2e50", null, "Admin", "ADMIN" },
                    { "da6713db-42b1-45ff-8d8a-38a448a6cf88", null, "User", "USER" },
                    { "e79e4129-ae7a-4bd4-8ae1-03ef042f726a", null, "Teacher", "TEACHER" }
                });
        }
    }
}
