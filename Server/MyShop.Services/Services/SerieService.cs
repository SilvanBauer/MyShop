using System;
using System.Collections.Generic;
using System.Linq;

namespace VideoList.Services {
    /// <summary>
    /// This service has methods to manage te serie table in the database
    /// </summary>
    public class SerieService : ISerieService {
        /// <summary>
        /// This service is needed to validate if the user is an admin
        /// </summary>
        private readonly IUserService _userService;

        /// <summary>
        /// Uses dependency injection of asp.net core to get an instance of an implemented users service
        /// </summary>
        /// <param name="userService">The implemented service</param>
        public SerieService(IUserService userService) {
            _userService = userService;
        }

        /// <summary>
        /// Returns the series with this id
        /// </summary>
        /// <param name="serieId">The series id of the series which should be returned</param>
        /// <returns>The series with this id or null</returns>
        public Serie Get(int serieId) {
            using (var db = new VideoListStore()) {
                var serie = db.Serie.Find(serieId);

                if (serie != null) {
                    serie.Videos = db.Video.Where(v => v.SeriesId == serie.Id).ToList();
                }

                return serie;
            }
        }


        /// <summary>
        /// Returns all series in the database
        /// </summary>
        /// <returns>All series</returns>
        public List<Serie> GetAll() {
            using (var db = new VideoListStore()) {
                return db.Serie.ToList();
            }
        }

        /// <summary>
        /// Adds a serie to the database
        /// </summary>
        /// <param name="name">The name of the new serie</param>
        /// <param name="userId">The id of the current user, which is used to determine if the user is an admin</param>
        public void AddSerie(string name, int userId) {
            var userIsAdmin = _userService.IsUserAdmin(userId);

            if (String.IsNullOrWhiteSpace(name)) {
                throw new Exception("The name cannot be empty");
            } else if (userIsAdmin == null) {
                throw new Exception("The user does not exist");
            } else if (!userIsAdmin.Value) {
                throw new Exception("The user needs to be an admin");
            } else {
                using (var db = new VideoListStore()) {
                    db.Serie.Add(new Serie() { Name = name });
                    db.SaveChanges();
                }
            }
        }
    }
}
