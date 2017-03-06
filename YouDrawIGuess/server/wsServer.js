/**
 * Created by Boy on 2015/12/1.
 */
var fs=require("fs");
eval(fs.readFileSync("scripts/dataType.js")+"");
var ws = require("websocket-server");
var server = ws.createServer();
var connIDS=[];//存每个链接的客户端


server.addListener("connection", function(connection){
    connIDS.push(connection.id);
    if(connIDS.length==1)
    {
        tokenMessage.hasToken=true;
        server.send(connIDS[0],JSON.stringify(tokenMessage));
    }
//    chatMessage.content=1;
//    var mes="Welcome,当前在线人数有"+server.manager.length+"个";
//    server.broadcast(mes);
    connection.addListener("message", function(msg){

        if(msg[8]==1)
        {
            console.log(msg);
            connection.broadcast(msg);
        }
        if(msg[8]==0)
        {
            console.log(msg);
            server.broadcast(msg);
        }
    });
});
server.listen(7999);
console.log("running");