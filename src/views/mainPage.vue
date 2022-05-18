<template>
  <div>
    <v-row class="justify-center">
      <v-col cols="8">
        <p>hello software: 下岗机器人再就业</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {get_game_list} from "@/api/game.js"

export default {
  name: 'mainPage',

  data() {
    return {
      gameList: null
    }
  },

  created() {
    // this.myGetGame()
  },

  methods: {
    async myGetGame() {
      let res = await get_game_list()
      this.gameList = res.data
    }
  }
}
</script>
