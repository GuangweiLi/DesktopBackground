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
      POST('setPicture', {word: '汽车', timegap: 60000}).then((res) => {
        console.log(res)
      })
    }
  },
  mounted() {
    this.testInterface()
  }
}
</script>