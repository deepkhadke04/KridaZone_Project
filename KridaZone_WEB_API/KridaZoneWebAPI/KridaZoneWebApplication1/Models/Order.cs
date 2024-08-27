using System;
using System.Collections.Generic;

namespace KridaZoneWebApplication1.Models
{
    public partial class Order
    {
        public Order()
        {
            OrderDetails = new HashSet<OrderDetail>();
            Payments = new HashSet<Payment>();
        }

        public int OrderId { get; set; }
        public float Amount { get; set; }
        public DateOnly Date { get; set; }
        public int? CustomerId { get; set; }

        public virtual Customer? Customer { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
    }
}
