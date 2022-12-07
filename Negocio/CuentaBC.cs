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

        public Cuenta ObtenerDepositosCuenta(MiBilleteraContext db, int id)
        {
            
            var depositosCliente = db.Cuentas.Include(t => t.TransaccioneIdCuentaDestinoNavigations).FirstOrDefault(c => c.IdCuenta == id);
            return depositosCliente;
        }
       
        public Cuenta ObtenerTransferenciasCuenta(MiBilleteraContext db, int id)
        {
            
            var depositosCliente = db.Cuentas.Include(t => t.TransaccioneIdCuentaOrigenNavigations).FirstOrDefault(c => c.IdCuenta == id);
            return depositosCliente;
        }

        public void CrearCuenta(MiBilleteraContext db, Cuenta eCuenta)
        {
                db.Cuentas.Add(eCuenta);
                db.SaveChanges();
            
        }
    }
}
