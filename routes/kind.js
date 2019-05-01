const express = require('express');
const pool = require('../pool.js')
var router = express.Router();
//获取kind动态数据
router.get('/',(req,res)=>{
	var kid = req.query.kid;
	var move = 0;
	var obj = {code:1};
	var sql1 = 'SELECT pic FROM dy_swipe WHERE kid=?'
	pool.query(sql1,[kid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			move+=50;
			obj.img=result;
			if(move==150) res.send(obj);
		}
	});
	var sql2 = 'SELECT * FROM dy_recommend WHERE kid=?'
	pool.query(sql2,[kid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			move+=50;
			obj.rmd=result;
			if(move==150) res.send(obj);
		}
	});
	var sql3 = 'SELECT * FROM dy_works_list WHERE kid=? ORDER BY like_num DESC';
	pool.query(sql3,[kid],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			move+=50;
			obj.data=result;
			if(move==150) res.send(obj);
		}
	});
})

module.exports=router;