# socket_io_chat
socket.ioを使ったサンプルプログラム

### (1)作業用ディレクトリを作成し、移動します。
```
$ mkdir socket_io_chat
$ cd socket_io_chat
```

### (2)npm initを実行してpackage.jsonを作成します。
```
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (socket_io_chat) 
version: (1.0.0) 
description: 
entry point: (index.js) 
test command: 
git repository: 
keywords: 
author: 
license: (ISC) 
About to write to /Users/takashiyamada/Work/20201126/socket_io_chat/package.json:

{
  "name": "socket_io_chat",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this OK? (yes) yes
```

### (3)Express、socket.ioをインストールします。
```
$ npm install express socket.io
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN socket_io_chat@1.0.0 No description
npm WARN socket_io_chat@1.0.0 No repository field.

+ socket.io@3.0.3
+ express@4.17.1
added 79 packages from 131 contributors and audited 79 packages in 5.561s
found 0 vulnerabilities
```

### (4)index.jsを作成します。
```
$ vim index.js 
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
```

### (5)index.htmlを作成します。
```
$ vim index.html 
<!DOCTYPE html>
<html>
<head>
    <title>socket.io chat</title>
    <script src="/socket.io/socket.io.js"></script>
    <script src="https://code.jquery.com/jquery-1.11.1.js"></script>
</head>
<body>
    <ul id="messages"></ul>
    <form id="message_form" action="#">
      <input id="input_msg" autocomplete="off" /><button>Send</button>
    </form>
  <script>
      var socketio = io();
      $(function(){
          $('#message_form').submit(function(){
            socketio.emit('message', $('#input_msg').val());
            $('#input_msg').val('');
            return false;
          });
          socketio.on('message',function(msg){
            $('#messages').append($('<li>').text(msg));
          });
        });
    </script>
</body>
</html>
```

### (6)サーバーを起動します。
```
$ node index
server listening. Port:7000
```

### (7)http://localhost:7000/ にアクセスします。

以上
