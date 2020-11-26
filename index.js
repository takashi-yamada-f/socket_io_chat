// モジュール
var express = require('express');
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 7000;

// HTTPサーバ（express）

// "/"にアクセスがあったらindex.htmlを返却
app.get('/' , function(req, res){
    res.sendFile(__dirname+'/index.html');
});

// イベント

// ユーザーが接続
io.on('connection',function(socket){
    // コンソールに表示
    console.log('[connect] socket.id: ' + socket.id);

    // クライアント（送信元）にメッセージを送信
    io.to(socket.id).emit("message", '(Your socket.id: ' + socket.id + ')');

    // メッセージを受信
    socket.on('message',function(msg){
        // コンソールに表示
        console.log('[message] socket.id: ' + socket.id + ' message: ' + msg);

        // クライアント（全員）にメッセージを送信
        io.emit('message', msg);
    });
});

http.listen(PORT, function(){
    // コンソールに表示
    console.log('server listening. Port:' + PORT);
});