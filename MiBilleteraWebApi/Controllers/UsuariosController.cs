﻿using Entidades;
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
        public JsonObject Post([FromBody] Usuario U)
        {
            var currentDate = DateTime.Now;
            Cuenta cuenta = new Cuenta();
            cuenta.IdCuenta = U.IdUsuario;
            cuenta.IdUsuario = U.IdUsuario;
            cuenta.Cbu = rngGen.RandomString(12);
            cuenta.Saldo = 0;
            cuenta.FechaAlta = DateTime.Now;
            U.FechaAlta = DateTime.Now;
            U.Cuenta.Add(cuenta);
            using (var db = new MiBilleteraContext())
            {
                db.Usuarios.Add(U);
                // db.Cuentas.Add(cuenta);
                db.SaveChanges();
            }
            var registerResponse = new JsonObject
            {
                ["token"] = new DateTime(2019, 8, 1),
                ["clientId"] = U.Cuenta.FirstOrDefault().IdCuenta,
                ["userId"] = U.IdUsuario,
                ["name"] = U.Nombre + ", " + U.Apellido,
                ["username"] = U.Usuario1
            };

            return registerResponse;
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
