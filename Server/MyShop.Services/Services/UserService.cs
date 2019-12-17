using System;
using System.Linq;

namespace VideoList.Services {
    /// <summary>
    /// This serivce has methods that let you manage the user table in the database
    /// </summary>
    public class UserService : IUserService {
        /// <summary>
        ///  The service is needed to encrypt the password when logging in
        /// </summary>
        private readonly ICryptographService _cryptographService;

        /// <summary>
        /// Gets the implemented service from the dependeny injection from asp.net core
        /// </summary>
        /// <param name="cryptographService">The implemented service</param>
        public UserService(ICryptographService cryptographService) {
            _cryptographService = cryptographService;
        }

        /// <summary>
        /// Returns the user with the specified id
        /// </summary>
        /// <param name="userId">The id of the user which should be returned</param>
        /// <returns>The user with this userId or null</returns>
        public User GetUser(int userId) {
            using (var db = new VideoListStore()) {
                return db.User.Find(userId);
            }
        }

        /// <summary>
        /// Returns the user with this name and password
        /// </summary>
        /// <param name="name">Name of the user</param>
        /// <param name="password">Password of the user</param>
        /// <returns>The user which should be logged in</returns>
        public User LoginUser(string name, string password) {
            if (String.IsNullOrWhiteSpace(name)) {
                throw new Exception("Name cannot be empty");
            } else if (String.IsNullOrWhiteSpace(password)) {
                throw new Exception("Password cannot be empty");
            } else {
                var encryptedPassword = _cryptographService.EncryptString(password);

                using (var db = new VideoListStore()) {
                    return db.User.FirstOrDefault(u => u.Username == name && u.Password == encryptedPassword);
                }
            }
        }

        /// <summary>
        /// Returns if the user does exist
        /// </summary>
        /// <param name="userId">The id of the user</param>
        /// <returns>If a user with this id exists</returns>
        public bool DoesUserExist(int userId) {
            using (var db = new VideoListStore()) {
                return db.User.Find(userId) != null;
            }
        }

        /// <summary>
        /// Returns if the user with this id is an admin
        /// </summary>
        /// <param name="userId">The id of the user</param>
        /// <returns>If the user is an admin or null if no user with this id exists</returns>
        public bool? IsUserAdmin(int userId) {
            using (var db = new VideoListStore()) {
                var user = db.User.Find(userId);

                if (user == null) {
                    return null;
                }

                return user.IsAdmin;
            }
        }

        /// <summary>
        /// Adds a new user into the database
        /// </summary>
        /// <param name="name">Name of the new user</param>
        /// <param name="password">Unencrypted password of the new user</param>
        public void AddUser(string name, string password) {
            using (var db = new VideoListStore()) {
                var user = new User() {
                    Username = name,
                    // Encrypts the unencrypted password
                    Password = _cryptographService.EncryptString(password),
                    IsAdmin = false
                };

                db.User.Add(user);
                db.SaveChanges();
            }
        }
    }
}
