using Microsoft.Web.WebSockets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace mChatIceApp.Controllers
{
    public class mChatController : ApiController
    {
        [AcceptVerbs("GET", "POST")]
        public HttpResponseMessage ConnectUser(string username)
        {
            if (!HttpContext.Current.IsWebSocketRequest)
                return new HttpResponseMessage(HttpStatusCode.MethodNotAllowed);
            HttpContext.Current.AcceptWebSocketRequest(new ChatSocketHandler(username));
            return Request.CreateResponse(HttpStatusCode.SwitchingProtocols);
        }
    }
}
