<template>
  <div class="outer">
    <section>
      <div>
        <p>尝试搜索一个感兴趣的内容<p>
        <input type="text">
        <button>Start</button>
        <p>更多设置</p>
      </div>
      <div>
        <span title="设置图片的分辨率">分辨率(宽*高)</span>
        <input type="number">*
        <input type="number">
        <span title="设置切换桌面的时间间隔">时间间隔</span>
        <input type="number">
      </div>
    </section>
  </div>
</template>
<script>
import {POST} from '../api/request'
export default {
  methods: {
    testInterface() {
      POST('setPicture', {word: '汽车', timegap: 30000}).then((res) => {
        console.log(res)
      })
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
  align-items: center;
  justify-content: center;
}
.outer section {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.outer section > div{
  width: 100%;
}
</style>