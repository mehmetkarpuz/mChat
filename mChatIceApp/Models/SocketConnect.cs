using mChatIceApp.Models;
using Microsoft.Web.WebSockets;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace mChatIceApp
{
    public class ChatSocketHandler : WebSocketHandler
    {
        private static WebSocketCollection clients = new WebSocketCollection();
        private UserModel connectedUser = new UserModel();

        public ChatSocketHandler(string username)
        {
            this.connectedUser.UserName = username;
        }

        public override void OnOpen()
        {
            //this.connectedUser.UserName = this.WebSocketContext.QueryString["UserName"];
            clients.Add(this);
            OnMessage("ConnectedUserList#" + this.GetConnectedUserListJson(clients));
        }

        public override void OnMessage(string message)
        {
            if (message.Contains("ConnectedUserList"))
            {
                clients.Broadcast(message);
            }
            else
                clients.Broadcast(string.Format("{0}|{1}", this.connectedUser.UserName, message));

            //int test = 0;
            //while (test < 5)
            //{
            //    test++;
            //    clients.Broadcast("Selamlar test değişkeni = " + test.ToString());            
            //    Thread.Sleep(5000);
            //}
        }

        public override void OnClose()
        {
            clients.Remove(this);
            OnMessage("ConnectedUserList#" + this.GetConnectedUserListJson(clients));
            clients.Broadcast(string.Format("{0}|çıkış yaptı.", this.connectedUser.UserName));
        }

        /// <summary>
        /// Returns User List With Json Format
        /// </summary>
        /// <param name="clientcollection"></param>
        /// <returns></returns>
        public string GetConnectedUserListJson(WebSocketCollection clientcollection)
        {
            string connectedUserListJsonStr = "";
            try
            {
                List<UserModel> connectedUserList = new List<UserModel>();
                foreach (var item in clientcollection)
                {
                    UserModel newUser = new UserModel();
                    newUser.UserName = item.WebSocketContext.QueryString["UserName"].ToString();
                    newUser.UserLogo = "1";
                    connectedUserList.Add(newUser);
                }
                connectedUserListJsonStr = Newtonsoft.Json.JsonConvert.SerializeObject(connectedUserList);
            }
            catch (Exception ex)
            {
                connectedUserListJsonStr = "-1";
            }
            return connectedUserListJsonStr;
        }
    }

   
}