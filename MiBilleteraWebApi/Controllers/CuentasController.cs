using Entidades;
//using MiBilleteraWebApi.Models; 
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.EntityFrameworkCore;
using Negocio;
using System.Data;
using System.Linq;
using System.Text.Json.Nodes;

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

        [HttpGet("{id:int}")]
        public Cuenta? GetById(int id)
        {
            using (var db = new MiBilleteraContext())
            {

                var depositos = new CuentaBC().ObtenerCuenta(db, id);
                return depositos;
            }
        }

        [HttpGet("{id:int}/Depositos")]
        public Cuenta? GetByIdDepositos(int id)
        {
            using (var db = new MiBilleteraContext())
            {

                var depositos = new CuentaBC().ObtenerDepositosCuenta(db, id);
                return depositos;
             }
        }
        [HttpGet("{id:int}/transferencias")]
        //[Route("{transferencias}")]
        public Cuenta? GetByIdTransferencias(int id)
        {
            using (var db = new MiBilleteraContext())
            {

                var depositos = new CuentaBC().ObtenerTransferenciasCuenta(db, id);
                return depositos;
            }
        }

        [HttpPost]
        public void Post([FromBodyAttribute] Cuenta eCuenta)
        {
            using (var db = new MiBilleteraContext())
            {
                new CuentaBC().CrearCuenta(db, eCuenta);
            }
            
        }

        [HttpPut("addbalance")]
        public Cuenta? PutDepositar(JsonObject deposito)
        {
            Cuenta? cuentaVieja;
            using (var db = new MiBilleteraContext())
            {
                cuentaVieja = db.Cuentas.FirstOrDefault(a => a.IdCuenta == int.Parse(deposito["id"].ToString()));
                cuentaVieja.Saldo = cuentaVieja.Saldo + decimal.Parse(deposito["monto"].ToString());
                db.SaveChanges();
            }
            return cuentaVieja;
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
