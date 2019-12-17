using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace VideoList.Services {
    /// <summary>
    /// This service lets you encrypt strings
    /// </summary>
    public class CryptographService : ICryptographService {
        // Random 16 bytes for encryption
        private static readonly byte[] IV = new byte[] { 0xAF, 0xFE, 0x69, 0x34, 0x45, 0xB4, 0xDA, 0x29, 0x4F, 0x10, 0x99, 0xFF, 0xC4, 0xAB, 0xBA, 0x00 };

        /// <summary>
        /// Encrypts the string and returns the encrypted bytes
        /// </summary>
        /// <param name="text">The text which will be encrypted</param>
        /// <returns>Encrypted byte array</returns>
        public byte[] EncryptString(string text) {
            if (String.IsNullOrWhiteSpace(text)) {
                throw new Exception("The text is null or empty");
            }

            // Get bytes of text
            var unencryptedBytes = Encoding.Unicode.GetBytes(text);
            byte[] encryptedBytes = null;

            // Get 16 byte key of encryption from text
            var keyText = text;

            if (keyText.Length > 16) {
                keyText = keyText.Substring(0, 16);
            } else if (keyText.Length < 16) {
                while (keyText.Length < 16) {
                    keyText += ".";
                }
            }

            // Create Encryptor
            using (var aes = Aes.Create()) {
                aes.Key = Encoding.Unicode.GetBytes(keyText);
                aes.IV = IV;

                var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

                // New MemoryStream to write the bytes into the ram
                using (var stream = new MemoryStream()) {
                    using (var cryptoStream = new CryptoStream(stream, encryptor, CryptoStreamMode.Write)) {
                        // Write and encrypt bytes into the MemoryStream
                        cryptoStream.Write(unencryptedBytes, 0, unencryptedBytes.Length);
                        cryptoStream.FlushFinalBlock();

                        // Get the array of the encrypted the bytes
                        encryptedBytes = stream.ToArray();
                    }
                }
            }

            return encryptedBytes;
        }
    }
}
