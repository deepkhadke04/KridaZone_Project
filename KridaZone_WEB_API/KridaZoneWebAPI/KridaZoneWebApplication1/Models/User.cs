using System;
using System.Collections.Generic;

namespace KridaZoneWebApplication1.Models
{
    public partial class User
    {
        public User()
        {
            Customers = new HashSet<Customer>();
            Sellers = new HashSet<Seller>();
        }

        public int UserId { get; set; }
        public string? UserName { get; set; } = null!;
        public string? Password { get; set; } = null!;
        public int? ActiveStatus { get; set; }
        public int? RoleId { get; set; }

        public virtual Role? Role { get; set; }
        public virtual ICollection<Customer>? Customers { get; set; }
        public virtual ICollection<Seller>? Sellers { get; set; }
    }
}
