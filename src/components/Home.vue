<template>
    <div class="app-home">
    	<header id="header" class="mui-bar mui-bar-transparent">
            <!-- <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a> -->
            <h1 class="mui-title">首页</h1>
        </header>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/kind/1">
                    <div class="icon-box bg-f">
                        <span class="mui-icon-extra mui-icon-extra-cate fontColor"></span>
                    </div>
                    <div class="mui-media-body">美食</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/kind/2">
                    <div class="icon-box bg-j">
                        <span class="mui-icon-extra mui-icon-extra-holiday fontColor"></span>
                    </div>
                    <div class="mui-media-body">景点</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/kind/3">
                    <div class="icon-box bg-w">
                        <span class="mui-icon mui-icon-star fontColor"></span>
                    </div>
                    <div class="mui-media-body">文化</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/kind/4">
                    <div class="icon-box bg-p">
                        <span class="mui-icon-extra mui-icon-extra-cold fontColor"></span>
                    </div>
                    <div class="mui-media-body">玩乐</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/kind/5">
                    <div class="icon-box bg-d">
                        <span class="mui-icon-extra mui-icon-extra-hotel fontColor"></span>
                    </div>
                    <div class="mui-media-body">酒店</div></router-link></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/kind/6">
                    <div class="icon-box bg-g">
                        <span class="mui-icon-extra mui-icon-extra-cart fontColor"></span>
                    </div>
                    <div class="mui-media-body">购物</div></router-link></li>
        </ul>
        <my-workslist></my-workslist>
    </div>
</template>
<script>
import myWorkslist from '@/components/WorksList.vue'
export default{
	 data(){
	 	return{

	 	}
	 },
     components:{
        myWorkslist
     }
}
</script>
<style scoped>
.app-home .mui-bar-transparent{
    background:rgba(0,0,0,0.5);
}
.app-home .mui-title{color:#fff;}
.app-home .mui-table-view{
    padding-top:2rem;
}
.app-home .mui-table-view{
    background:transparent;
}
.app-home .mui-table-view .mui-table-view-cell{
    border:0;
}
.app-home .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body,.mui-bar-tab span,header h1{
    color:#999;
}
.app-home .mui-grid-view.mui-grid-9 .mui-media .icon-box{
    width: 3rem;
    height: 3rem;
    margin: 0 auto;
    border-radius: .5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.bg-f{ background: #e42566; }
.bg-j{ background: #41c146; }
.bg-w{ background: #2196f3; }
.bg-p{ background: #9c27b0; }
.bg-d{ background: #1a517e; }
.bg-g{ background: #f40; }
.app-home .mui-grid-view.mui-grid-9 .mui-media .fontColor{
    font-size: 30px;
    color: #fff;
}
.app-home .mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3.mui-active{
    background:transparent;
}
.app-home .mui-table-view span{
    border-radius:5px;
}
</style>
