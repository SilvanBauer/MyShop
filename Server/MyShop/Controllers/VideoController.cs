using log4net;
using Microsoft.AspNetCore.Mvc;
using System;
using VideoList.Services;

namespace VideoList.Controllers {
    /// <summary>
    /// This controller has methods to manage the video table
    /// </summary>
    [Route("api/[controller]")]
    public class VideoController : ControllerBase {
        private readonly ILog _log = LogManager.GetLogger(typeof(VideoController));
        private readonly IVideoService _videoService;

        public VideoController(IVideoService videoSerivice) {
            _videoService = videoSerivice;
        }

        [HttpGet]
        public IActionResult GetAllVideos() {
            _log.Info("Returned all videos");

            return Ok(_videoService.GetAll());
        }

        [HttpGet("{videoId:int}")]
        public IActionResult GetVideoById(int videoId) {
            var retrievedVideo = _videoService.Get(videoId);

            if (retrievedVideo != null) {
                _log.Info("Returned video " + retrievedVideo.Name);
            } else {
                _log.Error("Video with id " + videoId + " does not exist");
            }

            return Ok(retrievedVideo);
        }

        [HttpGet("GetVideosBySeriesId/{seriesId:int}")]
        public IActionResult GetVideosBySeriesId(int seriesId) {
            _log.Info("Returned videos of series id " + seriesId);

            return Ok(_videoService.GetBySeriesId(seriesId));
        }

        [HttpPut("{userId:int}")]
        public void AddVideo([FromBody] Video video, int userId) {
            try {
                _videoService.AddVideo(video, userId);

                _log.Info("Video " + video.Name + " successfully added");
            } catch (Exception e) {
                _log.Error("Video could not be added", e);
            }
        }
    }
}
