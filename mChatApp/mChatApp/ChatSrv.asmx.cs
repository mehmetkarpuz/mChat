using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Services;
using System.Web.Services;

namespace mChatApp
{
    /// <summary>
    /// Summary description for ChatSrv
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class ChatSrv : System.Web.Services.WebService
    {

        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public User AuthenticateUser(User user)
        {

            if (user == null)
                return new User();
            return new User() { UserName = user.UserName, Password = "1234" };
        }
    }
    public class User
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string UserId { get; set; }
    }
}
