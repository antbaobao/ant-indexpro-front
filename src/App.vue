<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import handleRes from '@/libs/handle-res'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import config from '@/config'
export default {
  data () {
    return {
      timer: null,
      websocketUrl: process.env.NODE_ENV === 'development' ? config.websocketUrl.dev : config.websocketUrl.pro
    }
  },
  methods: {
    ...mapActions([
      'getProindex'
    ]),
    async _getProindex () {
      try {
        const res = await this.getProindex()
        handleRes(this.$message, res)
      } catch (e) {
        console.log(e)
        return this.$message.error('Something wrong')
      }
    },
    initWebSocket () {
      this.connection()
      let self = this
      this.timer = setInterval(() => { // 断开重连机制,尝试发送消息,捕获异常发生时重连
        try {
          self.stompClient.send('test')
          if (!this.stompClient) {
            self.connection()
          }
        } catch (err) {
          console.log('network error: ' + err)
          self.connection()
        }
      }, 5000)
    },
    connection () {
      this.socket = new SockJS(this.websocketUrl)// 建立连接对象, 连接服务端提供的通信接口，连接以后才可以订阅广播消息和个人消息
      this.stompClient = Stomp.over(this.socket) // 获取STOMP子协议的客户端对象
      this.stompClient.debug = null // 禁用debug模式
      this.stompClient.connect({}, (frame) => { // 向服务器发起websocket连接
        this.stompClient.subscribe('/proIndex/info', (msg) => { // 订阅服务端提供的某个/proIndex/info
          if (!JSON.parse(msg.body).length) {
            return
          }
          this.$store.commit('setProindex', JSON.parse(msg.body)) // msg.body存放的是服务端发送给我们的信息
        })
      }, (err) => {
        console.log(err)// 连接发生错误时的处理函数
      })
    },
    disconnect () { // 断开连接
      if (this.stompClient != null) {
        this.stompClient.disconnect()
      }
    }
  },
  mounted () {
    this._getProindex()
    this.initWebSocket()
  },
  beforeDestroy: function () {
    this.disconnect() // 页面离开时断开连接,清除定时器
    clearInterval(this.timer)
  }
}
</script>
<style lang="stylus">
    #app
        font-family 'Avenir', Helvetica, Arial, sans-serif
        -webkit-font-smoothing antialiased
        -moz-osx-font-smoothing grayscale
        text-align center
        color #2c3e50

    #nav
        padding 30px
        a
            font-weight bold
            color #2c3e50
            &.router-link-exact-active
                color #42b983
    body {
        margin: 0;
        font-family: SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
        -webkit-font-smoothing: antialiased;
        font-style: normal;
        background-color: #F9F9F9 !important;
    }
</style>
