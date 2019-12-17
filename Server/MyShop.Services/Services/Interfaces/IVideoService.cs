using System.Collections.Generic;

namespace VideoList.Services {
    public interface IVideoService {
        List<Video> GetAll();

        Video Get(int videoId);

        List<Video> GetBySeriesId(int seriesId);

        void AddVideo(Video video, int userId);
    }
}
