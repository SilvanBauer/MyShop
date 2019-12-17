using log4net;
using Microsoft.AspNetCore.Mvc;
using System;
using VideoList.Services;

namespace VideoList.Controllers {
    /// <summary>
    /// This controller has methods to manage the user table
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase {
        private readonly ILog _log = LogManager.GetLogger(typeof(UserController));
        private readonly IUserService _userService;

        public UserController(IUserService userService) {
            _userService = userService;
        }

        [HttpGet("{userId:int}")]
        public IActionResult GetUserById(int userId) {
            var retrievedUser = _userService.GetUser(userId);

            if (retrievedUser != null) {
                _log.Info("Returned user " + retrievedUser.Username);
            } else {
                _log.Error("User with id " + userId + " does not exist");
            }

            return Ok(retrievedUser);
        }

        [HttpPut("Logout")]
        public void LogoutUser([FromBody] User user) {
            if (user == null) {
                _log.Error("User could not be logged out because he was null");
            } else if (!_userService.DoesUserExist(user.Id)) {
                _log.Error("User could not be logged out because the id " + user.Id + " does not exist in the db");
            } else {
                _log.Info("User " + user.Username + " has logged out");
            }
        }

        [HttpPut("Login")]
        public IActionResult LoginUser([FromBody] User user) {
            try {
                var retrievedUser = _userService.LoginUser(user.Username, user.UnencryptedPassword);

                if (retrievedUser != null) {
                    _log.Info("User " + user.Username + " has logged in");
                } else {
                    _log.Info("Failed login with name " + user.Username);
                }

                return Ok(retrievedUser);
            } catch (Exception e) {
                _log.Error("User could not be logged out", e);

                return BadRequest();
            }
        }

        [HttpPut]
        public void AddUser([FromBody] User user) {
            try {
                _userService.AddUser(user.Username, user.UnencryptedPassword);

                _log.Info("User " + user.Username + " successfully added");
            } catch (Exception e) {
                _log.Error("User could not be added", e);
            }
        }
    }
}
