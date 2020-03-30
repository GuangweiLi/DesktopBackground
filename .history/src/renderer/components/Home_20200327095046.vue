<template>
  <div>
    <input type="text">
  </div>
</template>
<script>
import {POST} from '../api/request'
export default {
  methods: {
    testInterface() {
      POST('test', {word: '汽车', timegap: 30}).then((res) => {
        console.log(res)
      })
    }
  },
  mounted() {
    this.testInterface()
  }
}
</script>