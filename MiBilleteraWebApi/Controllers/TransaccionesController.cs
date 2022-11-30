using Entidades;
//using MiBilleteraWebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MiBilleteraWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransaccionesController : ControllerBase
    {
        [HttpGet]
        public List<Transaccion> Get()
        {
            using (var db = new MiBilleteraContext())
            {
                return db.Transacciones.ToList();
            }
        }
        [HttpGet("{id}")]
        public Transaccion GetById(int id)
        {
            using (var db = new MiBilleteraContext())
            {

                //var cuentaCliente = db.Cuentas.Include(i => i.IdUsuario).
                //FirstOrDefault(c => c.IdCuenta == id);
                var transaccionCliente = db.Transacciones.FirstOrDefault(t => t.IdTransacciones == id);
                return transaccionCliente;
            }
        }

        [HttpPost]
        public void Post([FromBodyAttribute] Cuenta tTransaccion)
        {
            using (var db = new MiBilleteraContext())
            {
                db.Cuentas.Add(tTransaccion);
                db.SaveChanges();
            }
        }
    }
}
