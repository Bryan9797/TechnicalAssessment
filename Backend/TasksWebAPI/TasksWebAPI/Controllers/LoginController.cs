using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TasksWebAPI.Models;
using TasksWebAPI.Models.DTOs;
using TasksWebAPI.Util;

namespace TasksWebAPI.Controllers
{
    [Route("api/[controller]")]
    [AllowAnonymous]
    [ApiController]
    public class LoginController : ControllerBase
    {

        private readonly TaskDbContext _dbContext;
        private readonly Crypt _crypt;

        public LoginController(TaskDbContext dbContext, Crypt crypt)
        {
            _dbContext = dbContext;
            _crypt = crypt;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register(UserDTO userDTO)
        {

            var user = new User()
            {
                UserName = userDTO.UserName,
                Password = _crypt.CryptSHA256(userDTO.Password),
            };

            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();

            if(user.IdUser != 0)
            {
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true });
            }
            else
            {
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = false });
            }
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginDTO loginDTO)
        {
            var userMatch = await _dbContext.Users
                .Where(u => u.UserName == loginDTO.UserName &&
                    u.Password == _crypt.CryptSHA256(loginDTO.Password)
                ).FirstOrDefaultAsync();
            if (userMatch != null) {
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true, token = _crypt.GenerateJWT(userMatch) });
            }
            else
            {
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = false, token = "" });
            }
        }

    }
}
