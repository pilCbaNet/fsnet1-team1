using Entidades;
//using MiBilleteraWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Negocio;
using System.Security.Cryptography;
using System.Text.Json;
using System.Text.Json.Nodes;
using rngGenClass;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MiBilleteraWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        // GET: api/Usuarios
        [HttpGet]
        public List<Usuario> Get()
        {
            using (var db = new MiBilleteraContext())
            {
                return db.Usuarios.ToList();
            }
            //return new string[] { "value1", "value2" };
        }

        // GET api/<UsuariosController>/5
        [HttpGet("{id}")]
        public Usuario? GetById(int id)
        {
            using (var db = new MiBilleteraContext())
            {
                return new UsuarioBC().ObtenerUsuario(db, id);
            }
        }

        [HttpGet("username/{username}")]
        public Usuario? GetByUsername(string username)
        {
            using (var db = new MiBilleteraContext())
            {
                return new UsuarioBC().GetUserByUsername(db, username);
            }
        }

        [HttpGet("{us}/{pass}")]
        public Usuario? GetByLogin(string us, string pass)
        {
            using (var db = new MiBilleteraContext())
            {

                return new UsuarioBC().LoginUsuario(db, us, pass);
            }
        }

        [HttpPost("login")]
        public JsonObject PostByLogin([FromBody] Login login)
        {
            using (var db = new MiBilleteraContext())
            {
                Usuario user = new UsuarioBC().LoginUsuario(db, login.Username, login.Password);
                var loginResponse = new JsonObject
                {
                    ["token"] = new DateTime(2019, 8, 1),
                    ["clientId"] = user.Cuenta.FirstOrDefault().IdCuenta,
                    ["userId"] = user.IdUsuario,
                    ["name"] = user.Nombre + ", " + user.Apellido,
                    ["username"] = user.Usuario1,
                };

                return loginResponse;
            }
        }

        // POST api/Usuarios/register
        [HttpPost("register")]
        public IActionResult Post([FromBody] Usuario U)
        {
            var currentDate = DateTime.Now;
            Cuenta cuenta = new Cuenta();
            cuenta.IdCuenta = U.IdUsuario;
            cuenta.IdUsuario = U.IdUsuario;
            cuenta.Cbu = rngGen.RandomString(12);
            cuenta.Saldo = 0;
            cuenta.FechaAlta = DateTime.Now;
            U.FechaAlta = DateTime.Now;
            using (var db = new MiBilleteraContext())
            {
                if (db.Usuarios.Any(x => x.Usuario1 == U.Usuario1))
                {
                    var message = new JsonObject
                    {
                        ["message"] = "Ya existe un usuario con este Username"
                    };
                    return BadRequest(message);
                }
                if (db.Usuarios.Any(x => x.Email == U.Email))
                {
                    var message = new JsonObject
                    {
                        ["message"] = "Ya existe un usuario con este Email"
                    };
                    return BadRequest(message);
                }
                if (db.Usuarios.Any(x => x.Dni == U.Dni))
                {
                    var message = new JsonObject
                    {
                        ["message"] = "Ya existe un usuario con este DNI"
                    };
                    return BadRequest(message);
                }
                if (db.Usuarios.Any(x => x.Telefono == U.Telefono))
                {
                    var message = new JsonObject
                    {
                        ["message"] = "Este número de teléfono ya ha sido registrado"
                    };
                    return BadRequest(message);
                }
                do
                {
                    cuenta.Cbu = rngGen.RandomString(12);
                }
                while (db.Cuentas.Any(x => x.Cbu == cuenta.Cbu));
                U.Cuenta.Add(cuenta);
                db.Usuarios.Add(U);
                db.SaveChanges();
            }
            var registerResponse = new JsonObject
            {
                ["username"] = U.Usuario1
            };

            return Ok(registerResponse);
        }

        // PUT api/Usuarios/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Usuario U)
        {
            using (var db = new MiBilleteraContext())
            {
                var reg = db.Usuarios.FirstOrDefault(user => user.IdUsuario == id);
                if (reg != null)
                {
                    reg.Apellido = U.Apellido;
                    reg.Nombre = U.Nombre;
                    reg.Telefono = U.Telefono;
                    reg.Dni = U.Dni;
                }

            }
        }
        // DELETE api/<UsuariosController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            using (var db = new MiBilleteraContext())
            {
                var regCuentas = db.Cuentas.FirstOrDefault(c => c.IdUsuario == id);
                if (regCuentas == null)
                {
                    var regUsuario = db.Usuarios.FirstOrDefault(u => u.IdUsuario == id);
                    db.Remove(regUsuario);
                    db.SaveChanges();
                }
                else
                {
                    Console.WriteLine($"El Usuario contiene la cuenta CBU Nº {regCuentas.Cbu}, no es posible eliminar el usuario");
                }
            }

        }

    }
}
