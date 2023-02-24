using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _2005backend.Models
{
    public class Leaves
    {
        public int leaveid { get; set; }
        public string leavetype { get; set; }

        public string datefrom { get; set; }
        public string dateto { get; set; }

        public string status { get; set; }

        public string employeename { get; set; }


        public string approver { get; set; }

        public string remarks { get; set; }

    }
}