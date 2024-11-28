using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class ChangeTime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                    { "6074e663-1e1e-45e5-ae93-c420dfcc564d", null, "User", "USER" },
                    { "a498531a-4bd3-4186-a88a-ac9db4d6fcc9", null, "Admin", "ADMIN" },
                    { "af755943-dd0f-4e0d-80b1-28ac925c4804", null, "Teacher", "TEACHER" }
                });
        }
    }
}
