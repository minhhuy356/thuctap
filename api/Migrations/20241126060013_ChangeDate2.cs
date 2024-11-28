using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class ChangeDate2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0b3eebbc-e5a8-418e-8366-a64b4d67d610");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1249d082-bf38-4d46-acd9-85e47087989e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e120dd21-5e6f-4ba7-9c72-c3a36d3c64c7");

            migrationBuilder.AlterColumn<TimeSpan>(
                name: "TimeStart",
                table: "Schedules",
                type: "time",
                nullable: false,
                oldClrType: typeof(DateTimeOffset),
                oldType: "datetimeoffset");

            migrationBuilder.AlterColumn<TimeSpan>(
                name: "TimeEnd",
                table: "Schedules",
                type: "time",
                nullable: false,
                oldClrType: typeof(DateTimeOffset),
                oldType: "datetimeoffset");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "TimeStart",
                table: "Schedules",
                type: "datetimeoffset",
                nullable: false,
                oldClrType: typeof(TimeSpan),
                oldType: "time");

            migrationBuilder.AlterColumn<DateTimeOffset>(
                name: "TimeEnd",
                table: "Schedules",
                type: "datetimeoffset",
                nullable: false,
                oldClrType: typeof(TimeSpan),
                oldType: "time");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0b3eebbc-e5a8-418e-8366-a64b4d67d610", null, "User", "USER" },
                    { "1249d082-bf38-4d46-acd9-85e47087989e", null, "Admin", "ADMIN" },
                    { "e120dd21-5e6f-4ba7-9c72-c3a36d3c64c7", null, "Teacher", "TEACHER" }
                });
        }
    }
}
