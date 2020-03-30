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
      POST('test', {msg: 'test'}).then((res) => {
        console.log(res)
      })
    }
  },
  mounted() {
    this.testInterface()
  }
}
</script>