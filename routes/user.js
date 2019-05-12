const express = require('express');
const pool = require('../pool.js');
var router = express.Router();
const session = require('express-session');
var user_key = 'keys';
// router.use(session({
//     secret: user_key, // 对session id 相关的cookie 进行签名
//     resave : true,
//     saveUninitialized: false
// }))
router.use(session({
    name: user_key,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))
//登录接口
router.get('/login',(req,res)=>{
	var uname = req.query.uname;
	var upwd = req.query.upwd;
	var sql1 = 'select uid from dy_user where uname=? and upwd=md5(?)';
    //若登录成功返回用户信息
	pool.query(sql1,[uname,upwd],(err,result)=>{
		if(err) throw err;
		if(result.length==0){
			res.send({code:-1,msg:"用户名或密码不正确"});
		}else{
			req.session.uid = result[0].uid;
            res.send({code:1,data:result});
		};
	});
})
//获得用户详情
router.get('/details',(req,res)=>{
    var uid = req.query.uid;
    if (!uid) {
        return;
    };
    var sum = 0;
    var obj = {code:1,}
    //获得用户所有作品
    var sql1 = 'select lid,src,title,like_num from dy_works_list where uid=?';
    pool.query(sql1, [uid], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            sum += 50;
            obj.data = result;
            if (sum == 150) res.send(obj);
        }else{
            sum += 50;
            obj.data = [];
            if (sum == 150) res.send(obj);
        }
    })
    //获得用户所有的总赞数
    var sql2 = 'select sum(like_num) s from dy_works_list where uid=?';
    pool.query(sql2, [uid], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            if(!result[0].s) result[0].s=0;
            sum += 50;
            obj.count = result[0].s;
            if (sum == 150) res.send(obj);
        }else{
            sum += 50;
            obj.count = result[0].s;
            if (sum == 150) res.send(obj);
        }
    })
    // 用户详情
    var sql3 = 'select user_name,user_img,phone,signature from dy_user where uid=?'
    pool.query(sql3,[uid],(err,result)=>{
        if(err) throw err;
        if (result.length > 0) {
            sum += 50;
            obj.user = result[0];
            if (sum == 150) res.send(obj);
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
router.get('/logout',(req,res)=>{
    req.session.destroy(function (err) {
        if (err) {
            console.log("退出失败!");
            return;
        }
        //清除登录cookie
        res.clearCookie(user_key)
        // res.redirect("/")
    })
})
module.exports = router;
