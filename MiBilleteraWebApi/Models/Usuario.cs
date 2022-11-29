using System;
using System.Collections.Generic;

namespace MiBilleteraWebApi.Models
{
    public partial class Usuario
    {
        public Usuario()
        {
            Cuenta = new HashSet<Cuenta>();
        }

        public int IdUsuario { get; set; }
        public string Nombre { get; set; } = null!;
        public string Apellido { get; set; } = null!;
        public string Usuario1 { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Dni { get; set; } = null!;
        public DateTime FechaNacimiento { get; set; }
        public DateTime FechaAlta { get; set; }
        public DateTime? FechaBaja { get; set; }
        public string? Telefono { get; set; }
        public string Email { get; set; }

        public virtual ICollection<Cuenta> Cuenta { get; set; }
    }
}
