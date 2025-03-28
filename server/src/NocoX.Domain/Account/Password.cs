using System;
using System.Text;
using Konscious.Security.Cryptography;

namespace NocoX.Account
{
    public class Password
    {
        /// <summary>
        /// encypt password
        /// </summary>
        /// <param name="password"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public static string Encypt(string password)
        {
            var argon2 = new Argon2i(Encoding.UTF8.GetBytes(password)) ?? throw new Exception("Password is null");
            argon2.DegreeOfParallelism = 4;
            argon2.MemorySize = 32 * 1024;
            argon2.Iterations = 4;
            var hash = argon2.GetBytes(128);
            var result = Convert.ToBase64String(hash);
            return result;
        }
    }
}
