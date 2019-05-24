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
INSERT INTO dy_user VALUE(NULL,'liubin1',md5('123456'),'lb18740599813@126.com','12345678912','会游泳的鱼','imgs/userheader/01.png','612501199505150312','遨游在只是的海洋里结果--丢了');
INSERT INTO dy_user VALUE(NULL,'liubin2',md5('123456'),'lb18740599813@126.com','15389415660','住店的猫','imgs/userheader/02.png','612501199505150312','什么都是垃圾,只有唯有小鱼干');
INSERT INTO dy_user VALUE(NULL,'liubin3',md5('123456'),'lb18740599813@126.com','15389415660','爱玩的狗熊','imgs/userheader/03.png','612501199505150312','我只喜欢吃狗粮');
INSERT INTO dy_user VALUE(NULL,'liubin4',md5('123456'),'lb18740599813@126.com','15389415660','痞子国宝','imgs/userheader/05.png','612501199505150312','我只喜欢吃狗粮');
INSERT INTO dy_user VALUE(NULL,'liubin5',md5('123456'),'lb18740599813@126.com','15389415660','今天不开心','imgs/userheader/05.png','612501199505150312','我只喜欢吃狗粮');
INSERT INTO dy_user VALUE(NULL,'liubin6',md5('123456'),'lb18740599813@126.com','15389415660','凑活凑乎','imgs/userheader/06.png','612501199505150312','我只喜欢吃狗粮');

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
INSERT INTO dy_works_list VALUES(NULL,1,'video/01.mp4','已经脱坑单还是怀念','imgs/userheader/01.png','会游泳的鱼','15','美食',1);
INSERT INTO dy_works_list VALUES(NULL,1,'video/01.mp4','闲来无事','imgs/userheader/01.png','会游泳的鱼','15','美食',1);
--
-- ##类轮播图
CREATE TABLE dy_swipe(
	id INT PRIMARY KEY AUTO_INCREMENT,
	kid INT,
	pic VARCHAR(200)
);
--美食
INSERT INTO dy_swipe VALUES(NULL,1,'imgs/kind/food/swipe1.png');
INSERT INTO dy_swipe VALUES(NULL,1,'imgs/kind/food/swipe2.png');
INSERT INTO dy_swipe VALUES(NULL,1,'imgs/kind/food/swipe3.png');
INSERT INTO dy_swipe VALUES(NULL,1,'imgs/kind/food/swipe4.png');
--景点
INSERT INTO dy_swipe VALUES(NULL,2,'imgs/kind/landscape/swipe1.png');
INSERT INTO dy_swipe VALUES(NULL,2,'imgs/kind/landscape/swipe2.png');
INSERT INTO dy_swipe VALUES(NULL,2,'imgs/kind/landscape/swipe3.png');
INSERT INTO dy_swipe VALUES(NULL,2,'imgs/kind/landscape/swipe4.png');
INSERT INTO dy_swipe VALUES(NULL,2,'imgs/kind/landscape/swipe5.png');
--文化
INSERT INTO dy_swipe VALUES(NULL,3,'imgs/kind/culture/swipe1.png');
INSERT INTO dy_swipe VALUES(NULL,3,'imgs/kind/culture/swipe2.png');
INSERT INTO dy_swipe VALUES(NULL,3,'imgs/kind/culture/swipe3.png');
INSERT INTO dy_swipe VALUES(NULL,3,'imgs/kind/culture/swipe4.png');
--玩乐
INSERT INTO dy_swipe VALUES(NULL,4,'imgs/kind/play/swipe1.png');
INSERT INTO dy_swipe VALUES(NULL,4,'imgs/kind/play/swipe2.png');
INSERT INTO dy_swipe VALUES(NULL,4,'imgs/kind/play/swipe3.png');
INSERT INTO dy_swipe VALUES(NULL,4,'imgs/kind/play/swipe4.png');
--酒店
INSERT INTO dy_swipe VALUES(NULL,5,'imgs/kind/hotel/swipe1.png');
INSERT INTO dy_swipe VALUES(NULL,5,'imgs/kind/hotel/swipe2.png');
INSERT INTO dy_swipe VALUES(NULL,5,'imgs/kind/hotel/swipe3.png');
INSERT INTO dy_swipe VALUES(NULL,5,'imgs/kind/hotel/swipe4.png');
--购物
INSERT INTO dy_swipe VALUES(NULL,6,'imgs/kind/shopping/swipe1.png');
INSERT INTO dy_swipe VALUES(NULL,6,'imgs/kind/shopping/swipe2.png');
INSERT INTO dy_swipe VALUES(NULL,6,'imgs/kind/shopping/swipe3.png');
INSERT INTO dy_swipe VALUES(NULL,6,'imgs/kind/shopping/swipe4.png');
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
--景点
INSERT INTO dy_recommend VALUES(NULL,2,'Spacelab失重餐厅','imgs/kind/landscape/1.jpg','暂无评分','东大街110米');
INSERT INTO dy_recommend VALUES(NULL,2,'米其林餐厅','imgs/kind/landscape/2.jpg','暂无评分','南大街110米');
INSERT INTO dy_recommend VALUES(NULL,2,'星巴克餐厅','imgs/kind/landscape/3.jpg','暂无评分','西大街110米');
--文化
INSERT INTO dy_recommend VALUES(NULL,3,'Spacelab失重餐厅','imgs/kind/culture/1.jpg','暂无评分','东大街110米');
INSERT INTO dy_recommend VALUES(NULL,3,'米其林餐厅','imgs/kind/culture/2.jpg','暂无评分','南大街110米');
INSERT INTO dy_recommend VALUES(NULL,3,'星巴克餐厅','imgs/kind/culture/3.jpg','暂无评分','西大街110米');
--玩乐
INSERT INTO dy_recommend VALUES(NULL,4,'Spacelab失重餐厅','imgs/kind/play/1.jpg','暂无评分','东大街110米');
INSERT INTO dy_recommend VALUES(NULL,4,'米其林餐厅','imgs/kind/play/2.jpg','暂无评分','南大街110米');
INSERT INTO dy_recommend VALUES(NULL,4,'星巴克餐厅','imgs/kind/play/3.jpg','暂无评分','西大街110米');
--酒店
INSERT INTO dy_recommend VALUES(NULL,5,'Spacelab失重餐厅','imgs/kind/hotel/1.jpg','暂无评分','东大街110米');
INSERT INTO dy_recommend VALUES(NULL,5,'米其林餐厅','imgs/kind/hotel/2.jpg','暂无评分','南大街110米');
INSERT INTO dy_recommend VALUES(NULL,5,'星巴克餐厅','imgs/kind/hotel/3.jpg','暂无评分','西大街110米');
--购物
INSERT INTO dy_recommend VALUES(NULL,6,'Spacelab失重餐厅','imgs/kind/shopping/1.jpg','暂无评分','东大街110米');
INSERT INTO dy_recommend VALUES(NULL,6,'米其林餐厅','imgs/kind/shopping/2.jpg','暂无评分','南大街110米');
INSERT INTO dy_recommend VALUES(NULL,6,'星巴克餐厅','imgs/kind/shopping/3.jpg','暂无评分','西大街110米');

-- ##好友类表
CREATE TABLE dy_friend(
	fid INT PRIMARY KEY AUTO_INCREMENT,
	uid INT,
	user_id INT,
	fname VARCHAR(100),
	fpic VARCHAR(200),
	signature VARCHAR(100)
);

--##聊天表
CREATE TABLE dy_chat(
	cid INT PRIMARY KEY AUTO_INCREMENT,
	uid INT,
	msg VARCHAR(200),
	user_name VARCHAR(50),
	user_img VARCHAR(200)
);
--##评论表
CREATE TABLE dy_comment(
	mid INT PRIMARY KEY AUTO_INCREMENT,
	lid INT,
	uid INT,
	user_name VARCHAR(50),
	user_img VARCHAR(200),
	content VARCHAR(200)
);
