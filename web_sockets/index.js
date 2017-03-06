//app.js

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var usernames=[];

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'index.html'));
});
function removeByValue(arr, val) {
    for(var i=0; i<arr.length; i++) {
        if(arr[i] == val) {
            arr.splice(i, 1);
            break;
        }
    }
}
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
        removeByValue(usernames,socket.nickname);
        io.emit('disconnect',{
            userNumber:usernames.length,
            name:socket.nickname
        });
    });
    socket.on('nickname',function(name){
        usernames.push(name);
        socket.nickname = name;
        io.emit('nickname',{
            name:socket.nickname,
            userNumber:usernames.length
        });
    });
    socket.on('chat message', function(msg){
        console.log(socket.nickname+'message: ' + msg);
        io.emit('chat message', {
            nick:socket.nickname,
            message:msg
        });
    });

});

app.set('port', process.env.PORT || 3000);

var server = http.listen(app.get('port'), function() {
    console.log('start at port:' + server.address().port);
});