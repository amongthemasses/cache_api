<template>
	<div class="app-worksList">
		<div class="app-list d-flex flex-wrap">
			<div class="item w-50 p-1" v-for="(cell,i) of worksList" :kye="i">
				<div @click="toWorks(cell.lid)">
					<video :src="cell.src" width="100%" height="200" class="bg-video"></video>
				</div>
				<div class="pl-2 pr-2">
					<p class="m-0" v-text="cell.title"></p>
					<ul class="d-flex justify-content-between list-unstyled w-100 mt-2 mb-2">
						<li>
							<router-link :to="`/works/${cell.uid}`">
								<img :src="cell.user_pic">
								<span v-text="cell.user_name"></span>
							</router-link>
						</li>
						<li>
							<a><span class="mui-icon-extra mui-icon-extra-heart-filled"></span></a>
							<span v-text="cell.like_num">12</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<mt-button type="primary" size="large" @click="loading">加载更多</mt-button>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				worksList:'',
				pno:1,
				move:true
			}
		},
		created(){
			var url = this.host+'worksList?pno='+this.pno;
			this.axios.get(url,{
				params:{}
			}).then(res=>{
				this.worksList=res.data.data;
			})
		},
		methods:{
			loading(){
				if(this.move==false){
					this.$toast('已经到底了-_-');
					return;
				}
				this.pno++;
				var url = this.host+'worksList?pno='+this.pno;
				this.axios.get(url,{
					params:{}
				}).then(res=>{
					var rows = this.worksList.concat(res.data.data);
					this.worksList=rows;
					if(this.pno==res.data.pageCount){
						this.move=false;
					}
				})
			},
			toWorks(e){
				this.$router.push(`/works/${e}`)
			}
		}
	}
</script>
<style scoped>
.app-worksList .mint-header{
	position: fixed;
	background:rgba(0,0,0,0.4);
	width:100%;
}
.app-worksList .item p{
	height:3em;
}
.app-worksList .item .bg-video{
	background:#000;
}
.app-worksList .item ul img{width:1.5rem;border-radius: 100%;}
.app-worksList div.app-list a{ text-decoration: none; color:#fff;}
.app-worksList .item .mui-icon-extra{font-size:16px;}
</style>
