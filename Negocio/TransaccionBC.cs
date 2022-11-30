using Entidades;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio
{
    public class TransaccionBC
    {
        public Transaccion obtenerTransaccion(MiBilleteraContext db, int id)
        {
            var transaccionCliente = db.Transacciones.Include(c=> c.IdCuentaOrigenNavigation).FirstOrDefault(t => t.IdTransacciones == id);
            return transaccionCliente;
        }
    }
}
