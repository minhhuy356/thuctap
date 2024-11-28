using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class ChangeDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "Subjects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "StartDate",
                table: "Sections",
                type: "datetimeoffset",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "EndDate",
                table: "Sections",
                type: "datetimeoffset",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "6074e663-1e1e-45e5-ae93-c420dfcc564d", null, "User", "USER" },
                    { "a498531a-4bd3-4186-a88a-ac9db4d6fcc9", null, "Admin", "ADMIN" },
                    { "af755943-dd0f-4e0d-80b1-28ac925c4804", null, "Teacher", "TEACHER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "6074e663-1e1e-45e5-ae93-c420dfcc564d");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "a498531a-4bd3-4186-a88a-ac9db4d6fcc9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "af755943-dd0f-4e0d-80b1-28ac925c4804");

            migrationBuilder.AlterColumn<string>(
                name: "Code",
                table: "Subjects",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "StartDate",
                table: "Sections",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTimeOffset),
                oldType: "datetimeoffset");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "EndDate",
                table: "Sections",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTimeOffset),
                oldType: "datetimeoffset");

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
    }
}
