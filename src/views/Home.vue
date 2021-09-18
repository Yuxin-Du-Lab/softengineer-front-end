<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <br>
    <button @click="info">get info</button>
    <p>{{inform}}</p>
    <button @click="calc">calc</button>
    <p>{{src1}} + {{src2}} = {{sum}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import { get_project_info, demo_calc_func } from '@/api/demo'

export default {
  name: 'Home',

  data () {
    return {
      inform: '',
      src1: 5,
      src2: 'b',
      sum: null
    }
  },

  components: {
    HelloWorld
  },

  methods: {
    async info () {
      console.log('run info')
      let res = await get_project_info()
      console.log(res)
      this.inform = res.data.course
    },

    async calc () {
      console.log('run calc')
      let res = await demo_calc_func({
        src1: this.src1,
        src2: this.src2,
      })
      console.log(res)
      if (res.data.code == 1001) {
        alert(res.data.message)
        return
      }
      this.sum = res.data.sum
    }
  }
}
</script>
