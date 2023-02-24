using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _2005backend.Models
{
    public class Claims
    {
        public int claimsid { get; set; }
        public string claimstype { get; set; }

        public string invoiceid { get; set; }

        public float claimsamount { get; set; }

        public string status { get; set; }

        public string submissiondate { get; set; }

        public string employeename { get; set; }

        public string approver { get; set; }

        public string remarks { get; set; }

    }
}