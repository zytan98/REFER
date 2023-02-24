using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _2005backend.Models
{
    public class Payslips
    {
        public string payslipreference { get; set; }

        public string datefrom { get; set; }
        public string dateto { get; set; }

        public string pdf { get; set; }

        public string passcode {get;set;}
    }
}