using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Szkola.API.Migrations
{
    public partial class StudentModelDatefixed2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "BirthDate",
                table: "Students",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "date");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "BirthDate",
                table: "Students",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime));
        }
    }
}
