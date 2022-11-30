using Entidades;
//using MiBilleteraWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Negocio;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MiBilleteraWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        // GET: api/<UsuariosController>
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

        // POST api/<UsuariosController>
        [HttpPost]
        public void Post([FromBody] Usuario U)
        {
            using (var db = new MiBilleteraContext())
            {
                db.Usuarios.Add(U);
                db.SaveChanges();
            }
        }

        // PUT api/<UsuariosController>/5
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
            using (var db= new MiBilleteraContext())
            {
                var regCuentas= db.Cuentas.FirstOrDefault(c => c.IdUsuario == id);
                if (regCuentas == null)
                {
                    var regUsuario = db.Usuarios.FirstOrDefault(u=> u.IdUsuario==id);
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
