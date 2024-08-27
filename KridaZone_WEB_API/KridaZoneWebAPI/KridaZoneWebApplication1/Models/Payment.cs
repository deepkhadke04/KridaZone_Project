using System;
using System.Collections.Generic;

namespace KridaZoneWebApplication1.Models
{
    public partial class Payment
    {
        public int PaymentId { get; set; }
        public string? TransactionType { get; set; }
        public float Amount { get; set; }
        public DateOnly Date { get; set; }
        public string Utr { get; set; } = null!;
        public int? OrderId { get; set; }

        public virtual Order? Order { get; set; }
    }
}
