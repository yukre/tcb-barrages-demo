<template>
  <div class="stage">
    <div class= "stage-title">Elon's 云开发弹幕 demo by VUE plugin</div>
    <div class="stage-drop">
      <vue-baberrage
        ref="baberrage"
        :isShow="barrageIsShow"
        :barrageList="barrageList"
        :maxWordCount="maxWordCount"
        :throttleGap="throttleGap"
        :loop="barrageLoop"
        :boxWidth="boxWidth"
        :messageHeight="messageHeight"
      >
      </vue-baberrage>
    </div>
    <div class="demo-control">
      <div>
        <select v-model="barragePosition">
          <option value="top">从上</option>
          <option value="normal">从右</option>
        </select>
        <input type="text" v-model="msg" />
        <button type="button" @click="sendOneBarrage">发送弹幕</button>
        <button type="button" @click="send10WBarrages">瞬发500弹幕</button>
        <button type="button" @click="pauseBarrages">暂停弹幕</button>
        <button type="button" @click="playBarrages">恢复弹幕</button>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { vueBaberrage, MESSAGE_TYPE } from 'vue-baberrage'

Vue.use(vueBaberrage)

export default {
  name: 'Barrages',
  data () {
    return {
      msg: '云开发niubility~~~~~~哈哈哈哈~',
      barrageIsShow: true,
      messageHeight: 3,
      boxWidth: window.screen.width,
      stageHeight: 800,
      barrageLoop: false,
      maxWordCount: 3,
      throttleGap: 5000,
      barrageList: [],
      barrageStyle: ['normal', 'red', 'yellow', 'green', 'blue'],
      barragePosition: 'normal'
    }
  },
  async created () {
    this.envId = this.$cloudbase.config.env

    try {
      await this.$cloudbase
        .auth({ presistence: 'session' })
        .anonymousAuthProvider()
        .signIn()

      this.isLoginSuccess = true
    } catch (e) {
      if (e.message.includes('100007')) {
        this.isLoginSuccess = false
      }
    }

    this.updateBarrages()
  },
  mounted () {
  },
  methods: {
    removeList () {
      this.barrageList = []
    },
    async updateBarrages () {
      const res = await this.$cloudbase.callFunction({
        name: 'getBarrages',
        data: {}
      })

      console.log('get barrages number :' + res.result.length)

      this.barrageList = res.result.data
    },
    async saveOneBarrage () {
      // 保存弹幕到服务器
      try {
        const res = await this.$cloudbase.callFunction({
          name: 'sendBarrage',
          data: {
            avatar: 'https://6572-ericxy-967b23-1251956900.tcb.qcloud.la/avatar.png?sign=6f565e6cd204676f1b683fc27813a9a9&t=1592652063',
            msg: this.msg,
            // time: Math.floor(Math.random() * 10 + 1),
            time: Math.random() * 20 + 1,
            barrageStyle: this.barrageStyle[Math.floor(Math.random() * this.barrageStyle.length)]
          }
        })
        this.callFunctionResult = res
      } catch (e) {
        this.callFunctionResult = e.message
        console.error('send Failed :' + e.message)
      }
    },
    async send10WBarrages () {
      for (let i = 0; i < 500; i++) {
        this.saveOneBarrage()
      }

      this.updateBarrages()
    },
    async sendOneBarrage () {
      // 更新回显弹幕
      this.saveOneBarrage()
      this.updateBarrages()
    },
    addToList () {
      let list = [{
        id: 10,
        avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
        msg: this.msg,
        time: 10,
        barrageStyle: 'yellow'
      }]
      list.forEach((v) => {
        this.barrageList.push({
          id: v.id,
          avatar: v.avatar,
          msg: v.msg,
          time: v.time,
          type: MESSAGE_TYPE.NORMAL,
          barrageStyle: v.barrageStyle
        })
      })
    },
    pauseBarrages () {
      this.$refs.baberrage.pause()
    },
    playBarrages () {
      this.$refs.baberrage.play()
    }
  }
}
</script>
<style scoped>
.stage {
  position: static;
  width: 100%;
  height: 100%;
}

.stage-title {
  font-size: 40px;
  padding-top: 5%;
  margin: 0px;
  height: 50px;
}

.stage-drop {
  position: relative;
  width: 100%;
  height: 70%;
}

.baberrage-stage {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
}
.demo-control{
    position: fixed;
    width: 100%;
    bottom: 15%;
    height: 69px;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    justify-content: center;
}
.demo-control div {
    width: 60%;
    background: rgba(0, 0, 0, 0.6);
    padding: 15px;
    border-radius: 5px;
    border: 2px solid #8ad9ff;
    display: flex;
    justify-content: center;
}

.demo-control input,button{
    float: right;
    height: 35px;
    width: 15%;
    min-width: 100px;
    padding:0;
    background:#027fbb;
    border:1px solid #CCC;
    color:#FFF;
    border-radius:0;
    box-sizing: border-box
}

.demo-control select {
    height:33px;
    margin-top:1px;
    border: 0px;
    outline: 1px solid rgb(204,204,204);
    background:#027fbb;
    border:1px solid #CCC;
    color:#FFF;
    border-radius:0;
    box-sizing: border-box
}

.demo-control input {
    flex: 1;
    height:35px;
    width: 50%;
    min-width: 30%;
    background:rgba(0,0,0,.7);
    border:1px solid #8ad9ff;
    padding-left:5px;
    color:#FFF;
}
</style>

<style>
.blue {
    border-radius: 100px;
    background: #e6ff75;
    color: #fff;
}
.green {
    border-radius: 100px;
    background: #75ffcd;
    color: #fff;
}
.red {
    border-radius: 100px;
    background: #e68fba;
    color: #fff;
}
.yellow {
    border-radius: 100px;
    background: #dfc795;
    color: #fff;
}
</style>
