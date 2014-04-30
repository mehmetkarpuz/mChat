using mChatIceApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace mChatIceApp.Controllers
{
    public class mLoginController : ApiController
    {
       [AcceptVerbs("GET", "POST")]
        public UserModel AuthenticateUser(UserModel user)
        {
            if (user == null)
                return new UserModel();
            return new UserModel() { UserName = user.UserName, Password = "1234" };
        }
    }
}
