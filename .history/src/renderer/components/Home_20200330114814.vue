<template>
  <div class="outer">
    <section v-if="!isSetting">
      <div>
        <p>尝试搜索一个感兴趣的内容</p>
        <div class="outer">
          <input type="text" class="inputBox" v-model="word"/>
          <button class="operateBox" @click="setDesktop">Start</button>
          <span @click="toggle" class="more">更多设置{{!showDetail ? '➕' : '➖'}}</span>
        </div>
      </div>
      <div v-if="showDetail" style="margin-top: 8px">
        <span title="设置图片的分辨率">分辨率(宽*高)</span>
        <input type="number" class="inputBox num" v-model="option.width">*
        <input type="number" class="inputBox num" v-model="option.height">
        <span title="设置切换桌面的时间间隔">时间间隔</span>
        <input type="number" class="inputBox num" v-model="option.timegap">
        <span>秒</span>
      </div>
    </section>
    <section v-else>{{msg}}</section>
  </div>
</template>
<script>
import {POST} from '../api/request'
export default {
  data() {
    return {
      word: '汽车',
      showDetail: false,
      isSetting: false,
      option: {
        height: 1080,
        width: 1920,
        timegap: 60
      },
      msg: '正在设置桌面,请稍后...'
    }
  },
  methods: {
    setDesktop() {
      this.isSetting = true;
      POST('setPicture', {word: this.word, option: this.option}).then((res) => {
        if (res) {
          this.msg = '后台脚本已经启动,正在更新桌面..';
          setTimeout(() => {
            this.msg = '桌面更新成功!';
            this.isSetting = false;
          }, 1000)
          setTimeout(() => {
            this.msg = '正在设置桌面,请稍后...!';
          }, 2000)
        }
      })
    },
    toggle() {
      this.showDetail = !this.showDetail
    }
  },
  mounted() {
  }
}
</script>
<style>
.outer{
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  /* align-items: center; */
  /* justify-content: center; */
}
.outer section {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: -6em;
}
.outer section > div{
  margin: auto;
}
.inputBox {
  border: 1px solid gray;
  border-radius: 5px;
  height: 24px;
  line-height: 24px;
  padding-left: 8px;
}
.operateBox {
  border: 1px solid #409EFF;
  height: 28px;
  line-height: 28px;
  border-radius: 5px;
  background-color: #409EFF;
  color: white;
  margin: 0 8px;
}
.operateBox:hover{
  cursor: pointer;
}
.num {
  width: 90px;
}
span {
  font-size: 12px;
}
.more{
  display: inline-block;
}
.more:hover{
  cursor: pointer;
}
</style>