<template>
  <div>
    <v-row class="justify-center">
      <v-col cols="8">
        <v-row v-for="item in gameList">
          <v-col cols="12">
            <router-link :to="{path:'game', query:{game_id: item.id}}" class="text-h6 transparent--text">
              <v-card style="cursor:pointer" color="grey darken-4">
                <v-card-title>
                  {{ item.name }}
                </v-card-title>
                <v-card-subtitle>
                  <v-row justify="end">
                    <v-col cols="1" align-self="end">
                      {{ item.price }} RMB
                    </v-col>
                  </v-row>
                </v-card-subtitle>
              </v-card>
            </router-link>
          </v-col>
        </v-row>
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
    this.myGetGame()
  },

  methods: {
    async myGetGame() {
      let res = await get_game_list()
      this.gameList = res.data
    }
  }
}
</script>
