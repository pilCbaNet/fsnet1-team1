using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    public class Login
    {

        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        public Login()
        {
            Id = 0;
            Username= string.Empty;
            Password = string.Empty;    
        }
        public Login(int id, string username, string password)
        {
            Id= id;
            Username= username;
            Password= password;
        }

    }
}
