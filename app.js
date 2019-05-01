const express = require('express');
const pool = require('./pool.js')
const cors = require('cors');   //引入cors
const websocket = require('websocket');
const ws = require('ws');
//路由引入
const userRouter = require('./routes/user.js');
const worksListRouter = require('./routes/WorksList.js');
const kindRouter = require('./routes/kind.js');
//创建WEB服务器
var server = express();
//监听端口
// var webSocketsServerPost = 3000;
server.listen(3000,()=>{
    console.log('suc server')
});
//创建websocket服务器
// var wsServer =new websocket.server({
//     httpServer: server
// });
//配置cors
server.use(cors({
  origin:['http://localhost:8080','http://127.0.0.1:8080'],
  credentials:true
}))
//托管静态资源
server.use( express.static('public') )
//挂载路由
server.use('/user',userRouter)
server.use('/worksList',worksListRouter)
server.use('/kind',kindRouter)

//websocket
var wsServer = new ws.Server({port:3001});
wsServer.on("connection",(socket)=>{
    console.log("ws:-服务器接收连接");

    //服务器接收客户端数据
    socket.on("message",(msg)=>{
        console.log("服务器接收到消息:-"+msg);
        //返回接受的数据
        var json = JSON.stringify({ type:'message', data: msg })
        socket.send(json)
        // var sql = 'select * from dy_user';
        // pool.query(sql,(err,result)=>{
        //     if(err) throw err;
        //     if(result.length>0){
        //         console.log(JSON.parse(result));
        //     }
        // })

    });
    socket.on("close",()=>{
        console.log("客户端断开连接...");
    })
});
