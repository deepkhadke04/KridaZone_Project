using System;
using System.Collections.Generic;

namespace KridaZoneWebApplication1.Models
{
    public partial class Review
    {
        public int ReviewId { get; set; }
        public int? Rating { get; set; }
        public string? Comment { get; set; }
        public int? SellerProductId { get; set; }
        public int? CustomerId { get; set; }

        public virtual Customer? Customer { get; set; }
        public virtual SellerProduct? SellerProduct { get; set; }
    }
}
