using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Szkola.API.Migrations
{
    public partial class addedGradeDatetime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "GradeDateTime",
                table: "Degrees",
                type: "Date",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GradeDateTime",
                table: "Degrees");
        }
    }
}
