using Microsoft.AspNetCore.Identity;

namespace dotnet.auth.api.Data.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string? RefreshToken { get; set; }
        public DateTime? RefreshTokenExpiryTime { get; set; }
    }
}
