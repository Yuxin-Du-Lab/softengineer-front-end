<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="func">get info</button>
    <p>{{info}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'Home',

  data () {
    return {
      info: ''
    }
  },

  components: {
    HelloWorld
  },

  methods: {
    async func () {
      console.log('run func')
      let res = await axios({
        method: 'get',
        url: '/info/project',
        params: {},
      })
      console.log(res)
      this.info = res.data.course
    }
  }
}
</script>
