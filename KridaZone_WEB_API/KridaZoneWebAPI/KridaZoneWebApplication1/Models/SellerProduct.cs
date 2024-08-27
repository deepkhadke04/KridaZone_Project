using System;
using System.Collections.Generic;

namespace KridaZoneWebApplication1.Models
{
    public partial class SellerProduct
    {
        public SellerProduct()
        {
            Carts = new HashSet<Cart>();
            OrderDetails = new HashSet<OrderDetail>();
            Reviews = new HashSet<Review>();
        }

        public int SellerProductId { get; set; }
        public float? Price { get; set; }
        public byte[]? Image1 { get; set; }
        public byte[]? Image2 { get; set; }
        public byte[]? Image3 { get; set; }
        public int? Quantity { get; set; }
        public int? SellerId { get; set; }
        public int? ProductId { get; set; }

        public virtual Product? Product { get; set; }
        public virtual Seller? Seller { get; set; }
        public virtual ICollection<Cart>? Carts { get; set; }
        public virtual ICollection<OrderDetail>? OrderDetails { get; set; }
        public virtual ICollection<Review>? Reviews { get; set; }
    }
}
