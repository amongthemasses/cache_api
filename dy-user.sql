SET NAMES UTF8;
DROP DATABASE IF EXISTS dy;
CREATE DATABASE dy CHARSET=UTF8;
USE dy;
CREATE TABLE dy_user(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	uname VARCHAR(20),
	upwd VARCHAR(50),
	email VARCHAR(100),
	phone VARCHAR(11),
	user_name VARCHAR(50),
	user_img VARCHAR(200),
	idcard VARCHAR(18),
	signature VARCHAR(200)
);
INSERT INTO dy_user VALUE(NULL,'liubin',md5('123456'),'lb18740599813@126.com','15389415660','会游泳的鱼','imgs/user_header/01.png','612501199505150312','遨游在只是的海洋里结果--丢了');
INSERT INTO dy_user VALUE(NULL,'Mswang',md5('123456'),'lb18740599813@126.com','15389415660','王先森','imgs/user_header/bg.png','612501199505150312','什么都是垃圾,只有唯有小鱼干');
INSERT INTO dy_user VALUE(NULL,'tom',md5('123456'),'lb18740599813@126.com','15389415660','不吃鱼的猫','imgs/user_header/11.png','612501199505150312','我只喜欢吃狗粮');

--##workslist表  //作品列表
 CREATE TABLE dy_works_list(
 	lid INT PRIMARY KEY AUTO_INCREMENT,
 	uid INT,
 	src VARCHAR(200),
 	title VARCHAR(100),
 	user_pic VARCHAR(500),
 	user_name VARCHAR(50),
 	like_num INT,
 	kind VARCHAR(50),
 	kid INT
 );
 -- 美食
INSERT INTO dy_works_list VALUES(NULL,1,'video/01.mp4','已经脱坑单还是怀念','imgs/user_header/01.png','会游泳的鱼','15','美食',1);
INSERT INTO dy_works_list VALUES(NULL,1,'video/01.mp4','闲来无事','imgs/user_header/01.png','会游泳的鱼','15','美食',1);
INSERT INTO dy_works_list VALUES(NULL,1,'video/01.mp4','看看都来看看','imgs/user_header/01.png','会游泳的鱼','11','美食',1);
INSERT INTO dy_works_list VALUES(NULL,1,'video/01.mp4','以钱赚钱啦！','imgs/user_header/01.png','会游泳的鱼','150','美食',1);
INSERT INTO dy_works_list VALUES(NULL,1,'video/01.mp4','有钱的碰个钱场','imgs/user_header/01.png','会游泳的鱼','120','美食',1);
INSERT INTO dy_works_list VALUES(NULL,1,'video/01.mp4','没钱的碰个人场','imgs/user_header/01.png','会游泳的鱼','119','美食',1);
INSERT INTO dy_works_list VALUES(NULL,1,'video/01.mp4','有事没事吊吊吊','imgs/user_header/01.png','会游泳的鱼','118','美食',1);
INSERT INTO dy_works_list VALUES(NULL,1,'video/01.mp4','大爷你确定你不玩了','imgs/user_header/01.png','会游泳的鱼','175','美食',1);
INSERT INTO dy_works_list VALUES(NULL,1,'video/01.mp4','我去，这么好玩，我要充钱','imgs/user_header/01.png','会游泳的鱼','105','美食',1);
INSERT INTO dy_works_list VALUES(NULL,1,'video/01.mp4','我是一只小奇遇','imgs/user_header/01.png','会游泳的鱼','175','美食',1);
INSERT INTO dy_works_list VALUES(NULL,1,'video/01.mp4','大哥我要冲钱','imgs/user_header/01.png','会游泳的鱼','1035','美食',1);
INSERT INTO dy_works_list VALUES(NULL,1,'video/01.mp4','别充钱，大哥带你玩','imgs/user_header/01.png','会游泳的鱼','1350','美食',1);
--
-- ##类轮播图
CREATE TABLE dy_swipe(
	id INT PRIMARY KEY AUTO_INCREMENT,
	kid INT,
	pic VARCHAR(200)
);
INSERT INTO dy_swipe VALUES(NULL,1,'imgs/kind/food/swipe1.png');
INSERT INTO dy_swipe VALUES(NULL,1,'imgs/kind/food/swipe2.png');
INSERT INTO dy_swipe VALUES(NULL,1,'imgs/kind/food/swipe3.png');
INSERT INTO dy_swipe VALUES(NULL,1,'imgs/kind/food/swipe4.png');
-- ##类推荐表
CREATE TABLE dy_recommend(
	rid INT PRIMARY KEY AUTO_INCREMENT,
	kid INT,
	title VARCHAR(100),
	pic VARCHAR(200),
	score VARCHAR(100),
	address VARCHAR(100)
);
-- 美食
INSERT INTO dy_recommend VALUES(NULL,1,'Spacelab失重餐厅','imgs/kind/food/1.jpg','暂无评分','东大街110米');
INSERT INTO dy_recommend VALUES(NULL,1,'米其林餐厅','imgs/kind/food/2.jpg','暂无评分','南大街110米');
INSERT INTO dy_recommend VALUES(NULL,1,'星巴克餐厅','imgs/kind/food/3.jpg','暂无评分','西大街110米');


-- ##好友类表
CREATE TABLE dy_friend(
	fid INT PRIMARY KEY AUTO_INCREMENT,
	uid INT,
	user_id INT,
	fname VARCHAR(100),
	fpic VARCHAR(200),
	signature VARCHAR(100)
);
INSERT INTO dy_friend VALUES(NULL,1,'2','王大鱼','imgs/user_header/bg.png','什么都是垃圾,只有唯有小鱼干');
INSERT INTO dy_friend VALUES(NULL,1,'3','tom','imgs/user_header/11.png','我只喜欢吃狗粮');
