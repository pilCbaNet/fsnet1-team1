using Entidades;
using Microsoft.AspNetCore.Mvc;
using Negocio;

namespace MiBilleteraWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepositosControllers : Controller
    {
        [HttpGet]
        public List<Depositos> Get()
        {
            using (var db = new MiBilleteraContext())
            {
                return db.Depositos.ToList();
            }
        }

        [HttpGet("{id:int}")]
        public List<Depositos>? GetById(int id)
        {
            using (var db = new MiBilleteraContext())
            {

                var depositos = new DepositosBC().ObtenerDepositosByCuenta(db, id);
                return depositos;
            }
        }

    }
}
