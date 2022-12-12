using Entidades;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Negocio
{
    public class DepositosBC
    {
        public List<Depositos> ObtenerDepositosByCuenta(MiBilleteraContext db, int id)
        {
            var depositosCliente = db.Depositos.Include(t => t.IdCuentaNavigation).Where(c => c.IdCuenta == id).ToList();
            return depositosCliente;
        }


        public void CrearDeposito(MiBilleteraContext db, Depositos eDepositos)
        {
            db.Depositos.Add(eDepositos);
            db.SaveChanges();

        }

    }
}
