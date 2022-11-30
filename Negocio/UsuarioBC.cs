using Entidades;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
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
    }
}
