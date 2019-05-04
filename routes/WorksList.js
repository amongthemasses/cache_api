const express = require('express');
const pool = require('../pool.js')
var router = express.Router();

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
	var sql = 'SELECT * FROM dy_works WHERE lid=?';
	pool.query(sql,[lid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send({code:1,data:result});
		}
	})

})
module.exports=router;