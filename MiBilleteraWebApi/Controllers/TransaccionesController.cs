using Entidades;
//using MiBilleteraWebApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Negocio;

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

        [HttpPost]
        public void Post([FromBodyAttribute] Transaccion oTransaccion)
        {
            using (var db = new MiBilleteraContext())
            {
                new TransaccionBC().CargarTransaccion(db, oTransaccion);
            }
        }
    }
}
