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
      game_owned_list: []
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
    }
  }
}
</script>

<style scoped>

</style>
