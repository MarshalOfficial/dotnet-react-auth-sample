using dotnet.auth.api.Data.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace dotnet.auth.api.Migrations
{
    /// <inheritdoc />
    public partial class seeddefaultusers3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Hash a password for the default user
            var hasher = new PasswordHasher<ApplicationUser>();
            var hashedPassword = hasher.HashPassword(null, "Pass110!@#$%^");

            // Insert default user data into the AspNetUsers table
            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "UserName", "NormalizedUserName", "Email", "NormalizedEmail", "EmailConfirmed", "PasswordHash", "SecurityStamp", "ConcurrencyStamp", "PhoneNumberConfirmed", "TwoFactorEnabled", "LockoutEnabled", "AccessFailedCount" },
                values: new object[] { Guid.NewGuid().ToString(), "defaultuser", "DEFAULTUSER", "defaultuser@example.com", "DEFAULTUSER@EXAMPLE.COM", true, hashedPassword, Guid.NewGuid().ToString(), Guid.NewGuid().ToString(), false, false, true, 0 }
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
