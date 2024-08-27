using KridaZoneWebApplication1.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace KridaZoneWebApplication1.Controllers
{
    [Route("api/[controller]/[action]")]
    [EnableCors]
    [ApiController]
    public class CustomerManagementController : ControllerBase
    {

        [HttpGet]
        public List<Customer> GetCustomers()
        {
            List<Customer> result = new List<Customer>();
            using (var db = new kridazone_project_dbContext())
            {
                result = db.Customers.Include(cart => cart.Carts).ToList();
                result = db.Customers.Include(ord => ord.Orders).ToList();
                result = db.Customers.Include(rev => rev.Reviews).ToList();
            }
            return result;
        }


        [HttpGet("customer/details/{customerId}")]
        public IActionResult GetCustomerById(int customerId)
        {
            using (var db = new kridazone_project_dbContext())
            {
                var customerDetails = db.Customers.FirstOrDefault(c => c.CustomerId == customerId);
                if (customerDetails == null)
                {
                    return NotFound("Customer not found.");
                }

                var response = new
                {
                    customerDetails.CustomerId,
                    customerDetails.CustomerFname,
                    customerDetails.CustomerLname,
                    customerDetails.Address,
                    customerDetails.Contact,
                    customerDetails.Email,
                    customerDetails.Adhaar
                };

                return Ok(response);
            }
        }


        [HttpPut("update/profile/{customerId}")]
        public IActionResult UpdateCustomer(int customerId, [FromBody] Customer cust)
        {
            using (var db = new kridazone_project_dbContext())
            {
                var customer = db.Customers.FirstOrDefault(c => c.CustomerId == customerId);
                if (customer == null)
                {
                    return NotFound("Customer not found.");
                }

                customer.CustomerFname = cust.CustomerFname;
                customer.CustomerLname = cust.CustomerLname;
                customer.Address = cust.Address;
                customer.Contact = cust.Contact;
                customer.Email = cust.Email;
                customer.Adhaar = cust.Adhaar;

                db.SaveChanges();

                return Ok("Customer updated successfully!");
            }
        }


       




        [HttpGet("customer/details/{userId}")]
        public IActionResult GetCustomerDetails(int userId)
        {
            using (var db = new kridazone_project_dbContext())
            {
                var customerDetails = db.Customers.FirstOrDefault(c => c.UserId == userId);
                if (customerDetails == null)
                {
                    return NotFound("Customer not found.");
                }

                var response = new
                {
                    customerDetails.CustomerId,
                    customerDetails.CustomerFname,
                    customerDetails.UserId
                };

                return Ok(response);
            }
        }

        [HttpPost]
        public dynamic SaveCustomer(Customer customer)
        {
            using (var db = new kridazone_project_dbContext())
            {
                try
                {
                    customer.User.Password = BCrypt.Net.BCrypt.HashPassword(customer.User.Password);
                    db.Customers.Add(customer);
                    db.SaveChanges();
                }
                catch (Exception ex)
                {
                    return "Username or email or contact or aadhar number already exists!";
                }
            }
            return customer;
        }

        [HttpPut]
        public string UpdateCustomer(Customer cust)
        {
            Customer? customer = new Customer();
            using (var db = new kridazone_project_dbContext())
            {
                customer = db.Customers.Find(cust.CustomerId);
                customer.CustomerFname = cust.CustomerFname;
                customer.CustomerLname = cust.CustomerLname;
                customer.Address = cust.Address;
                customer.Contact = cust.Contact;
                customer.Email = cust.Email;
                customer.Adhaar = cust.Adhaar;
                db.SaveChanges();
            }
            return "Customer updated successfully!";
        }

        [HttpDelete]
        public string DeleteCustomer(int id)
        {
            Customer? cust = new Customer();
            using (var db = new kridazone_project_dbContext())
            {
                cust = db.Customers.Find(id);
                db.Customers.Remove(cust);
                db.SaveChanges();
            }
            return "Customer deleted successfully!";
        }
    }
}
