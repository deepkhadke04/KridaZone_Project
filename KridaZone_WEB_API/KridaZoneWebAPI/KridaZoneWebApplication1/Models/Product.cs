using System;
using System.Collections.Generic;

namespace KridaZoneWebApplication1.Models
{
    public partial class Product
    {
        public Product()
        {
            SellerProducts = new HashSet<SellerProduct>();
        }

        public int ProductId { get; set; }
        public string? ProductName { get; set; } = null!;
        public int? ActiveStatus { get; set; }
        public int? BrandId { get; set; }

        public virtual Brand? Brand { get; set; }
        public virtual ICollection<SellerProduct>? SellerProducts { get; set; }
    }
}
