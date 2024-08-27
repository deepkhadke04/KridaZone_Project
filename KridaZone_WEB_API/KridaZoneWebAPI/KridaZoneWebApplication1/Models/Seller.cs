using System;
using System.Collections.Generic;

namespace KridaZoneWebApplication1.Models
{
    public partial class Seller
    {
        public Seller()
        {
            SellerProducts = new HashSet<SellerProduct>();
        }

        public int SellerId { get; set; }
        public string? SellerName { get; set; } = null!;
        public string? Email { get; set; } = null!;
        public string? Contact { get; set; } = null!;
        public string? Address { get; set; } = null!;
        public string? GstNo { get; set; } = null!;
        public int? UserId { get; set; }

        public virtual User? User { get; set; }
        public virtual ICollection<SellerProduct>? SellerProducts { get; set; }
    }
}
