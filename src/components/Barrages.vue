<template>
  <div class="stage">
    <h1>Elon's 云开发弹幕 demo by VUE</h1>
    <div class="stage-drop" ref="stageDrop">
      <vue-baberrage
        ref="baberrage"
        :isShow="barrageIsShow"
        :barrageList="barrageList"
        :maxWordCount="maxWordCount"
        :throttleGap="throttleGap"
        :loop="barrageLoop"
        :boxHeight="boxHeight"
        :boxWidth="boxWidth"
        :messageHeight="messageHeight"
      >
      </vue-baberrage>
    </div>
    <div class="demo-control">
      <div>
        <select v-model="position">
          <option value="top">从上</option>
          <option value="normal">从右</option>
        </select>
        <input type="text" v-model="msg" />
        <button type="button" @click="addToList">发送弹幕</button>
        <button type="button" @click="send10WBaberage">瞬发10W弹幕</button>
        <button type="button" @click="pauseBaberrage">暂停弹幕</button>
        <button type="button" @click="playBaberrage">恢复弹幕</button>
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
      boxHeight: window.screen.height,
      boxWidth: window.screen.width,
      stageHeight: 800,
      barrageLoop: true,
      maxWordCount: 3,
      throttleGap: 5000,
      barrageList: []
    }
  },
  mounted () {
    this.addToList()
  },
  methods: {
    removeList () {
      this.barrageList = []
    },
    send10WBaberage () {
      // TODO

    },
    sendOneBaberage () {
      // TODO

    },
    addToList () {
      let list = [
        {
          id: 1,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: this.msg,
          time: 3,
          barrageStyle: 'red'
        },
        {
          id: 2,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: this.msg,
          time: 8,
          barrageStyle: 'green'
        },
        {
          id: 3,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: this.msg,
          time: 10,
          barrageStyle: 'normal'
        },
        {
          id: 4,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: this.msg,
          time: 5,
          barrageStyle: 'blue'
        },
        {
          id: 5,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: this.msg,
          time: 6,
          barrageStyle: 'red'
        },
        {
          id: 6,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: this.msg,
          time: 12,
          barrageStyle: 'normal'
        },
        {
          id: 7,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: this.msg,
          time: 5,
          barrageStyle: 'red'
        },
        {
          id: 8,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: this.msg,
          time: 5,
          barrageStyle: 'normal'
        },
        {
          id: 9,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: this.msg,
          time: 8,
          barrageStyle: 'red'
        },
        {
          id: 10,
          avatar: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3064584167,3502823640&fm=26&gp=0.jpg',
          msg: this.msg,
          time: 10,
          barrageStyle: 'yellow'
        }
      ]
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
    pauseBaberrage () {
      this.$refs.baberrage.pause()
    },
    playBaberrage () {
      this.$refs.baberrage.play()
    }
  }
}
</script>
<style scoped>
.stage {
  position: relative;
  width: 100%;
  height: 100%;
}

.stage-drop {
  position: relative;
  width: 100%;
  height: 100%;
}

.baberrage-stage {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    top: 0;
    margin-top: 130px;
}
.demo-control{
    position: relative;
    margin: 0 auto;
    width: 100%;
    bottom: 380px;
    height: 69px;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    justify-content: center;
}
.demo-control div {
    width: 50%;
    background: rgba(0, 0, 0, 0.6);
    padding: 15px;
    border-radius: 5px;
    border: 2px solid #8ad9ff;
    display: flex;
    justify-content: center;
}

.demo-control input,button{
    height: 35px;
    width: 15%;
    min-width: 5%;
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
    min-width: 50%;
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
