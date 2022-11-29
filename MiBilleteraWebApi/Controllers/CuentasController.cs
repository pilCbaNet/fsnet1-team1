using MiBilleteraWebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Linq;

namespace MiBilleteraWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CuentasController : ControllerBase
    {

        [HttpGet]
        public List<Cuenta> Get()
        {
            using (var db = new MiBilleteraContext())
            {
                return db.Cuentas.ToList();
            }
        }
        [HttpGet("{id}")]
        public Cuenta GetById(int id)
        {
            using (var db = new MiBilleteraContext())
            {

                var cuentaCliente = db.Cuentas.Include(i => i.IdUsuarioNavigation).
                FirstOrDefault(c => c.IdCuenta == id);
                //var cuentaCliente = db.Cuentas.FirstOrDefault(c => c.IdCuenta == id);
                    return cuentaCliente;
             }
        }

        [HttpPost]
        public void Post([FromBodyAttribute] Cuenta eCuenta)
        {
            using (var db = new MiBilleteraContext())
            {
                db.Cuentas.Add(eCuenta);
                db.SaveChanges();
            }
        }

        [HttpPut]
        public void Put( int id, decimal monto)
        {
            using (var db = new MiBilleteraContext())
            {
                Cuenta? cuentaVieja = db.Cuentas.FirstOrDefault(a => a.IdCuenta == id);
                cuentaVieja.Saldo = monto;
                db.SaveChanges();
            }
        }
    }
}
