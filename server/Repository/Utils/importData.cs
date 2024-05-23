using MongoDB.Bson.IO;
using Repository.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Diagnostics.Metrics;
using MongoDB.Driver;

namespace Repository.Utils
{
    public class importData
    {
        public static MongoRepository repository;
        public static void Initialize(MongoRepository mongoRepository)
        {
            repository = mongoRepository;
        }

        private static async Task<string> GetDataFromApi(string apiUrl)
        {
            using (HttpClient client = new HttpClient())
            {
                HttpResponseMessage response = await client.GetAsync(apiUrl);
                if (response.IsSuccessStatusCode)
                {
                    return await response.Content.ReadAsStringAsync();
                }
                else
                {
                    throw new HttpRequestException($"Failed to retrieve data from API: {apiUrl}");
                }
            }
        }
        public static async Task ImportDataFromJsonAsync()
        {
            try 
            {
                string apiUrl = "https://restcountries.com/v3.1/all";
                string jsonData = await GetDataFromApi(apiUrl);

                dynamic countryData = Newtonsoft.Json.JsonConvert.DeserializeObject(jsonData);

                List<Country> countries = new List<Country>();

                foreach (var item in countryData)
                {
                    Country country = new Country();

                    country.Name = item.name.common;  
                    country.Region = item.region;
                    country.SubRegion = item.subregion;
                    country.Population = item.population;
                    country.Flag = item.flags.svg;
                    if (item.capital != null && item.capital.Count > 0)
                    {
                        country.Capital = new string[item.capital.Count];
                        for (int i = 0; i < item.capital.Count; i++)
                        {
                            country.Capital[i] = item.capital[i].ToString(); 
                        }
                    }
                    else
                    {
                        country.Capital = new string[] { };
                    }

                    countries.Add(country);
                }
                repository.CountryService.initialCollectionCountries(countries);

            }
            catch(Exception e)
            {
                Logs.printErrorLogs($"Failed to initial countries. Error: {e.Message}");
            }
        }
    }
}
