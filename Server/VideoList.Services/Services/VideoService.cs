using System;
using System.Collections.Generic;
using System.Linq;

namespace VideoList.Services {
    /// <summary>
    /// This service has methods to manage the video table in the database
    /// </summary>
    public class VideoService : IVideoService {
        /// <summary>
        /// This service is used to determine if the user is an admin
        /// </summary>
        private readonly IUserService _userService;

        /// <summary>
        /// Get the implementation of the service from the dependency injection of asp.net core
        /// </summary>
        /// <param name="userService">The implemented service</param>
        public VideoService(IUserService userService) {
            _userService = userService;
        }

        /// <summary>
        /// Returns the video with this id
        /// </summary>
        /// <param name="videoId">The id of the video</param>
        /// <returns>The video with this id or null</returns>
        public Video Get(int videoId) {
            using (var db = new VideoListStore()) {
                var video = db.Video.Find(videoId);

                if (video != null) {
                    video.Reviews = db.Review.Where(r => r.VideoId == video.Id).ToList();
                }

                return video;
            }
        }

        /// <summary>
        /// Returns all videos of the database
        /// </summary>
        /// <returns>All videos</returns>
        public List<Video> GetAll() {
            using (var db = new VideoListStore()) {
                return db.Video.ToList();
            }
        }

        /// <summary>
        /// Gets all videos with this series id
        /// </summary>
        /// <param name="seriesId">The series id</param>
        /// <returns>A list with all the videos which have this series id</returns>
        public List<Video> GetBySeriesId(int seriesId) {
            using (var db = new VideoListStore()) {
                return db.Video.Where(v => v.SeriesId == seriesId).ToList();
            }
        }

        /// <summary>
        /// Adds a video into the table in the database
        /// </summary>
        /// <param name="video">The video which should be added</param>
        /// <param name="userId">The userId of the logged in user</param>
        public void AddVideo(Video video, int userId) {
            var userIsAdmin = _userService.IsUserAdmin(userId);

            if (String.IsNullOrWhiteSpace(video.Name)) {
                throw new Exception("The name can't be empty");
            } else if (String.IsNullOrWhiteSpace(video.Genre)) {
                throw new Exception("The genre can't be empty");
            } else if (video.Genre != "Horror" && video.Genre != "Comedy" && video.Genre != "Thriller" && video.Genre != "Action") {
                throw new Exception("The genre must be Horror, Comedy, Thriller or Action");
            } else if (userIsAdmin == null) {
                throw new Exception("The user does not exist");
            } else if (!userIsAdmin.Value) {
                throw new Exception("The user needs to be an admin");
            } else {
                using (var db = new VideoListStore()) {
                    db.Video.Add(video);
                    db.SaveChanges();
                }
            }
        }
    }
}
