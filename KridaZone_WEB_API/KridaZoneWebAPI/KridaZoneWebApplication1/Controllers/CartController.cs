using KridaZoneWebApplication1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KridaZoneWebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {

        [HttpGet]
        public List<Cart> GetCarts()
        {
            using (var db = new kridazone_project_dbContext())
            {
                return db.Carts.ToList();
            }
        }

        [HttpGet("{cartId}")]
        public IActionResult GetCartById(int cartId)
        {
            using (var db = new kridazone_project_dbContext())
            {
                var cart = db.Carts.FirstOrDefault(c => c.CartId == cartId);
                if (cart == null)
                {
                    return NotFound("Cart not found.");
                }

                return Ok(cart);
            }
        }

        [HttpDelete("{cartId}")]
        public IActionResult RemoveFromCart(int cartId)
        {
            using (var db = new kridazone_project_dbContext())
            {
                var cart = db.Carts.FirstOrDefault(c => c.CartId == cartId);
                if (cart == null)
                {
                    return NotFound("Cart not found.");
                }

                db.Carts.Remove(cart);
                db.SaveChanges();
                return Ok("Product removed from cart successfully!");
            }
        }

        [HttpPost]
        public IActionResult AddToCart([FromBody] Cart cart)
        {
            using (var db = new kridazone_project_dbContext())
            {
                db.Carts.Add(cart);
                db.SaveChanges();
                return Ok("Product added to cart successfully!");
            }
        }

        [HttpGet("getbycustomer/{customerId}")]
        public IActionResult GetCartByCustomerId(int customerId)
        {
            using (var db = new kridazone_project_dbContext())
            {
                var carts = db.Carts
                              .Include(c => c.SellerProduct)
                              .ThenInclude(sp => sp.Product)
                              .Where(c => c.CustomerId == customerId)
                              .ToList();

                if (carts == null || !carts.Any())
                {
                    return NotFound("No cart items found for this customer.");
                }

                return Ok(carts);
            }
        }

        [HttpDelete("deletebycustomer/{customerId}")]
        public IActionResult DeleteCartByCustomerId(int customerId)
        {
            using (var db = new kridazone_project_dbContext())
            {
                var carts = db.Carts.Where(c => c.CustomerId == customerId).ToList();

                if (carts == null || !carts.Any())
                {
                    return NotFound("No cart items found for this customer.");
                }

                db.Carts.RemoveRange(carts);
                db.SaveChanges();

                return Ok("Cart items deleted successfully!");
            }
        }

        [HttpPut("updatequantity/{cartId}")]
        public IActionResult UpdateCartQuantity(int cartId, [FromBody] int quantity)
        {
            using (var db = new kridazone_project_dbContext())
            {
                // Ensure SellerProduct is included
                var cart = db.Carts
                             .Include(c => c.SellerProduct) // Load SellerProduct
                             .FirstOrDefault(c => c.CartId == cartId);

                if (cart == null)
                {
                    return NotFound("Cart item not found.");
                }

                if (cart.SellerProduct == null)
                {
                    return BadRequest("SellerProduct is not associated with this cart item.");
                }

                cart.Quantity = quantity;
                cart.Amount = (float)cart.SellerProduct.Price * quantity;
                db.SaveChanges();

                return Ok("Cart item updated successfully!");
            }
        }
    }

}

