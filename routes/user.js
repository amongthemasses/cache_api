const express = require('express');
const pool = require('../pool.js');
var router = express.Router();
const session = require('express-session');
router.use(session({
    secret :  'dfasf', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false
}))
//登录接口
router.get('/login',(req,res)=>{
	var uname = req.query.uname;
	var upwd = req.query.upwd;
    var sum = 0;
    var obj = {code:1}
	var sql1 = 'select user_name,user_img,phone,signature from dy_user where uname=? and upwd=md5(?)';
    //若登录成功返回用户信息
	pool.query(sql1,[uname,upwd],(err,result)=>{
		if(err) throw err;
		if(result.length==0){
			res.send({code:-1,msg:"用户名或密码不正确"});
		}else{
            sum+=50;
			req.session.uid = result[0].uid;
            obj.user = result;
			if(sum==150) res.send(obj);
		};
	});
    //获得用户所有作品
    var sql2 = 'select lid,src,title,like_num from dy_works_list where uid=(select uid from dy_user where uname=? and upwd=md5(?))';
    pool.query(sql2,[uname,upwd],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            sum+=50;
            obj.data=result;
            if(sum==150) res.send(obj);
        }
    })
    //获得用户所有的总赞数
    var sql3 = 'select sum(like_num) s from dy_works_list where uid=(select uid from dy_user where uname=? and upwd=md5(?))';
    pool.query(sql3,[uname,upwd],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            sum+=50;
            obj.count=result[0].s;
            if(sum==150) res.send(obj);
        }
    })
})
//好友列表
router.get('/friend',(req,res)=>{
	var uid = req.session.uid;
	if(!uid){
		res.send({code:-2,msg:'请先登录'})
		return;
	};
	var sql = 'SELECT user_id,fname,fpic,signature FROM dy_friend WHERE uid=?';
	pool.query(sql,[uid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send({code:1,data:result});
		}else{
            res.send({code:-1,msg:'暂无好友',data:[]});
        }
	});
});
module.exports=router;
//好友搜索
router.get('/search',(req,res)=>{
    //获取查找关键字
    var kw=req.query.kw;
    //判断用户是否登录
    var uid = req.session.uid;
	if(!uid){
		res.send({code:-2,msg:'请先登录'})
		return;
	};
    if(parseInt(kw.length)==11){  //是否为手机号
        //是按照手机号码查找
        var sql=`select * from dy_user where phone=?`;
        pool.query(sql,[kw],(err,result)=>{
            if(err) throw err;
            if(result.length>0){
                res.send({code:1,data:result});
            }else{
                res.send({code:-1,msg:'无相关好友信息'})
            }
        })
    }else{
        //反之为按照用户名查找
        var sql=`select * from dy_user where user_name=?`;
        pool.query(sql,[kw],(err,result)=>{
            if(err) throw err;
            if(result.length>0){
                res.send({code:1,data:result});
            }else{
                res.send({code:-1,msg:'无相关好友信息'})
            }
        })
    };
})
