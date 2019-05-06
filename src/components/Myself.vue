<template lang="html">
    <div class="app-myself">
        <div class="login-hide" v-if="!loginCode">
            <header id="header" class="mui-bar mui-bar-transparent">
                <h1 class="mui-title">用户登录</h1>
            </header>
            <form action="#">
                <input type="text" class="uname inputs" placeholder="请输入用户名" v-model="uname">
                <input type="password" class="upwd inputs" placeholder="请输入登录密码" v-model="upwd">
                <input type="button" value="登录" @click="loadLogin" class="login-btn">
            </form>
        </div>
        <div v-if="loginCode" class="login-show">
            <div class="bg-box">
                <img src="../img/1.jpg" alt="" class="bg-img">
            </div>
            <div class="my-details">
                <div class="img-box">
                    <img src="../assets/img/menu3.png" alt="" class="my-img">
                    <div class="btn-box">
                        <a href="javascript:;">
                            <span class="lbtn" @click="removeLogin">注销</span>
                        </a>
                    </div>
                </div>
                <!-- 用户信息 -->
                <div class="details-user">
                    <h4 class="user-name" v-text="user.user_name"></h4>
                    <p class="user-title">当悦号：{{user.phone}}</p>
                </div>
                <div class="icon-box">
                    <p v-text="user.signature">这个人很懒什么都没留下</p>
                    <span class="icon-item">西安</span>
                    <span class="icon-item">小哥哥</span>
                    <span class="icon-item">喜欢女,爱好女</span>
                </div>
                <div class="group">
                    <span class="group-item"><strong v-text="count">0</strong>获赞</span>
                    <span class="group-item"><strong>7</strong>关注</span>
                    <span class="group-item"><strong>4</strong>粉丝</span>
                </div>
                <ul class="list-navbar">
                    <li class="list-item" :class="navCode==true ? 'active': ' ' " @click="showWorks">
                        <span class="item-child">我的作品</span>
                    </li>
                    <li class="list-item" :class="navCode==false ? 'active': ' ' " @click="showKeep">
                        <span class="item-child">我的收藏</span>
                    </li>
                </ul>
            </div>
            <div class="list-content">
                <div class="list-works" v-if="navCode">
                    <div class="works-list">
                        <!-- 作品类表 -->
                        <div class="works-item" v-for="item of list">
                            <router-link to="" class="works-link">
                                <video :src="item.src" class="link-icon">
                                </video>
                            </router-link>
                            <div class="works-icon">
                                <span class="mui-icon-extra mui-icon-extra-heart-filled"></span>
                                <span>1赞</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list-keep" v-if="!navCode">
                    text2
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            loginCode: false,       //登录控制
            navCode: true,      //navbar控制
            uname:'',       //input
            upwd:'',       //input
            code:1,      //页面实际监控session-控制
            num:0,
            user:{},
            count:0,
            list:[]
        }
    },
    created(){
        this.setTime();
        // this.loadDetail();
    },
    updated(){
        this.loadDetail();
    },
   watch:{
       //实时监听登录状态
       code(){
            var s = sessionStorage.getItem('uid');
            if(!s){
                this.loginCode = false;
            }else{
                this.loginCode = true;
            }
       }
   },
    methods:{
        //请求个人详情
        loadDetail(){
            if(this.loginCode){
                this.num+=1;
                if(this.num<2){
                    var url = this.host+'user/details';
                    this.axios.get(url,{
                        params:{
                            uid:sessionStorage.getItem('uid')
                        }
                    }).then(res=>{
                        // console.log(res.data);
                        this.user = res.data.user;
                        this.count = res.data.count;
                        this.list = res.data.data;
                    })
                }

            }
        },
        //监听登录状态控制
        setTime(){
            setInterval(() => {
                if(this.code < 0){
                    this.code++;
                }else{
                    this.code--;
                }
            }, 1);
        },
        //注销登录
        removeLogin(){
            sessionStorage.removeItem('uid');
            var url = this.host+'user/logout';
            console.log(url);
            this.axios.get(url,{
                params:{}
            }).then((res)=>{
                console.log(res);
            })
        },
        //登录
        loadLogin(){
            var nreg = /^\w{3,8}$/
            if(!nreg.test(this.uname)){
                this.$toast('用户名格式不正确');
                return;
            }
            var preg = /^\d{3,8}$/
            if(!preg.test(this.upwd)){
                this.$toast('密码格式不正确')
                return;
            }
            var url = this.host+'user/login';
            this.axios.get(url,{
                params:{
                    uname:this.uname,
                    upwd:this.upwd
                }
            }).then(res=>{
                var code = res.data.code;
                if(code!=-1){
                    this.$toast('登录成功');
                    var $uid = res.data.data[0].uid;
                    sessionStorage.setItem('uid',$uid);
                }else{
                    this.$toast('用户名与密码不匹配');
                }
            })
        },
        //登录状态控制
        showWorks(){
            this.navCode = true;
        },
        showKeep(){
            this.navCode = false;
        }
    }
}
</script>

<style lang="css" scoped>
.app-myself .login-hide{
    padding: 10rem 1rem;
    text-align: center;
}
.app-myself .login-hide h1{
    color: #fff;
}
.app-myself .inputs,.app-myself .login-btn{
    background: rgba(0, 0, 0, .4);
    border: 0;
    border-radius: .5rem;
}
.app-myself .login-btn{
    color: #fff;
    padding: .6rem 3rem;
}
.app-myself .bg-box{
    width: 100%;
    height: 12rem;
    border-bottom: .1rem solid rgba(0, 0, 0, .5);
}
.app-myself .bg-box .bg-img{
    width: 100%;
    height:100%;
}
.app-myself .my-details{
    background: rgba(0, 0, 0, .5);
    padding: 0rem 1rem;
    padding-top: 6rem;
    position: relative;
}
.app-myself .my-details .img-box{
    width: 100%;
    height: 7rem;
    position: absolute;
    top: -1.5rem;
}
.app-myself .my-details .my-img{
    width: 7rem;
    height: 100%;
    border: .2rem solid rgba(0, 0, 0, .5);
    border-radius: 50%;
}
.app-myself .my-details .btn-box{
    display: inline-block;
    position: absolute;
    top: 3rem;
    right: 2rem;
}
.app-myself .my-details .lbtn{
    font-size: 17px;
    color: #fff;
    background: rgba(102,102,102,.5);
    border-radius: .2rem;
    padding: .3rem .7rem;
}
.app-myself .my-details .details-user{
    border-bottom: .05rem solid rgba(102,102,102,.5);
    margin-bottom: .5rem;
}
.app-myself .my-details .user-name{
    color: #fff;
    margin: .5rem 0;
}
.app-myself .my-details .user-title{
    font-size: 10px;
    color: #fff;
}
.app-myself .my-details .icon-box .icon-item{
    font-size: 10px;
    margin: 0 .2rem;
    padding: .3rem .5rem;
    border-radius: .2rem;
    background: rgba(102,102,102,.5);
}
.app-myself .my-details .group{
    margin: 1rem 0;
}
.app-myself .my-details .group-item{
    margin: .5rem;
    color: #fff;
    font-size: 16px;
}
.app-myself .list-navbar{
    padding: 0;
    margin-bottom: 0;
    list-style: none;
    display: flex;
    justify-content: center;
}
.app-myself .list-item{
    padding: .5rem;
}
.app-myself .list-item.active{
    color: #fff;
    border-bottom: 1px solid #ffc107;
}
.app-myself .list-content{
    margin-top: .1rem;
}
.app-myself  .list-content .works-list{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.list-content .works-list .works-item{
    width: 49.5%;
    height: 12rem;
    background: #000;
    margin-bottom: .1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
}
.list-content .works-list .works-link,.list-content .works-list .works-link .link-icon{
    width: 100%;
    display: block;
}
.list-content .works-list .works-icon{
    color: #fff;
    font-size: 16px;
    z-index: 1;
    position: absolute;
    left: .5rem;
    bottom: .5rem;
}

</style>
