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
        // [HttpGet("{id}")]
        // public List<Transaccion> GetById(int id)
        // {
        //     using (var db = new MiBilleteraContext())
        //     {
        //         var depositosCuenta = new TransaccionBC().ObtenerDepositosByCuenta(db, id);
        //         return depositosCuenta;
        //     }
        // }

        // [HttpGet("{username}")]
        // public List<Transaccion> GetByUsername(string username)
        // {
        //     using (var db = new MiBilleteraContext())
        //     {
        //         var transacciones = new TransaccionBC().ObtenerDepositosByUsername(db, username);
        //         return transacciones;
        //     }
        // }

        [HttpGet("pagos/{username}")]
        public List<List<String>> GetPagosByUsername(string username)
        {
            using (var db = new MiBilleteraContext())
            {
                var transactionList = new List<List<String>>();
                var transacciones = new TransaccionBC().ObtenerPagosByUsername(db, username);
                foreach (Transaccion transaccion in transacciones)
                {
                    var amount = transaccion.Monto;
                    string amountStr = amount.ToString("0.00");
                    var receiver = transaccion.IdCuentaDestino;
                    var receiver2 = db.Cuentas.FirstOrDefault(x => x.IdCuenta == receiver);
                    var receiver3 = receiver2.IdUsuario;
                    var receiverUser = db.Usuarios.FirstOrDefault(x => x.IdUsuario == receiver3);
                    var receiverName = receiverUser.Nombre;
                    var receiverLastName = receiverUser.Apellido;
                    string date = transaccion.Fecha.ToString();
                    List<String> temp = new List<String>();
                    temp.Add(amountStr);
                    temp.Add(receiverName);
                    temp.Add(receiverLastName);
                    temp.Add(date);
                    transactionList.Add(temp);
                }
                return transactionList;
            }
        }
        [HttpGet("cobros/{username}")]
        public List<List<String>> GetCobrosByUsername(string username)
        {
            using (var db = new MiBilleteraContext())
            {
                var transactionList = new List<List<String>>();
                var transacciones = new TransaccionBC().ObtenerCobrosByUsername(db, username);
                foreach (Transaccion transaccion in transacciones)
                {
                    var amount = transaccion.Monto;
                    string amountStr = amount.ToString("0.00");
                    var sender = transaccion.IdCuentaOrigen;
                    var sender2 = db.Cuentas.FirstOrDefault(x => x.IdCuenta == sender);
                    var sender3 = sender2.IdUsuario;
                    var senderUser = db.Usuarios.FirstOrDefault(x => x.IdUsuario == sender3);
                    var senderName = senderUser.Nombre;
                    var senderLastName = senderUser.Apellido;
                    string date = transaccion.Fecha.ToString();
                    List<String> temp = new List<String>();
                    temp.Add(amountStr);
                    temp.Add(senderName);
                    temp.Add(senderLastName);
                    temp.Add(date);
                    transactionList.Add(temp);
                }
                return transactionList;
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
