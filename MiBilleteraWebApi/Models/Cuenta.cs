using System;
using System.Collections.Generic;

namespace MiBilleteraWebApi.Models
{
    public partial class Cuenta
    {
        public Cuenta()
        {
            //TransaccioneIdCuentaDestinoNavigations = new HashSet<Transaccion>();
            TransaccioneIdCuentaOrigenNavigations = new HashSet<Transaccion>();
        }

        public int IdCuenta { get; set; }
        public string Cbu { get; set; }
        public decimal Saldo { get; set; }
        public DateTime FechaAlta { get; set; }
        public DateTime? FechaBaja { get; set; }
        public int IdUsuario { get; set; }

        public virtual Usuario? IdUsuarioNavigation { get; set; }
        //public virtual ICollection<Transaccion> TransaccioneIdCuentaDestinoNavigations { get; set; }
        public virtual ICollection<Transaccion> TransaccioneIdCuentaOrigenNavigations { get; set; }
    }
}
