using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using KridaZoneWebApplication1.Models;
using BCrypt.Net;

namespace KridaZoneWebApplication1.Controllers
{
    [Route("api/[controller]/[action]")]
    [EnableCors]
    [ApiController]
    public class UserManagementController : ControllerBase
    {

        [HttpGet]
        public List<User> GetUsers()
        {
            List<User> users = new List<User>();
            using(var db = new kridazone_project_dbContext())
            {
                users = db.Users.ToList();
            }
            return users;  
        }

        [HttpGet]
        public User? GetUser(int id)
        {
            User? log = new User();
            using (var db = new kridazone_project_dbContext())
            {
                log = db.Users.Find(id);
            }
            return log;
        }

        [HttpPost]
        public dynamic SaveUser(User user)
        {
            using (var db = new kridazone_project_dbContext())
            {
                try
                {
                    user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                    db.Users.Add(user);
                    db.SaveChanges();
                }
                catch (Exception ex)
                {
                    return "Username already exists!";
                }
            }
            return user;
        }

        [HttpPost]
        public IActionResult CheckLogin(User us)
        {
            User? user;

            using (var db = new kridazone_project_dbContext())
            {
                user = db.Users.Where((u => u.UserName == us.UserName)).FirstOrDefault();
            }
            if (user != null && BCrypt.Net.BCrypt.Verify(us.Password, user.Password) && user.ActiveStatus!=0)
            {
                var response = new
                {
                    user.UserId,
                    user.UserName,
                    user.RoleId,
                };
                return Ok(response);
            }
            return Unauthorized(new { message = "Invalid username or password" });
        }


        [HttpPut("activate/{userId}")]
        public string ActivateUser(int userId)
        {
            using (var db = new kridazone_project_dbContext())
            {
                var user = db.Users.Find(userId);
                if (user == null)
                {
                    return "User not found!";
                }

                user.ActiveStatus = 1; // Set user as active
                db.SaveChanges();
                return "User activated successfully!";
            }
        }

        [HttpPut("deactivate/{userId}")]
        public string DeactivateUser(int userId)
        {
            using (var db = new kridazone_project_dbContext())
            {
                var user = db.Users.Find(userId);
                if (user == null)
                {
                    return "User not found!";
                }

                user.ActiveStatus = 0; // Set user as inactive
                db.SaveChanges();
                return "User deactivated successfully!";
            }
        }


        [HttpPut]
        public string UpdateUser(User user)
        {
            User? users = new User();
            using (var db = new kridazone_project_dbContext())
            {
                users = db.Users.Find(user.UserId);
                users.UserName = user.UserName;
                String pwd = BCrypt.Net.BCrypt.HashPassword(user.Password);
                users.Password = pwd;
                users.ActiveStatus = user.ActiveStatus;
                db.SaveChanges();
            }
            return "User updated successfully!";

        }

        [HttpDelete]
        public string DeleteUser(int id)
        {
            User? user = new User();
            using (var db = new kridazone_project_dbContext())
            {
                user = db.Users.Find(id);
                db.Users.Remove(user);
                db.SaveChanges();
            }
            return "User deleted successfully!";
        }
    }
}
