<template lang="html">
    <div class="app-msg">
        <header id="header" class="mui-bar mui-bar-transparent">
        <h1 class="mui-title">消息</h1>
        </header>
        <div class="msg-body">
            <ul class="list">
                <li class="list-item">
                    <div class="icon-box bg-f">
                        <span class="mui-icon-extra mui-icon-extra-peoples"></span>
                    </div>
                    <p>粉丝</p>
                </li>
                <li class="list-item">
                    <div class="icon-box bg-z">
                        <span class="mui-icon-extra mui-icon-extra-heart-filled"></span>
                    </div>
                    <p>赞</p>
                </li>
                <li class="list-item">
                    <div class="icon-box bg-p">
                        <span class="mui-icon mui-icon-chat"></span>
                    </div>
                    <p>评论和@</p>
                </li>
                <li class="list-item">
                    <div class="icon-box bg-h">
                        <span class="mui-icon-extra mui-icon-extra-order"></span>
                    </div>
                    <p>互动</p>
                </li>
            </ul>
            <div>
                <div class="m-chat">
                    <div class="img-box">
                        <img src="icon-img/10.png" alt="" class="chat-img">
                    </div>
                    <div class="chat-item">
                        <h4 class="item-name">官方助手</h4>
                    </div>
                </div>
                <div class="m-chat">
                    <div class="img-box">
                        <img src="icon-img/10.png" alt="" class="chat-img">
                    </div>
                    <div class="chat-item">
                        <h4 class="item-name">多人聊天室</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return{

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
.app-msg .msg-body{
    padding: 4rem 1rem;
}
.app-msg .msg-body .list{
    padding:.5rem 0rem;
    margin-bottom: 0;
    border-bottom: .01rem solid rgba(0,0,0,0.5);
    text-align: center;
    display: flex;
    justify-content: space-around;
}
.app-msg .msg-body .list-item{
    width: 25%;
    padding: .2rem 0;
}
.app-msg .msg-body .list-item .icon-box{
    width: 3rem;
    height: 3rem;
    margin: .2rem auto;
    line-height: 3.7rem;
    border-radius: .5rem;
}
.app-msg .bg-f{
    background: #09f;
    color: #fff;
}
.app-msg .bg-z{
    background: #f6006f;
    color: #eeeeeedb;
}
.app-msg .bg-p{
    background: #e91ee0;
    color: #eee;
}
.app-msg .bg-h{
    background: #2196f3;
    color: #f8f9fa;
}
.app-msg .msg-body .icon-box>span{
    font-size: 32px;
}
.app-msg .m-chat{
    width:100%;
    height: 4rem;
    margin-top: 1rem;
    vertical-align: baseline;
    padding: .5rem 0rem;
    border-radius: .5rem;
}
.app-msg .m-chat .img-box{
    width: 3rem;
    height: 3rem;
    border-radius: .5rem;
    float: left;
}
.app-msg .m-chat .img-box .chat-img{
    width:100%;
    border-radius: .5rem;
}
.app-msg .m-chat  .chat-item{
    margin-left: .5rem;
    display: inline-block;
    overflow: hidden;
}
.app-msg .m-chat  .chat-item .item-name{
    line-height: 2.6rem;
    font-size: 17px;
    color: #fff;
}
</style>
