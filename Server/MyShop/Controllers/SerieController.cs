using log4net;
using Microsoft.AspNetCore.Mvc;
using System;
using VideoList.Services;

namespace VideoList.Controllers {
    /// <summary>
    /// This controller has methods to manage the serie table
    /// </summary>
    [Route("api/[controller]")]
    public class SerieController : ControllerBase {
        private readonly ILog _log = LogManager.GetLogger(typeof(SerieController));
        private readonly ISerieService _serieService;

        public SerieController(ISerieService serieService) {
            _serieService = serieService;
        }

        [HttpGet]
        public IActionResult GetAllSeries() {
            _log.Info("Returned all series");

            return Ok(_serieService.GetAll());
        }

        [HttpGet("{seriesId:int}")]
        public IActionResult GetSeriesById(int seriesId) {
            var retrievedSeries = _serieService.Get(seriesId);

            if (retrievedSeries != null) {
                _log.Info("Returned series " + retrievedSeries.Name);
            } else {
                _log.Error("Series with id " + seriesId + " does not exist");
            }

            return Ok(retrievedSeries);
        }

        [HttpPut("{userId:int}")]
        public void AddSerie([FromBody]Serie serie, int userId) {
            try {
                _serieService.AddSerie(serie.Name, userId);

                _log.Info("Serie " + serie.Name + " successfully added");
            } catch (Exception e) {
                _log.Error("Series could not be added", e);
            }
        }
    }
}
