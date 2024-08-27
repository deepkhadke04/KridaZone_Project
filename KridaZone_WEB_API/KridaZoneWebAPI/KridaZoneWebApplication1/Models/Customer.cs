using System;
using System.Collections.Generic;

namespace KridaZoneWebApplication1.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Carts = new HashSet<Cart>();
            Orders = new HashSet<Order>();
            Reviews = new HashSet<Review>();
        }

        public int CustomerId { get; set; }
        public string? CustomerFname { get; set; } = null!;
        public string? CustomerLname { get; set; } = null!;
        public string? Address { get; set; } = null!;
        public string? Contact { get; set; } = null!;
        public string? Email { get; set; } = null!;
        public string? Adhaar { get; set; } = null!;
        public int? UserId { get; set; }

        public virtual User? User { get; set; }
        public virtual ICollection<Cart>? Carts { get; set; }
        public virtual ICollection<Order>? Orders { get; set; }
        public virtual ICollection<Review>? Reviews { get; set; }
    }
}
