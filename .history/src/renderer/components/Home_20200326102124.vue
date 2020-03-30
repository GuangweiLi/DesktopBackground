<template>
  <div>
    testing!
  </div>
</template>
<script>
import axios from 'axios'
export default {
  methods: {
    testInterface() {
      axios.post('/test', {msg: 'test'})
      .then(res => {
        conmsole.log("got message from server!")
        console.log(res)
      })
    }
  },
  mounted() {
    this.testInterface()
  }
}
</script>