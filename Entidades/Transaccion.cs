using System;
using System.Collections.Generic;

namespace Entidades
{
    public partial class Transaccion
    {
        public int IdTransacciones { get; set; }
        public decimal Monto { get; set; }
        public DateTime? Fecha { get; set; }
        public int? TipoTransaccion { get; set; }
        public int? IdCuentaOrigen { get; set; }
        public int? IdCuentaDestino { get; set; }

        public string receiverName = String.Empty;
        public string giverName = String.Empty;

        public int? amount = 0;

        public virtual Cuenta? IdCuentaDestinoNavigation { get; set; }
        public virtual Cuenta? IdCuentaOrigenNavigation { get; set; }
    }
}
