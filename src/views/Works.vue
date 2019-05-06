<template>
	<div class="app-works">
		<header id="header" class="mui-bar mui-bar-transparent">
			<a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
			<h1 class="mui-title">推荐 | 西安</h1>
		</header>
		<div class="works-body" :style="{height:(curHeight-50)+'px'}">
			<div class="video-box">
				<video src="http://127.0.0.1:3000/video/01.mp4" controls class="video"></video>
				<img src="/icon-img/play.png" alt="" class="video-icon">
			</div>
		</div>
	</div>
</template>
<script>
	export default{
		props:['lid'],
		data(){
			return{
				curHeight:document.documentElement.clientHeight
			}
		},
		created(){

		},
		methods:{

		},
	}
</script>
<style scoped>
.app-works .mui-bar-transparent{
    background:rgba(0,0,0,0.5);
}
.app-works .mui-bar-transparent h1{
	color: #fff;
}
.app-works .video-box{
	padding: 5rem 0;
	height: 25rem;
	background: #000;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	justify-content: center;
	position: relative;
}
.app-works .video{
	width:100%;
}
.app-works .video-icon{
	width: 3rem;
	height: 3rem;
	margin-top: -1.5rem;
	margin-left: -1.5rem;
	opacity: .3;
	position: absolute;
	top:50%;
	left: 50%;
}
.app-works .works-body{
	display: flex;
	flex-direction: column;
	justify-content: center;
}
</style>
