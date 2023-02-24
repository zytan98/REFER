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

    public class ClaimsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;


        public ClaimsController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;

        }

        [Route("list")]
        [HttpPost]
        public JsonResult Get(Claims cla)
        {
            string query = @"
                select claimsid,
                        claimstype ,
                        claimsamount ,
                        status ,
                        submissiondate,
                        approver ,
                        remarks 
                from claims
                where employeename = @employeename          
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("BackEndCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@employeename", cla.employeename);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Claims cla)
        {
            string query = @"
                insert into claims(claimstype,invoiceid,claimsamount,status,submissiondate,employeename,approver,remarks)
                values(@claimstype,@invoiceid,@claimsamount,@status,@submissiondate,@employeename,@approver,@remarks)
                          
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("BackEndCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@claimstype", cla.claimstype);
                    myCommand.Parameters.AddWithValue("@invoiceid", cla.invoiceid);
                    myCommand.Parameters.AddWithValue("@claimsamount", NpgsqlTypes.NpgsqlDbType.Real, cla.claimsamount);
                    myCommand.Parameters.AddWithValue("@status", cla.status);
                    myCommand.Parameters.AddWithValue("@submissiondate", Convert.ToDateTime(cla.submissiondate));
                    myCommand.Parameters.AddWithValue("@employeename", cla.employeename);
                    myCommand.Parameters.AddWithValue("@approver", cla.approver);
                    myCommand.Parameters.AddWithValue("@remarks", cla.remarks);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Claims cla)
        {
            string query = @"
                update claims
                set claimstype = @claimstype,
                invoiceid= @invoiceid,
                claimsamount= @claimsamount,
                remarks = @remarks
                where claimsid=@claimsid
                          
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("BackEndCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@claimsid", cla.claimsid);
                    myCommand.Parameters.AddWithValue("@claimstype", cla.claimstype);
                    myCommand.Parameters.AddWithValue("@invoiceid", cla.invoiceid);
                    myCommand.Parameters.AddWithValue("@claimsamount", NpgsqlTypes.NpgsqlDbType.Real, cla.claimsamount);
                    myCommand.Parameters.AddWithValue("@remarks", cla.remarks);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Editted Successfully");
        }
        [HttpDelete]
        public JsonResult Delete(Claims cla)
        {
            string query = @"
                           delete from claims
                            where claimsid=@claimsid
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("BackEndCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@claimsid", cla.claimsid);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }

        [Route("status")]
        [HttpPost]
        public JsonResult Status(Claims cla)
        {
            string query = @"
                update claims
                set status =
                @status
                where claimsid=@claimsid
                          
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("BackEndCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@claimsid", cla.claimsid);
                    myCommand.Parameters.AddWithValue("@status", cla.status);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Status Successfully");
        }

        [Route("approver")]
        [HttpPost]
        public JsonResult Approver(Claims cla)
        {
            string query = @"
                select claimsid,
                        claimstype ,
                        claimsamount ,
                        status ,
                        submissiondate,
                        employeename ,
                        remarks 
                from claims 
                where approver = @approver
                AND
                status = @status           
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("BackEndCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@approver", cla.approver);
                    myCommand.Parameters.AddWithValue("@status", cla.status);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

    }

}