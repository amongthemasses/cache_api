const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./pool.js')
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
//配置cors
// server.use(cors({
    // "origin":[],
    // ""
// }))
server.all('*',(req,res,next)=>{
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials','true');
    next();
})
// var allowCors = function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', req.headers.origin);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   res.header('Access-Control-Allow-Credentials','true');
//   next();
// };
// server.use(allowCors);//使用跨域中间件
//body-parser  config
server.use(bodyParser.urlencoded({
    extended: true
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
//定义一个广播数组
var sockets = [];
wsServer.on("connection",(socket)=>{
    console.log("ws:-服务器接收连接");
    if(sockets.indexOf(socket)===-1){
        // 每次进来的用户都添加进广播数组
        sockets.push(socket);
        console.log(sockets)
        console.log("有"+sockets.length+"个客户端在线");
        var num = sockets.length
        if(!sockets) num = 0;
        //服务器接收客户端数据
        socket.on("message",(msg)=>{
        	//webscoket只能接受字符串
            var arr = msg.split(",")
            //返回接受的数据,将数据转换为
            var json = JSON.stringify({ uid: arr[0], msg: arr[1], user_name: arr[2], user_img: arr[3],user_num: num })
            // 循环遍历广播给每一个用户
            for(var c of sockets){
                c.send(json)
            }
        });
    }
    //关闭ws服务器
    socket.on("close",(eclose)=>{
        sockets.pop(-1);
        console.log("客户端断开连接...",eclose);
    })
});
