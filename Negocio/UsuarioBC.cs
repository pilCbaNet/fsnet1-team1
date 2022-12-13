using Entidades;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace Negocio
{
    public class UsuarioBC
    {
        public Usuario? ObtenerUsuario(MiBilleteraContext db, int id)
        {
            var cuentaCliente = db.Usuarios.Include(i => i.Cuenta).
                FirstOrDefault(c => c.IdUsuario == id);
            return cuentaCliente;
        }

        public Usuario? GetUserByUsername(MiBilleteraContext db, string username)
        {
            var usuario = db.Usuarios.FirstOrDefault(x => x.Usuario1 == username);
            return usuario;
        }

        public Usuario LoginUsuario(MiBilleteraContext db, string us, string pass)
        {
            var usuarioLogueado = db.Usuarios.Include(i => i.Cuenta).
                FirstOrDefault(c => c.Usuario1 == us && c.Password == pass);
            return usuarioLogueado;
        }
    }
}
