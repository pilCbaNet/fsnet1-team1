using Entidades;
//using MiBilleteraWebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Negocio;
using System.Text.Json.Nodes;

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
        public List<Transaccion> GetById(int id)
        {
            using (var db = new MiBilleteraContext())
            {
                var depositosCuenta = new TransaccionBC().ObtenerDepositosByCuenta(db, id);
                return depositosCuenta;
            }
        }

        // [HttpPost]
        // public void Post([FromBody] Transaccion oTransaccion)
        // {
        //     oTransaccion.amount = oTransaccion.Monto;
        //     using (var db = new MiBilleteraContext())
        //     {

        //         new TransaccionBC().CargarTransaccion(db, oTransaccion);
        //     }
        // }
        [HttpPost]
        public IActionResult Post(JsonObject transaccion)
        {
            Cuenta? cuentaOrigen;
            Cuenta? cuentaDestino;
            Usuario? usuarioOrigen;
            Usuario? usuarioDestino;
            Transaccion? transaccionNueva = new Transaccion();
            decimal monto = decimal.Parse(transaccion["amount"].ToString());
            transaccionNueva.Monto = decimal.Parse(transaccion["amount"].ToString());
            transaccionNueva.giverName = transaccion["giverUsername"].ToString();
            transaccionNueva.receiverName = transaccion["receiverUsername"].ToString();
            using (var db = new MiBilleteraContext())
            {
                if (!db.Usuarios.Any(x => x.Usuario1 == transaccionNueva.receiverName))
                {
                    var responseMessage = new JsonObject
                    {
                        ["message"] = "Username not found"
                    };
                    return BadRequest(responseMessage);
                }
                usuarioOrigen = db.Usuarios.FirstOrDefault(x => x.Usuario1 == transaccionNueva.giverName);
                usuarioDestino = db.Usuarios.FirstOrDefault(x => x.Usuario1 == transaccionNueva.receiverName);
                cuentaOrigen = db.Cuentas.FirstOrDefault(x => x.IdUsuario == usuarioOrigen.IdUsuario);
                cuentaDestino = db.Cuentas.FirstOrDefault(x => x.IdUsuario == usuarioDestino.IdUsuario);
                if (cuentaOrigen.Saldo < transaccionNueva.Monto)
                {
                    var responseErrMessage = new JsonObject
                    {
                        ["message"] = "Insufficient funds"
                    };
                    return BadRequest(responseErrMessage);
                }
                transaccionNueva.IdCuentaDestino = cuentaDestino.IdCuenta;
                transaccionNueva.IdCuentaOrigen = cuentaOrigen.IdCuenta;
                cuentaOrigen.Saldo -= transaccionNueva.Monto;
                cuentaDestino.Saldo += transaccionNueva.Monto;
                transaccionNueva.TipoTransaccion = 1;
                transaccionNueva.Fecha = DateTime.Now;
                transaccionNueva.Monto = monto;
                new TransaccionBC().CargarTransaccion(db, transaccionNueva);
            }
            var responseOkMessage = new JsonObject
            {
                ["Message"] = "Transacción satisfactoria"
            };
            return Ok(responseOkMessage);
        }
    }
}
