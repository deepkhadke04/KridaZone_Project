using System;
using System.Collections.Generic;

namespace KridaZoneWebApplication1.Models
{
    public partial class Brand
    {
        public Brand()
        {
            Products = new HashSet<Product>();
        }

        public int BrandId { get; set; }
        public string? BrandName { get; set; } = null!;
        public int? BrandStatus { get; set; }
        public int? ActiveStatus { get; set; }

        public virtual ICollection<Product>? Products { get; set; }
    }
}
