const express = require('express');
const bodyParser = require('body-parser');
// const pool = require('./pool.js')
const cors = require('cors');   //引入cors
const ws = require('ws');
//路由引入
const userRouter = require('./routes/user.js');
const worksListRouter = require('./routes/WorksList.js');
const kindRouter = require('./routes/kind.js');
// const upload = require('./uploadFile');
//创建WEB服务器
var server = express();
//监听端口
// var webSocketsServerPost = 3000;
server.listen(3000,()=>{
    console.log('suc server')
});
server.use(bodyParser.urlencoded({
    extended: true
}))
//配置cors
server.use(cors({
    origin: ['http://localhost:8080', 'http://127.0.0.1:8080','file:///D:/ApplicationWeb/demo/upload/public/uploadAxios.html'],
  credentials:true
}))
//托管静态资源
server.use( express.static('public') )
//挂载路由
server.use('/user',userRouter)
server.use('/worksList',worksListRouter)
server.use('/kind', kindRouter)
// server.use('/', upload)

//websocket
var wsServer = new ws.Server({port:3001});
wsServer.on("connection",(socket)=>{
    console.log("ws:-服务器接收连接");
    //服务器接收客户端数据
    socket.on("message",(msg)=>{
    	//webscoket只能接受字符串
        console.log("服务器接收到消息:-"+msg);
        var arr = msg.split(",")
        console.log(arr);
        //返回接受的数据,将数据转换为
        var json = JSON.stringify({ msg:arr[0], user_name:arr[1], user_img:arr[2] })
        socket.send(json)
    });
    socket.on("close",()=>{
        console.log("客户端断开连接...");
    })
});
