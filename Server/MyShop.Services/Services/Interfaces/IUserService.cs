namespace VideoList.Services {
    public interface IUserService {
        User GetUser(int userId);

        User LoginUser(string name, string password);

        bool DoesUserExist(int userId);

        bool? IsUserAdmin(int userId);

        void AddUser(string name, string password);
    }
}
