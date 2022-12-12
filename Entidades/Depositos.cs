using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    public class Depositos
    {

        public int IdDepositos { get; set; }
        public int IdCuenta { get; set; }
        public DateTime Fecha { get; set; }
        public decimal Monto { get; set; }

        public virtual Cuenta? IdCuentaNavigation { get; set; }

    }
}
