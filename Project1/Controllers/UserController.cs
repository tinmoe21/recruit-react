using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Configuration;
using System.Data.SqlClient;
using System.Threading.Tasks;

namespace Project1.Controllers
{
    public class UserController : ControllerBase
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public IActionResult Register(User model)
        {
            int count = 0;
            string insertqueryString = "INSERT [User] (Name, Address, CreditCardNo, CCV, ExpiryDate) " +
                "VALUES (@Name, @Address, @CreditCardNo, @CCV, @ExpiryDate)";

            string conStr = ConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString.ToString();
            try
            {
                using (SqlConnection con = new SqlConnection(conStr))
                {
                    using (SqlCommand cmd = new SqlCommand(insertqueryString, con))
                    {
                        cmd.Parameters.Clear();
                        cmd.Parameters.AddWithValue("@Name", model.Name);
                        cmd.Parameters.AddWithValue("@Address", model.Address);
                        cmd.Parameters.AddWithValue("@CreditCardNo", model.CreditCardNo);
                        cmd.Parameters.AddWithValue("@CCV", model.CCV);
                        cmd.Parameters.AddWithValue("@ExpiryDate", model.ExpiryDate);

                        if (con.State != System.Data.ConnectionState.Open)
                            con.Open();

                        count = cmd.ExecuteNonQuery();

                        con.Close();

                        if (count > 0)
                            return Ok("Success");
                        else
                            return Ok("Old password is not correct");
                    }
                }

            }
            catch (SqlException ex)
            {
                throw ex;
            }
        }
    }
}
