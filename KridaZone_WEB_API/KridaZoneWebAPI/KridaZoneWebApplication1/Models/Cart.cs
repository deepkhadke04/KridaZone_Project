using System;
using System.Collections.Generic;

namespace KridaZoneWebApplication1.Models
{
    public partial class Cart
    {
        public int CartId { get; set; }
        public int Quantity { get; set; }
        public float Amount { get; set; }
        public int? CustomerId { get; set; }
        public int? SellerProductId { get; set; }

        public virtual Customer? Customer { get; set; }
        public virtual SellerProduct? SellerProduct { get; set; }
    }
}
