using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using _2005backend.Models;

namespace _2005backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class LeavesController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public LeavesController(IConfiguration configuration)
        {
            _configuration = configuration;

        }
        [Route("list")]
        [HttpPost]
        public JsonResult Post(Leaves leave)
        {
            string query = @"
                select leaveid,
                        leavetype ,
                        datefrom ,
                        dateto ,
                        status,
                        approver ,
                        remarks 
                from leaves
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
                    myCommand.Parameters.AddWithValue("@employeename", leave.employeename);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Edit(Leaves leave)
        {
            string query = @"
                insert into leaves(leavetype,datefrom,dateto,status,employeename,approver,remarks)
                values(@leavetype,@datefrom,@dateto,@status,@employeename,@approver,@remarks)
                          
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("BackEndCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@leavetype", leave.leavetype);
                    myCommand.Parameters.AddWithValue("@datefrom", Convert.ToDateTime(leave.datefrom));
                    myCommand.Parameters.AddWithValue("@dateto", Convert.ToDateTime(leave.dateto));
                    myCommand.Parameters.AddWithValue("@status", leave.status);
                    myCommand.Parameters.AddWithValue("@employeename", leave.employeename);
                    myCommand.Parameters.AddWithValue("@approver", leave.approver);
                    myCommand.Parameters.AddWithValue("@remarks", leave.remarks);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }

        [HttpPut]
        public JsonResult Put(Leaves leave)
        {
            string query = @"
                update leaves
                set status =
                @status
                where leaveid=@leaveid
                          
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("BackEndCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@leaveid", leave.leaveid);
                    myCommand.Parameters.AddWithValue("@status", leave.status);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);

                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }
        [HttpDelete]
        public JsonResult Delete(Leaves leave)
        {
            string query = @"
                           delete from leaves
                            where leaveid=@leaveid
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("BackEndCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@leaveid", leave.leaveid);
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
        public JsonResult Status(Leaves leave)
        {
            string query = @"
                update leaves
                set status =
                @status
                where leaveid=@leaveid
                          
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("BackEndCon");
            NpgsqlDataReader myReader;
            using (NpgsqlConnection myCon = new NpgsqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (NpgsqlCommand myCommand = new NpgsqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@leaveid", leave.leaveid);
                    myCommand.Parameters.AddWithValue("@status", leave.status);
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
        public JsonResult Approver(Leaves leave)
        {
            string query = @"
                select leaveid,
                       leavetype ,
                        datefrom ,
                        dateto ,
                        status,
                        employeename ,
                        remarks 
                from leaves 
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
                    myCommand.Parameters.AddWithValue("@approver", leave.approver);
                    myCommand.Parameters.AddWithValue("@status", leave.status);
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