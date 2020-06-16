using Microsoft.EntityFrameworkCore.Migrations;

namespace Szkola.API.Migrations
{
    public partial class adddedGradeDesc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Grade",
                table: "Degrees",
                maxLength: 3,
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "GradeDesc",
                table: "Degrees",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GradeDesc",
                table: "Degrees");

            migrationBuilder.AlterColumn<int>(
                name: "Grade",
                table: "Degrees",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 3);
        }
    }
}
