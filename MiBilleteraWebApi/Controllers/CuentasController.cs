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

        [HttpGet("depositos/{username}")]
        public List<List<String>> GetDepositosByUsername(string username)
        {
            using (var db = new MiBilleteraContext())
            {
                var depositoList = new List<List<String>>();
                var cuenta = new CuentaBC().ObtenerCuentaByUsername(db, username);
                var depositos = new Negocio.DepositosBC().ObtenerDepositosByCuenta(db, cuenta.IdCuenta);
                foreach (Depositos deposito in depositos)
                {
                    var amount = deposito.Monto;
                    string amountStr = amount.ToString("0.00");
                    string date = deposito.Fecha.ToString();
                    List<String> temp = new List<String>();
                    temp.Add(amountStr);
                    temp.Add(date);
                    depositoList.Add(temp);
                }
                return depositoList;
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
                var monto = decimal.Parse(deposito["monto"].ToString());
                var id = int.Parse(deposito["id"].ToString());
                var fecha = DateTime.Now;
                cuentaVieja = db.Cuentas.FirstOrDefault(a => a.IdCuenta == id);
                cuentaVieja.Saldo = cuentaVieja.Saldo + monto;
                var deposito2 = new Depositos();
                deposito2.IdCuenta = id;
                deposito2.Monto = monto;
                deposito2.Fecha = DateTime.Now;
                db.Depositos.Add(deposito2);
                db.SaveChanges();
            }
            return cuentaVieja;
        }

        [HttpPut]
        public void Put(int id, decimal monto)
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
