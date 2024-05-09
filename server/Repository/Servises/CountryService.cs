using MongoDB.Driver;
using Repository.Models;
using Repository.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Servises
{
    public class CountryService
    {
        private IMongoCollection<Country> _countries;
        public CountryService(IMongoCollection<Country> countries)
        {
            _countries = countries;
        }

        public void initialCollectionCountries(List<Country> countries)
        {
            if (_countries.CountDocuments(FilterDefinition<Country>.Empty) == 0)
            {
                _countries.InsertMany(countries);
                Logs.printInfoLogs("Collection countries successfully filled");
            }
            else
            {
                Logs.printInfoLogs("Collection countries exists");
            }
        }

        public List<Country> GetAllCountries()
        {
            List<Country> countries = _countries.Find(_ => true).ToList();
            return countries;
        }

        public void UpdateCountry(string id, Country country)
        {
            ReplaceOneResult result = _countries.ReplaceOne(country => country.Id == id, country);
        } 

        public void CreateCountry(Country country)
        {
            _countries.InsertOne(country);
        }

    }
}
