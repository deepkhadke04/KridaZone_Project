using KridaZoneWebApplication1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KridaZoneWebApplication1.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class OrderController : ControllerBase
    {



        // POST: api/Order/PlaceOrder
        [HttpPost("PlaceOrder")]
        public IActionResult PlaceOrder([FromBody] PlaceOrderRequest request)
        {
            using (var db = new kridazone_project_dbContext())
            {
                if (request == null || request.CustomerId <= 0)
                {
                    return BadRequest("Invalid request.");
                }

                var carts = db.Carts
                    .Where(c => c.CustomerId == request.CustomerId)
                    .Include(c => c.SellerProduct)
                    .ToList();

                if (!carts.Any())
                {
                    return BadRequest("No items in cart.");
                }

                // Create new order
                var order = new Order
                {
                    Amount = carts.Sum(c => c.Amount),
                    Date = DateOnly.FromDateTime(DateTime.Now.Date), // Using DateOnly
                    CustomerId = request.CustomerId
                };

                db.Orders.Add(order);
                db.SaveChanges();

                // Create order details
                foreach (var cart in carts)
                {
                    var orderDetail = new OrderDetail
                    {
                        Amount = cart.Amount,
                        Quantity = cart.Quantity,
                        SellerProductId = cart.SellerProductId,
                        OrderId = order.OrderId
                    };

                    db.OrderDetails.Add(orderDetail);
                }

                // Clear the cart for the customer
                db.Carts.RemoveRange(carts);
                db.SaveChanges();

                return Ok(new { OrderId = order.OrderId, Message = "Order placed successfully!" });
            }
        }

        // GET: api/Order/GetOrders
        [HttpGet("GetOrders")]
        public IActionResult GetOrders()
        {
            using (var db = new kridazone_project_dbContext())
            {
                var orders = db.Orders
                    .Include(o => o.OrderDetails)
                    .ThenInclude(od => od.SellerProduct)
                    .ToList();

                return Ok(orders);
            }
        }

        // GET: api/Order/GetOrderById/{id}
        [HttpGet("GetOrderById/{id}")]
        public IActionResult GetOrderById(int id)
        {
            using (var db = new kridazone_project_dbContext())
            {
                var order = db.Orders
                    .Include(o => o.OrderDetails)
                    .ThenInclude(od => od.SellerProduct)
                    .FirstOrDefault(o => o.OrderId == id);

                if (order == null)
                {
                    return NotFound();
                }

                return Ok(order);
            }
        }



        // GET: api/Order/GetOrdersByCustomerId/{customerId}
        [HttpGet("GetOrdersByCustomerId/{customerId}")]
        public IActionResult GetOrdersByCustomerId(int customerId)
        {
            using (var db = new kridazone_project_dbContext())
            {
                var orders = db.Orders
                    .Where(o => o.CustomerId == customerId)
                    .Include(o => o.OrderDetails)
                    .ThenInclude(od => od.SellerProduct)
                    .ToList();

                if (!orders.Any())
                {
                    return NotFound("No orders found for the customer.");
                }

                return Ok(orders);
            }
        }


        [HttpDelete("DeleteOrder/{orderId}")]
        public IActionResult DeleteOrder(int orderId)
        {
            using (var db = new kridazone_project_dbContext())
            {
                var order = db.Orders
                    .Include(o => o.OrderDetails)
                    .FirstOrDefault(o => o.OrderId == orderId);

                if (order == null)
                {
                    return NotFound($"Order with ID {orderId} not found.");
                }

                // Delete order details
                db.OrderDetails.RemoveRange(order.OrderDetails);

                // Delete the order
                db.Orders.Remove(order);
                db.SaveChanges();

                return Ok(new { Message = $"Order with ID {orderId} deleted successfully." });
            }
        }


    }

    public class PlaceOrderRequest
    {
        public int CustomerId { get; set; }
    }


}
