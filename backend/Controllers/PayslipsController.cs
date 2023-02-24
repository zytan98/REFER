using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using _2005backend.Models;


namespace _2005backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class PayslipsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;


        public PayslipsController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;

        }

        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                select 
                payslipreference,
                datefrom,
                dateto,
                pdf,
                passcode
                from payslips          
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("BackEndCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public string PhysicalLocation(Payslips pdf)
        {
            byte[] pdfBytes = System.IO.File.ReadAllBytes(pdf.pdf);
            return Convert.ToBase64String(pdfBytes);
        }

    }

}