using System;
using System.Collections.Generic;

namespace KridaZoneWebApplication1.Models
{
    public partial class OrderDetail
    {
        public int OrderDetailsId { get; set; }
        public float Amount { get; set; }
        public int Quantity { get; set; }
        public int? SellerProductId { get; set; }
        public int? OrderId { get; set; }

        public virtual Order? Order { get; set; }
        public virtual SellerProduct? SellerProduct { get; set; }
    }
}
