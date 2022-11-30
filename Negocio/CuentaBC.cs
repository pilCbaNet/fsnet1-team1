using Entidades;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio
{
    public class CuentaBC
    {
        public Cuenta? ObtenerCuenta(MiBilleteraContext db, int id)
        {
            var cuentaCliente = db.Cuentas.Include(i => i.IdUsuarioNavigation).
                FirstOrDefault(c => c.IdCuenta == id);
            return cuentaCliente;
        }
    }
}
