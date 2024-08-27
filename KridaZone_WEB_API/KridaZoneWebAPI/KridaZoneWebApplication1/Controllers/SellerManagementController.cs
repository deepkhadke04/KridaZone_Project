using KridaZoneWebApplication1.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KridaZoneWebApplication1.Controllers
{
    [Route("api/[controller]/[action]")]
    [EnableCors]
    [ApiController]
    public class SellerManagementController : ControllerBase
    {

        [HttpGet]
        public List<Seller> GetSellers()
        {
            List<Seller> result = new List<Seller>();

            using (var db = new kridazone_project_dbContext())
            {
                result = db.Sellers.ToList();
            }
            return result;
        }



        [HttpGet("seller/details/{sellerId}")]
        public IActionResult GetSellerDetailsBySellerId(int sellerId)
        {
            using (var db = new kridazone_project_dbContext())
            {
                var sellerDetails = db.Sellers.FirstOrDefault(s => s.SellerId == sellerId);
                if (sellerDetails == null)
                {
                    return NotFound("Seller not found.");
                }

                var response = new
                {
                    sellerDetails.SellerId,
                    sellerDetails.SellerName,
                    sellerDetails.Email,
                    sellerDetails.Contact,
                    sellerDetails.Address,
                    sellerDetails.GstNo
                };

                return Ok(response);
            }
        }


        [HttpPut("update/seller/profile/{sellerId}")]
        public IActionResult UpdateSeller(int sellerId, [FromBody] Seller updatedSeller)
        {
            using (var db = new kridazone_project_dbContext())
            {
                var seller = db.Sellers.FirstOrDefault(s => s.SellerId == sellerId);
                if (seller == null)
                {
                    return NotFound("Seller not found.");
                }

                // Update seller details
                seller.SellerName = updatedSeller.SellerName;
                seller.Email = updatedSeller.Email;
                seller.Contact = updatedSeller.Contact;
                seller.Address = updatedSeller.Address;
                seller.GstNo = updatedSeller.GstNo;

                db.SaveChanges();

                return Ok("Seller updated successfully!");
            }
        }


        [HttpGet("seller/details/{userId}")]
        public IActionResult GetSellerDetails(int userId)
        {
            using (var db = new kridazone_project_dbContext())
            {
                var sellerDetails = db.Sellers.FirstOrDefault(s => s.UserId == userId);
                if (sellerDetails == null)
                {
                    return NotFound("Seller not found.");
                }

                var response = new
                {
                    sellerDetails.SellerId,
                    sellerDetails.SellerName,
                    sellerDetails.UserId
                };

                return Ok(response);
            }
        }

        [HttpPost]
        public dynamic SaveSeller(Seller seller)
        {
            using (var db = new kridazone_project_dbContext())
            {
                try
                {
                    seller.User.Password = BCrypt.Net.BCrypt.HashPassword(seller.User.Password);
                    db.Sellers.Add(seller);
                    db.SaveChanges();
                }
                catch (Exception ex)
                {
                    return "Username or email or contact or GST number already exists!";
                }
            }
            return seller;
        }

        [HttpPut]
        public string UpdateSeller(Seller sell)
        {
            Seller? seller1 = new Seller();
            using (var db = new kridazone_project_dbContext())
            {
                db.SaveChanges();
            }
            return "Customer updated successfully!";
        }

        [HttpDelete]
        public string DeleteSeller(int id)
        {
            Seller? sell = new Seller();
            using (var db = new kridazone_project_dbContext())
            {
                sell = db.Sellers.Find(id);
                db.Sellers.Remove(sell);
                db.SaveChanges();
            }
            return "seller deleted successfully!";
        }
    }
}
