using log4net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Repository;
using Repository.Models;
using Repository.Utils;

namespace Countries.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        public readonly MongoRepository repository;
        public CountryController(MongoRepository mongoRepository)
        {
            repository = mongoRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                List<Country> countries = repository.CountryService.GetAllCountries();
              
                Logs.printInfoLogs($"fetching all {countries.Count} countries");
                return Ok(countries);
            }
            catch (Exception e)
            {
                Logs.printErrorLogs($"Failed to get countries. Error: {e.Message}");
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        public ActionResult<Country> Update(string id, Country country)
        {
            try
            {
                repository.CountryService.UpdateCountry(id, country);
                Logs.printInfoLogs($"Updated country with id: {id}");
                return country;
            }
            catch (Exception e)
            {
                Logs.printErrorLogs($"Failed to update country. Error: {e.Message}");
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public ActionResult<Country> Create(Country country)
        {
            try
            {
                repository.CountryService.CreateCountry(country);
                Logs.printInfoLogs($"Created country with name: {country.Name}");
                return country;
            }
            catch (Exception e)
            {
                Logs.printErrorLogs($"Failed to create country. Error: {e.Message}");
                return BadRequest(e.Message);
            }
        }

    }
}
