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
      axios.post('/api/test', {msg: 'test'})
      .then(res => {
        console.log("got message from server!")
        console.log(res)
      })
    }
  },
  mounted() {
    this.testInterface()
  }
}
</script>