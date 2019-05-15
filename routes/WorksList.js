const express = require('express');
const pool = require('../pool.js')
var router = express.Router();
//作品列表接口
router.get('/',(req,res)=>{
	var pno = req.query.pno;
	var pageSize = req.query.pageSize;
	if(!pno) pno = 1;
	if(!pageSize) pageSize = 6;
	var offset = (pno-1)*pageSize;
	var obj = {code:1};
	var move = 0;
	var sql1 = 'SELECT * FROM dy_works_list LIMIT ?,?'
	pool.query(sql1,[offset,pageSize],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			move+=50
			obj.data=result
			if(move==100){
				res.send(obj);
			}
		}
	});
	var sql2 = 'SELECT count(lid) AS c FROM dy_works_list';
	pool.query(sql2,(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			move+=50
			obj.pageCount = Math.ceil(result[0].c/6);
			if(move==100){
				res.send(obj);
			}
		}
	})
})
//作品详情
router.get('/details',(req,res)=>{
	var lid = req.query.lid;
	var sql = 'SELECT * FROM dy_works_list WHERE lid=?';
	pool.query(sql,[lid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send({code:1,data:result});
		}
	})
})
//更新like_num
router.get('/like',(req,res)=>{
	var lid = req.query.lid;
	var like_num = req.query.like_num;
	var sql = 'UPDATE dy_works_list SET like_num=? WHERE lid=?';
	pool.query(sql,[like_num,lid],(err,result)=>{
		if(err) throw err;
		if(result.affectedRows>0){
			res.send({code:1,msg:'suc'});
		}else{
			res.send({code:-1,msg:'err'});
		};
	});
});
module.exports=router;
