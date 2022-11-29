using System;
using System.Collections.Generic;

namespace MiBilleteraWebApi.Models
{
    public partial class Transaccion
    {
        public int IdTransacciones { get; set; }
        public int? Monto { get; set; }
        public DateTime? Fecha { get; set; }
        public int? TipoTransaccion { get; set; }
        public int? IdCuentaOrigen { get; set; }
        public int? IdCuentaDestino { get; set; }

        public virtual Cuenta? IdCuentaDestinoNavigation { get; set; }
        public virtual Cuenta? IdCuentaOrigenNavigation { get; set; }
    }
}
