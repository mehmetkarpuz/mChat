using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading;
using Microsoft.Web.WebSockets;
using System.Web.WebSockets;

namespace mChatApp
{
    /// <summary>
    /// Summary description for SocketMsgHandler
    /// </summary>
    public class SocketMsgHandler : IHttpHandler
    {
        public void ProcessRequest(HttpContext context)
        {
            if (context.IsWebSocketRequest)
            {                                
                context.AcceptWebSocketRequest(new WebSocketHelper());
            }
            else
            {

            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}