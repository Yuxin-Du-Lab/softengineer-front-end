<template>
  <div>
    <v-row>
      <v-col cols="5" offset="3">
        <h1>库</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8" offset="2">
        <v-row md="6" align="center" justify="center">
          <v-col cols="3" v-for="item in game_owned_list">
            <v-card>
              <v-card-title>
                {{item.name}}
              </v-card-title>

              <v-card-title>
                  个人成就
              </v-card-title>
              <v-row justify="center" align="center">
                <v-col cols="10" v-for="achieve in item.achievements" :style="{'color': color_list[
                  Math.floor(Math.random() * color_list.length)
              ]}" @click="get_details" style="cursor:pointer">
                  {{achieve.name}}
                </v-col>
              </v-row>

            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {get_owned_games} from '@/api/user.js'

export default {
  name: "wareHouse",

  data() {
    return {
      awesome: true,
      game_owned_list: [],
      color_list: [
        'hsl(42, 48%, 54%)',
        'hsl(138, 24%, 48%)',
        'rgb(200, 138, 131)',
        'rgb(84, 221, 226)',
        'rgb(178, 199, 168)',
        'rgb(16, 195, 195)',
        'hsl(0, 21%, 68%)',
        'rgb(226, 166, 198)',
        'hsl(278, 17%, 66%)',
        'rgb(153, 199, 235)',
        'red'
      ]
    };
  },

  mounted() {
    this.myGetOwnedGames()
  },

  methods: {
    async myGetOwnedGames() {
      let res = await get_owned_games({
        user: this.$store.getters.Id
      })
      this.game_owned_list = res.data
    },

    async get_details() {
      console.log("123")
    },
  }
}
</script>

<style scoped>

</style>
