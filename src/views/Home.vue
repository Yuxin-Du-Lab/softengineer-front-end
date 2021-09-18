<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="info">get info</button>
    <p>{{info}}</p>
    <button @click="calc">calc</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'
import { get_project_info } from '@/api/demo'

export default {
  name: 'Home',

  data () {
    return {
      inform: ''
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
      let res = await axios({
        method: 'get',
        url: '/info/calc',
        params: {
          src1: 2,
          src2: 3,
        }
      })
      console.log(res)
    }
  }
}
</script>
