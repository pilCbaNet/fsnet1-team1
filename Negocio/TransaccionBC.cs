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
        public Transaccion ObtenerTransaccion(MiBilleteraContext db, int id)
        {
            var transaccionCliente = db.Transacciones.Include(c => c.IdCuentaOrigenNavigation).FirstOrDefault(t => t.IdTransacciones == id);
            return transaccionCliente;
        }

        public List<Transaccion> ObtenerDepositosByCuenta(MiBilleteraContext db, int id)
        {
            var depositosCliente = db.Transacciones.Include(t => t.IdCuentaDestinoNavigation).Where(c => c.IdCuentaDestino == id).ToList();
            return depositosCliente;
        }

        public List<Transaccion> ObtenerPagosByUsername(MiBilleteraContext db, string username)
        {
            Usuario? cliente;
            cliente = db.Usuarios.FirstOrDefault(x => x.Usuario1 == username);
            Cuenta cuenta = db.Cuentas.FirstOrDefault(x => x.IdUsuario == cliente.IdUsuario);
            var transacciones = db.Transacciones.Where(x => x.IdCuentaOrigen == cuenta.IdCuenta).ToList();
            return transacciones;
        }

        public List<Transaccion> ObtenerCobrosByUsername(MiBilleteraContext db, string username)
        {
            Usuario? cliente;
            cliente = db.Usuarios.FirstOrDefault(x => x.Usuario1 == username);
            Cuenta cuenta = db.Cuentas.FirstOrDefault(x => x.IdUsuario == cliente.IdUsuario);
            var transacciones = db.Transacciones.Where(x => x.IdCuentaDestino == cuenta.IdCuenta).ToList();
            return transacciones;
        }

        public void CargarTransaccion(MiBilleteraContext db, Transaccion oTransaccion)
        {
            db.Transacciones.Add(oTransaccion);
            db.SaveChanges();
        }
    }
}
