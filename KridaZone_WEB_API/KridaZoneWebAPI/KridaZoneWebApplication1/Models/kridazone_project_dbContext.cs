using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace KridaZoneWebApplication1.Models
{
    public partial class kridazone_project_dbContext : DbContext
    {
        public kridazone_project_dbContext()
        {
        }

        public kridazone_project_dbContext(DbContextOptions<kridazone_project_dbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Brand> Brands { get; set; } = null!;
        public virtual DbSet<Cart> Carts { get; set; } = null!;
        public virtual DbSet<Customer> Customers { get; set; } = null!;
        public virtual DbSet<Order> Orders { get; set; } = null!;
        public virtual DbSet<OrderDetail> OrderDetails { get; set; } = null!;
        public virtual DbSet<Payment> Payments { get; set; } = null!;
        public virtual DbSet<Product> Products { get; set; } = null!;
        public virtual DbSet<Review> Reviews { get; set; } = null!;
        public virtual DbSet<Role> Roles { get; set; } = null!;
        public virtual DbSet<Seller> Sellers { get; set; } = null!;
        public virtual DbSet<SellerProduct> SellerProducts { get; set; } = null!;
        public virtual DbSet<User> Users { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=root;database=kridazone_project_db", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.2.0-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.UseCollation("utf8mb4_0900_ai_ci")
                .HasCharSet("utf8mb4");

            modelBuilder.Entity<Brand>(entity =>
            {
                entity.ToTable("brands");

                entity.Property(e => e.BrandId).HasColumnName("brand_id");

                entity.Property(e => e.ActiveStatus).HasColumnName("active_status");

                entity.Property(e => e.BrandName)
                    .HasMaxLength(30)
                    .HasColumnName("brand_name");

                entity.Property(e => e.BrandStatus).HasColumnName("brand_status");
            });

            modelBuilder.Entity<Cart>(entity =>
            {
                entity.ToTable("cart");

                entity.HasIndex(e => e.CustomerId, "customer_id_idx");

                entity.HasIndex(e => e.SellerProductId, "seller_product_id_idx");

                entity.Property(e => e.CartId).HasColumnName("cart_id");

                entity.Property(e => e.Amount).HasColumnName("amount");

                entity.Property(e => e.CustomerId).HasColumnName("customer_id");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.SellerProductId).HasColumnName("seller_product_id");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Carts)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("customer_id");

                entity.HasOne(d => d.SellerProduct)
                    .WithMany(p => p.Carts)
                    .HasForeignKey(d => d.SellerProductId)
                    .HasConstraintName("seller_product_id");
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToTable("customers");

                entity.HasIndex(e => e.Adhaar, "adhaar_UNIQUE")
                    .IsUnique();

                entity.HasIndex(e => e.UserId, "user_id_idx");

                entity.Property(e => e.CustomerId).HasColumnName("customer_id");

                entity.Property(e => e.Address)
                    .HasMaxLength(200)
                    .HasColumnName("address");

                entity.Property(e => e.Adhaar)
                    .HasMaxLength(12)
                    .HasColumnName("adhaar");

                entity.Property(e => e.Contact)
                    .HasMaxLength(15)
                    .HasColumnName("contact");

                entity.Property(e => e.CustomerFname)
                    .HasMaxLength(30)
                    .HasColumnName("customer_fname");

                entity.Property(e => e.CustomerLname)
                    .HasMaxLength(30)
                    .HasColumnName("customer_lname");

                entity.Property(e => e.Email)
                    .HasMaxLength(40)
                    .HasColumnName("email");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Customers)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("user_id_c");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.ToTable("orders");

                entity.HasIndex(e => e.CustomerId, "customer_id_idx");

                entity.Property(e => e.OrderId).HasColumnName("order_id");

                entity.Property(e => e.Amount).HasColumnName("amount");

                entity.Property(e => e.CustomerId).HasColumnName("customer_id");

                entity.Property(e => e.Date).HasColumnName("date");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("customer_id_o");
            });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.HasKey(e => e.OrderDetailsId)
                    .HasName("PRIMARY");

                entity.ToTable("order_details");

                entity.HasIndex(e => e.OrderId, "order_id_idx");

                entity.HasIndex(e => e.SellerProductId, "seller_product_id_idx");

                entity.Property(e => e.OrderDetailsId).HasColumnName("order_details_id");

                entity.Property(e => e.Amount).HasColumnName("amount");

                entity.Property(e => e.OrderId).HasColumnName("order_id");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.SellerProductId).HasColumnName("seller_product_id");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("order_id");

                entity.HasOne(d => d.SellerProduct)
                    .WithMany(p => p.OrderDetails)
                    .HasForeignKey(d => d.SellerProductId)
                    .HasConstraintName("seller_product_id_od");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.ToTable("payment");

                entity.HasIndex(e => e.OrderId, "order_id_p_idx");

                entity.HasIndex(e => e.Utr, "utr_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.PaymentId).HasColumnName("payment_id");

                entity.Property(e => e.Amount).HasColumnName("amount");

                entity.Property(e => e.Date).HasColumnName("date");

                entity.Property(e => e.OrderId).HasColumnName("order_id");

                entity.Property(e => e.TransactionType)
                    .HasMaxLength(30)
                    .HasColumnName("transaction_type");

                entity.Property(e => e.Utr)
                    .HasMaxLength(50)
                    .HasColumnName("utr");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("order_id_p");
            });

            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("products");

                entity.HasIndex(e => e.BrandId, "brand_id_idx");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.ActiveStatus).HasColumnName("active_status");

                entity.Property(e => e.BrandId).HasColumnName("brand_id");

                entity.Property(e => e.ProductName)
                    .HasMaxLength(30)
                    .HasColumnName("product_name");

                entity.HasOne(d => d.Brand)
                    .WithMany(p => p.Products)
                    .HasForeignKey(d => d.BrandId)
                    .HasConstraintName("brand_id");
            });

            modelBuilder.Entity<Review>(entity =>
            {
                entity.ToTable("reviews");

                entity.HasIndex(e => e.CustomerId, "customer_id_r_idx");

                entity.HasIndex(e => e.SellerProductId, "seller_product_id_r_idx");

                entity.Property(e => e.ReviewId).HasColumnName("review_id");

                entity.Property(e => e.Comment)
                    .HasMaxLength(200)
                    .HasColumnName("comment");

                entity.Property(e => e.CustomerId).HasColumnName("customer_id");

                entity.Property(e => e.Rating).HasColumnName("rating");

                entity.Property(e => e.SellerProductId).HasColumnName("seller_product_id");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("customer_id_r");

                entity.HasOne(d => d.SellerProduct)
                    .WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.SellerProductId)
                    .HasConstraintName("seller_product_id_r");
            });

            modelBuilder.Entity<Role>(entity =>
            {
                entity.ToTable("role");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.Property(e => e.RoleName)
                    .HasMaxLength(30)
                    .HasColumnName("role_name");
            });

            modelBuilder.Entity<Seller>(entity =>
            {
                entity.ToTable("sellers");

                entity.HasIndex(e => e.UserId, "user_id_idx");

                entity.Property(e => e.SellerId).HasColumnName("seller_id");

                entity.Property(e => e.Address)
                    .HasMaxLength(100)
                    .HasColumnName("address");

                entity.Property(e => e.Contact)
                    .HasMaxLength(15)
                    .HasColumnName("contact");

                entity.Property(e => e.Email)
                    .HasMaxLength(40)
                    .HasColumnName("email");

                entity.Property(e => e.GstNo)
                    .HasMaxLength(15)
                    .HasColumnName("gst_no");

                entity.Property(e => e.SellerName)
                    .HasMaxLength(30)
                    .HasColumnName("seller_name");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Sellers)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("user_id");
            });

            modelBuilder.Entity<SellerProduct>(entity =>
            {
                entity.ToTable("seller_products");

                entity.HasIndex(e => e.ProductId, "product_id_idx");

                entity.HasIndex(e => e.SellerId, "seller_id_idx");

                entity.Property(e => e.SellerProductId).HasColumnName("seller_product_id");

                entity.Property(e => e.Image1).HasColumnName("image1");

                entity.Property(e => e.Image2).HasColumnName("image2");

                entity.Property(e => e.Image3).HasColumnName("image3");

                entity.Property(e => e.Price).HasColumnName("price");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.Property(e => e.SellerId).HasColumnName("seller_id");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.SellerProducts)
                    .HasForeignKey(d => d.ProductId)
                    .HasConstraintName("product_id");

                entity.HasOne(d => d.Seller)
                    .WithMany(p => p.SellerProducts)
                    .HasForeignKey(d => d.SellerId)
                    .HasConstraintName("seller_id");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");

                entity.HasIndex(e => e.RoleId, "role_id_idx");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.ActiveStatus).HasColumnName("active_status");

                entity.Property(e => e.Password)
                    .HasMaxLength(20)
                    .HasColumnName("password");

                entity.Property(e => e.RoleId).HasColumnName("role_id");

                entity.Property(e => e.UserName)
                    .HasMaxLength(30)
                    .HasColumnName("user_name");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.RoleId)
                    .HasConstraintName("role_id");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
