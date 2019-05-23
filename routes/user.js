const express = require('express');
const pool = require('../pool.js');
const multer = require('multer');
const fs = require('fs');
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
router.get('/login', (req, res) => {
        var uname = req.query.uname;
        var upwd = req.query.upwd;
        var sql1 = 'select uid from dy_user where uname=? and upwd=md5(?)';
        //若登录成功返回用户信息
        pool.query(sql1, [uname, upwd], (err, result) => {
            if (err) throw err;
            if (result.length == 0) {
                res.send({ code: -1, msg: "用户名或密码不正确" });
            } else {
                req.session.uid = result[0].uid;
                res.send({ code: 1, msg: '登录成功', data: result });
            };
        });
    })
    //获得用户详情
router.get('/details', (req, res) => {
    var uid = req.query.uid;
    if (!uid) {
        return;
    };
    var sum = 0;
    var obj = { code: 1, }
        //获得用户所有作品
    var sql1 = 'select lid,src,title,like_num from dy_works_list where uid=?';
    pool.query(sql1, [uid], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                sum += 50;
                obj.data = result;
                if (sum == 150) res.send(obj);
            } else {
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
                if (!result[0].s) result[0].s = 0;
                sum += 50;
                obj.count = result[0].s;
                if (sum == 150) res.send(obj);
            } else {
                sum += 50;
                obj.count = result[0].s;
                if (sum == 150) res.send(obj);
            }
        })
        // 用户详情
    var sql3 = 'select user_name,user_img,phone,signature from dy_user where uid=?'
    pool.query(sql3, [uid], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            sum += 50;
            obj.user = result[0];
            if (sum == 150) res.send(obj);
        }
    })
})

//好友列表
router.get('/friend', (req, res) => {
    var uid = req.session.uid;
    if (!uid) {
        res.send({ code: -2, msg: '请先登录' })
        return;
    };
    var sql = 'SELECT user_id,fname,fpic,signature FROM dy_friend WHERE uid=?';
    pool.query(sql, [uid], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({ code: 1, data: result });
        } else {
            res.send({ code: -1, msg: '暂无好友', data: [] });
        }
    });
});
//好友搜索
router.get('/search', (req, res) => {
        //获取查找关键字
        var kw = req.query.kw;
        //判断用户是否登录
        var uid = req.session.uid;
        if (!uid) {
            res.send({ code: -2, msg: '请先登录' })
            return;
        };
        if (parseInt(kw.length) == 11) { //是否为手机号
            //是按照手机号码查找
            var sql = `select * from dy_user where phone=?`;
            pool.query(sql, [kw], (err, result) => {
                if (err) throw err;
                if (result.length > 0) {
                    res.send({ code: 1, data: result });
                } else {
                    res.send({ code: -1, msg: '无相关好友信息' })
                }
            })
        } else {
            //反之为按照用户名查找
            var sql = `select * from dy_user where user_name=?`;
            pool.query(sql, [kw], (err, result) => {
                if (err) throw err;
                if (result.length > 0) {
                    res.send({ code: 1, data: result });
                } else {
                    res.send({ code: -1, msg: '无相关好友信息' })
                }
            })
        };
    })
    //添加好友,
router.get('/add', (req, res) => {
        var uid = req.session.uid; //获得登录后用户的id
        var user_id = req.query.user_id; //要添加的用户id
        var fname, fpic, signature;
        if (!uid) {
            res.send({ code: -2, msg: '请先登录' })
            return;
        };
        //查询数据库获得用户信息，赋值给对应变量
        var sql1 = 'SELECT user_name,user_img,signature FROM dy_user WHERE uid=?';
        pool.query(sql1, [user_id], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                fname = result[0].user_name;
                fpic = result[0].user_img;
                signature = result[0].signature;
                //检索好友列表--若已添加好友，则返回该用户已添加
                var sql2 = 'SELECT fid FROM dy_friend WHERE uid=? AND user_id=?';
                pool.query(sql2, [uid, user_id], (err, result) => {
                    if (err) throw err;
                    if (result.length > 0) {
                        res.send({ code: -3, msg: '该用户已是您的好友' })
                    } else {
                        //插入friend;
                        var sql3 = 'INSERT INTO `dy_friend`(`fid`, `uid`, `user_id`, `fname`, `fpic`, `signature`) VALUES (null,?,?,?,?,?)'
                        pool.query(sql3, [uid, user_id, fname, fpic, signature], (err, result) => {
                            if (err) throw err;
                            if (result.affectedRows > 0) {
                                res.send({ code: 1, msg: '添加成功' });
                            } else {
                                res.send({ code: -1, msg: '添加失败' });
                            }
                        })
                    }
                })
            }
        })
    })
    //上传接口
var upload = multer({
    dest: 'upload/'
})
router.post('/uploadFile', upload.single('myvideo'), (req, res) => {
        var uid = req.session.uid; //1用户id
        if (!uid) {
            res.send({ code: -2, msg: '请先登录' })
            return;
        };
        if (!req.file) {
            console.log('err')
            return;
        }
        var user_name, user_pic; //2,3用户名
        var src; //4作品地址
        var title = req.body.title; //5作品标题
        if (!title) title = '暂无标题'
        var like_num = req.body.like_num; //6点赞数    初始为 0
        if (!like_num) like_num = 0;
        var kind = req.body.kind; //7类名
        if (!kind) kind = '文化';
        var kid; //8类id
        if (kind == '美食') kid = 1;
        if (kind == '景点') kid = 2;
        if (kind == '文化') kid = 3;
        if (kind == '玩乐') kid = 4;
        if (kind == '酒店') kid = 5;
        if (kind == '购物') kid = 6;
        //限制文件大小
        var fileSize = req.file.size / 1024 / 1024;
        if (fileSize > 50) {
            res.send({ code: -1, msg: '您的文件过大' });
            return;
        }
        //限制文件类型
        var type = req.file.mimetype;
        if (type.indexOf('video') == -1) {
            res.send({ code: -1, msg: '您的文件类型不相符' });
            return;
        }
        var src = req.file.originalname;
        //重新命名 -时间+随机数+后缀
        var time = new Date().getTime();
        var radom = Math.floor(Math.random() * 999);
        var suff = src.substring(src.lastIndexOf('.'));
        var indexEnd = __dirname.lastIndexOf('r') - 1;
        var des = __dirname.slice(0, indexEnd) + '/public/video/' + time + radom + suff;
        src = 'video/' + time + radom + suff; //文件地址
        var sql1 = 'SELECT user_name,user_img FROM dy_user WHERE uid=?'
        pool.query(sql1, [uid], (err, result) => {
                if (err) throw err;
                if (result.length > 0) {
                    //把获得的用户信息赋该变量
                    user_name = result[0].user_name;
                    user_pic = result[0].user_img;
                    //插入入作品
                    var sql2 = 'INSERT INTO `dy_works_list`(`lid`, `uid`, `src`, `title`, `user_pic`, `user_name`, `like_num`, `kind`, `kid`) VALUES (null,?,?,?,?,?,?,?,?)';
                    pool.query(sql2, [uid, src, title, user_pic, user_name, like_num, kind, kid], (err, result) => {
                        if (err) throw err;
                        if (result.affectedRows > 0) {
                            fs.renameSync(req.file.path, des);
                            res.send({ code: 1, msg: '上传成功' });
                        } else {
                            res.send({ code: -1, msg: '上传失败' });
                        }
                    })

                }
            })
            //从临时存放目录诺入指定目录

    })
//获取评论内容
router.get('/comment',(req,res)=>{
    var lid = req.query.lid;
    var move = 0;
    var obj = {code:1};
    var sql1 = 'SELECT * FROM dy_comment WHERE lid = ?';
    pool.query(sql1,[lid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            move+=50;
            obj.data = result;
            if(move==100){
                res.send(obj)
            }
        }else{
            move+=50;
            obj.code=-1;
            obj.data = [];
            if(move==100){
                res.send(obj)
            }
        }
    })
    var sql2 = 'SELECT COUNT(lid) count FROM dy_comment WHERE lid = ?';
    pool.query(sql2,[lid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            move+=50;
            obj.count = result[0].count;
            if(move==100){
                res.send(obj)
            }
        }else{
            move+=50;
            obj.count = 0;
            if(move==100){
                res.send(obj)
            }
        }
    })
})
//插入评论内容
router.get('/insetcmt',(req,res)=>{
    var uid = req.session.uid; //1用户id
    if (!uid) {
        res.send({ code: -2, msg: '请先登录' })
        return;
    };
    var lid  = req.query.lid;    //必选
    var content = req.query.content;   //必选
    var user_name,user_img;
    //获得不同用户详情---（用户名，用户图片）
    var sql1 = 'SELECT user_name,user_img FROM dy_user WHERE uid=?'
    pool.query(sql1,[uid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            user_name = result[0].user_name;
            user_img = result[0].user_img;
            var sql2 = 'INSERT INTO `dy_comment`(`mid`,`lid`,`uid`,`user_name`,`user_img`,`content`) VALUES(null,?,?,?,?,?)';
            pool.query(sql2,[lid,uid,user_name,user_img,content],(err,result)=>{
                if(err) throw err;
                if(result.affectedRows>0){
                    res.send({code:1, msg:'评论成功'})
                }else{
                    res.send({code:-1, msg:'评论失败'})
                }
            })
        }
    })
})

//退出登录接口
router.get('/logout', (req, res) => {
    req.session.destroy(function(err) {
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
