<template>
	<div class="app-food">
		<header id="header" class="mui-bar mui-bar-transparent">
	    <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
	    <h1 class="mui-title" v-text="header"></h1>
    	</header>
	    <mt-swipe :auto="4000" :show-indicators="false">
	    	<mt-swipe-item v-for="(cell,i) of imgs" :key="i">
	    		<img :src="cell.pic">
	    	</mt-swipe-item>
	    </mt-swipe>
      <div class="food-list">
          <div>
              <p class="mt-3">热门推荐</p>
          </div>
          <ul class="list-unstyled">
              <li class="mt-2 list-item" v-for="(cell,i) of rmds" :key="i">
                  <a href="javascript:;" class="d-block">
                      <img :src="cell.pic" alt="" class="float-left">
                      <div class="of-h">
                          <h5 class="m-0 mb-1" v-text="cell.title"></h5>
                          <p class="m-0" v-text="cell.score"></p>
                          <p class="m-0" v-text="cell.address"></p>
                      </div>
                  </a>
              </li>
          </ul>
      </div>
      	<div class="food-footr">
            <div>
                <p>热门视频</p>
            </div>
			<div class="food-works d-flex flex-wrap">
				<div class="item w-50 p-1" v-for="(cell,i) of list" :key="i">
						<div>
							<video :src="cell.src" width="100%" height="200" class="bg-video"></video>
						</div>
						<div class="pl-2 pr-2">
							<p class="m-0" v-text="cell.title"></p>
							<ul class="d-flex justify-content-between list-unstyled w-100 mt-2 mb-2">
								<li>
									<a>
										<img :src="cell.user_pic">
										<span v-text="cell.user_name"></span>
									</a>
								</li>
								<li>
									<a><span class="mui-icon-extra mui-icon-extra-heart-filled"></span></a>
									<span v-text="cell.like_num"></span>
								</li>
							</ul>
						</div>
					</div>
			</div>
      	</div>
	</div>
</template>
<script>
export default{
	props:['kid'],
	data(){
		return{
      		rmds:0,
      		imgs:0,
      		list:0,
			header:0
		}
	},
  	created(){
  		this.loadKind();
  	},
  	methods:{
	    loadKind(){
	      var url = `${this.host}kind`;
	      this.axios.get(url,{
	          params:{
				kid:this.kid
			  }
	      }).then(res=>{
	          this.imgs = res.data.img;
	          this.rmds = res.data.rmd;
	          this.list = res.data.data;
	          this.header = res.data.data[0].kind;
	      	})
	    }
	},
}
</script>
<style scoped>
.app-food a{
	color:#fff;
}
.app-food header,.app-food .mint-swipe,.app-food .food-list,.app-food .food-footr>div:first-child{
    padding:0 0.5rem;
}
.app-food .food-list>div:first-child>p,.app-food .food-footr>div:first-child>p{
    border-bottom: 1px solid rgba(0,0,0,0.1);
}
.app-food .mui-bar-transparent{
	background:rgba(0,0,0,0.5);
}
.app-food header>h1{
	color:#fff;
}
.app-food .mint-swipe{
	padding-top:3rem;
	height: 10rem;
}
.app-food .mint-swipe img{
    width:100%;
    height:100%;
}
.app-food .media-list .list-item{
    height:1rem;
}
.app-food .food-list img.float-left{
        width: 6rem;
        height: 4rem;
        margin-right: .5rem;
        border-radius: .5rem;
}
.app-food .of-h{
    overflow: hidden;
    height: 4rem;
}
.app-food .of-h>h5{
    color:#fff;
    font-size:16px;
}
.app-food .food-works .item p{
	height:3em;
}
.app-food .food-works .item .bg-video{
	background:#000;
}
.app-food .food-works .item ul img{width:1.5rem;border-radius: 100%;}
.app-food .food-works div.app-list a{ text-decoration: none; color:#fff;}
.app-food .food-works .item .mui-icon-extra{font-size:16px;}
</style>
