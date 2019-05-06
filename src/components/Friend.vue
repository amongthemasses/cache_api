<template lang="html">
    <div class="app-friend">
        <header id="header" class="mui-bar mui-bar-transparent">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
            <h1 class="mui-title">
                <span class="t-item" :class="nav===1 ? 'active' : '' " @click="showList">好友列表</span>
                <span class="t-item" :class="nav===2 ? 'active' : '' " @click="showFind">发现好友</span>
            </h1>
        </header>
        <div class="content">
            <div class="friend-list" v-if="this.nav===1">
                <p>我的好友（互相关注）</p>
                <ul class="list-content">
                    <li class="list-item" v-for="(cell,i) of listFriend" :key="i">
                        <div class="img-box">
                            <img src="../img/yhm.png" :src="cell.fpic" alt="" class="item-img">
                        </div>
                        <div class="item-content">
                            <h4 class="fontColor" v-text="cell.fname"></h4>
                            <p v-text="cell.signature">这个人很懒</p>
                        </div>
                        <span class="mui-icon mui-icon-chatbubble"></span>
                    </li>
                </ul>
                <p class="list-msg" v-show="code">暂无好友</p>
            </div>
            <div class="friend-find" v-if="this.nav===2">
                <div class="search-box">
                        <input type="text" name="kwors" class="search" placeholder="搜索好友/手机/用户名" v-model="kw">
                </div>
                <ul class="find-add">
                    <li class="add-item">
                        <a href="javascript:;" class="add-link"><span class="amui-icon mui-icon-extra mui-icon-extra-sweep"></span>
                            <span class="add-content">扫一扫添加好友</span>
                        </a>
                    </li>
                    <li class="add-item">
                        <a href="javascript:;" class="add-link"><span class="amui-icon mui-icon mui-icon-reload"></span>
                            <span class="add-content">面的面添加好友</span>
                        </a>
                    </li>
                </ul>
                <ul class="list-content">
                    <li class="list-item">
                        <div class="img-box wx-bg">
                            <span class="mui-icon mui-icon-weixin"></span>
                        </div>
                        <div class="item-content">
                            <h4 class="item-name">快速添加微信好友</h4>
                        </div>
                    </li>
                    <li class="list-item">
                        <div class="img-box qq-bg">
                            <span class="mui-icon mui-icon-qq"></span>
                        </div>
                        <div class="item-content">
                            <h4 class="item-name">快速添加QQ好友</h4>
                        </div>
                    </li>
                </ul>
                <div class="all-rmd" v-show="hiden">
                    <h4 class="rmd-title">全部推荐</h4>
                    <h4 class="rmd-content">
                        <p class="rmd-item">暂时没有更多了</p>
                    </h4>
                </div>
                <div class="search-friend" v-show="!hiden">
                    <ul class="list-content">
                        <li class="list-item" v-for="(cell,i) of listSearch" :key="i">
                            <div class="img-box">
                                <img src="../img/yhm.png" :src="cell.user_img" alt="" class="item-img">
                            </div>
                            <div class="item-content">
                                <h4 class="fontColor" v-text="cell.user_name"></h4>
                                <p v-text="cell.signature">这个人很懒</p>
                            </div>
                            <a href="javascript:;" class="search-btn">关注</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            nav:1,
            listFriend:[],
            code:false,
            kw:'',
            hiden:true,
            listSearch:[]
        }
    },
    created(){
        this.loadFriend()
    },
    methods:{
        searchFriend(){
            var url = `${this.host}user/search?kw=${this.kw}`;
            this.axios.get(url,{
                params:{}
            }).then(res=>{
                if(res.data.code===-2){
                    this.$toast(res.data.msg);
                    return;
                }else if(res.data.code===-1){
                    this.hiden=true;
                    return;
                }else if(res.data.code===1){
                    this.hiden=false;
                    this.listSearch=res.data.data;
                    return;
                }

            })
        },
        loadFriend(){
            var url = `${this.host}user/friend`
            this.axios.get(url,{
                params:{}
            }).then(res=>{
                if(res.data.code==-2){
                    this.$toast(res.data.msg);
                    return;
                }else if(res.data.code==-1){
                    this.code=true;
                    return;
                };
                this.listFriend = res.data.data;
            });
        },
        showFind(){
            this.nav=2;
        },
        showList(){
            this.nav=1;
        }
    },
    watch:{
        kw(){
            this.searchFriend()
        }
    }
}
</script>

<style lang="css" scoped>
.fontColor{
    color:#fff;
    font-size:16px;
}
.app-friend .mui-bar{
    border-bottom: 1px solid rgba(0,0,0,0.1);
}
.app-friend .mui-title{
    color:#999;
    display: flex;
    justify-content: center;
}
.app-friend .mui-title .t-item{
    margin: 0 .7rem;
}
.active{
    color: #fff;
    border-bottom: 1px solid #ffc107;
}
.app-friend .content{
    padding: 4rem 1rem;
    display: flex;
    flex-direction: column;
}
.app-friend .list-content{
    width:100%;
    padding:0;
}
.app-friend .list-content .list-item{
    width:100%;
    height: 5rem;
    padding:1rem 0;
    position: relative;
}
.app-friend .list-content .img-box{
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    display: inline-block;
    float:left;
}
.app-friend .list-content .item-img{
    width:100%;
    height: 3rem;
    border-radius: 50%
}
.app-friend .list-content .item-content{
    padding:0 1rem;
    overflow: hidden;
}
.app-friend .mui-icon-chatbubble{
    font-size:25px;
    font-weight:bold;
    color: #fff;
    position: absolute;
    top:33%;
    right: 0;
}
.app-friend .list-msg{
    text-align: center;
    font-size: 16px;
}
.app-friend .search-box .search{
    height: 2.2rem;
    margin-bottom: 0;
    background: rgba(102, 102, 102, .2);
}
.app-friend .find-add{
    list-style: none;
    margin-bottom: 0;
    padding: 1rem 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0,0,0,.1);
}
.app-friend  .add-link,.app-friend .item-name{
    color:inherit;
    font-size: 16px;
}
.app-friend  .add-link span.amui-icon{
    font-size:25px;
    color: #fff;
    margin-right: .4rem;
    vertical-align: middle;
}
.app-friend .friend-find .list-content{
    border-bottom: 1px solid rgba(0,0,0,.1);
}
.app-friend .friend-find .img-box{
    width: 2.5rem;
    height: 2.5rem;
    text-align: center;
}
.app-friend .friend-find .wx-bg{
    background: #0f0;
}
.app-friend .friend-find .qq-bg{
    background: #0af;
}
.app-friend .friend-find .item-content{
    color: #999;
    padding: .5rem .5rem;
}
.app-friend .friend-find .mui-icon{
    padding-top: .3rem;
    font-size: 30px;
    color: #fff;
}
.app-friend .friend-find .rmd-title{
    color:#fff;
    font-size: 17px;
}
.app-friend .friend-find .rmd-content{
    text-align: center;
}
.app-friend .friend-find .rmd-item{
    font-size: 16px;
}
.app-friend .search-btn{
    padding: .2rem .5rem;
    color: #fff;
    background: #09f;
    border-radius: .2rem;
    position: absolute;
    right:0;
    bottom: 18%;
}
</style>
