<template lang="html">
    <div class="app-chatroom">
        <header id="header" class="mui-bar mui-bar-transparent">
            <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left" @click="chatColse"></a>
            <h1 class="mui-title">聊天室</h1>
        </header>
        <div class="chat-body">
            <div class="chat-box" v-for="(item,i) of msgArr">
                <ul class="chat-user">
                    <li class="user-img-box">
                        <img src="icon-img/QQ.jpg" alt="" class="user-img">
                    </li>
                    <li class="user-name">
                        <h4>用户名</h4>
                    </li>
                </ul>
                <div class="chat-content">
                    <div class="content-msg" v-text="item">吃饭、睡觉打豆豆瘦瘦高高规划设计开会时国际化是对方可根据</div>
                </div>
            </div>
        </div>
        <div class="send-box">
            <ul class="send-parent">
                <li class="input-box">
                    <input type="text" name="" value="" class="send-input" v-model="msg">
                </li>
                <li class="btn-box">
                    <span class="send-btn" @click="sendData">发送</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{
            msg:'',
            msgArr:[],
            socket:null,
            arr:''
        }
    },
    created(){
        this.acceptData()
    },
    updated(){
        var ele = document.querySelector('.chat-body')
        ele.scrollTop = ele.scrollHeight
    },
    methods:{
        chatColse(){
            this.socket.close();
        },
        sendData(){
            this.socket.send(this.msg);
            this.msg="";
        },
        acceptData(){  //接受数据
            var str='';
            this.socket = new WebSocket(`${this.ws}`);
            this.socket.onmessage = (e)=>{
                this.arr = JSON.parse(e.data).data;//获取服务器发来的数据
                this.msgArr.push(this.arr);
            }
        }
    }
}
</script>

<style lang="css" scoped>
.mui-title{
    color: #fff;
}
.app-chatroom .mui-bar-transparent{
    background:rgba(0,0,0,0.5);
}
.app-chatroom .chat-body{
    overflow: scroll;
    height:38rem;
    padding-top:4rem;
    padding-left:1rem;
    padding-right:1rem;
}
.app-chatroom .chat-body .chat-box{
    margin-bottom: .5rem;
}
.app-chatroom .chat-body .chat-box::after{
    content: " ";
    display: block;
    line-height: 0;
    height: 0;
    visibility: hidden;
}
.app-chatroom .chat-user{
    padding:0;
    margin: 0;
    display: flex;
    vertical-align: top;
}
.app-chatroom .chat-user .user-img-box{
    width: 2.5rem;
    height: 2.5rem;
}
.app-chatroom .chat-user .user-img-box .user-img{
    width:100%;
    border-radius: .5rem;
}
.app-chatroom .chat-user .user-name>h4{
    color: #fff;
    font-size:17px;
    margin-top: 0rem;
    margin-left: .5rem;
}
.app-chatroom .chat-body .chat-content{
    color: #fff;
    padding: 0rem 3rem;
}
.app-chatroom .chat-body .chat-content .content-msg{
    padding:.7rem;
    background: #34d134d4;
    border-radius: .2rem;
}
.app-chatroom .send-box{
    width: 100%;
    background-color: transparent;
    position: fixed;
    bottom: 0;
}
.app-chatroom .send-box .send-parent{
    margin: .5rem 0;
    padding:0rem 1rem;
    display: flex;
    justify-content: space-between;
}
.app-chatroom .send-box .send-parent .input-box{
    width:75%;
}
.app-chatroom .send-box .send-parent .send-input{
    width:100%;
    height: 2.2rem;
    margin: 0;
    padding: .3rem;
    background-color: rgba(255,255,255,.9);
}
.app-chatroom .send-box .send-parent .btn-box{
    width: 20%;
    text-align: center;
    box-sizing: border-box;
}
.app-chatroom .send-box .send-parent .send-btn{
    line-height: 2.2rem;
    padding: .5rem 1rem;
    background-color: #007bff;
    font-size: 18px;
    color:#fff;
}
.app-chatroom .send-box .send-parent .send-btn:hover{
    background-color: #009bff;
}
</style>
