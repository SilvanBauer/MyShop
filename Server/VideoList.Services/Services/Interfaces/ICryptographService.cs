namespace VideoList.Services {
    public interface ICryptographService {
        byte[] EncryptString(string text);
    }
}
