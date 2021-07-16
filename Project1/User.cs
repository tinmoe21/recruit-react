using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project1
{
    public class User
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int CreditCardNo { get; set; }
        public int CVC { get; set; }
        public DateTime ExpiryDate { get; set; }
    }
}
