using System.Collections.Generic;

namespace VideoList.Services {
    public interface ISerieService {
        List<Serie> GetAll();

        Serie Get(int serieId);

        void AddSerie(string name, int userId);
    }
}
