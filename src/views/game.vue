<template>
  <div>
    <v-row justify="center">
      <v-col cols="7" class="text-h5">
        <h1>
          <v-icon x-large color="light-blue darken-3">
            mdi-google-controller
          </v-icon>
          {{ game_info.name }}
        </h1>
      </v-col>
      <v-col cols="1" align-self="baseline">
        <h4>
          Min Age is {{ game_info.minAge }}
        </h4>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="8">
        <v-card>
          <v-row>
            <v-col cols="12">
              <v-card>
                <v-card-title class="text-h4">
                  Game Information
                </v-card-title>
                <v-card-subtitle class="text-h5">
                  {{ game_info.describe }}
                </v-card-subtitle>
              </v-card>
            </v-col>
            <v-col cols="12">
              <v-card>
                <v-card-title class="text-h4">
                  System Support
                </v-card-title>
                <v-row>
                  <v-col cols="6" v-for="system in game_info.supportSystems">
                    <v-card-subtitle class="text-h5">
                      {{ system.name }}<br/>
                      Memory: {{ system.memory }}<br/>
                      Processor: {{ system.processor }}<br/>
                      Version: {{ system.version }}<br/>
                    </v-card-subtitle>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>

          <v-card>
            <v-card-title v-show="game_info.multiPlayer" class="text-h5">
              <v-icon>mdi-account-multiple-check</v-icon>
              &nbsp;&nbsp;Support Multi Player
            </v-card-title>
            <v-card-title v-show="!game_info.multiPlayer" class="text-h5">
              <v-icon>mdi-account-multiple-remove</v-icon>
              &nbsp;&nbsp;Just Single Player
            </v-card-title>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2" offset-md="2">
        <h3>
          Release Date
        </h3>
        {{ game_info.releaseDate }}
      </v-col>
      <v-col cols="2" offset-sm="3">
        <h4>
          <v-icon color="green darken-1">
            mdi-cash-multiple
          </v-icon>
          Price: {{ game_info.price }} RMB
        </h4>
      </v-col>
      <v-col cols="2">
        <v-btn color="success">BUY IT</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {get_game_info} from "@/api/game.js"

export default {
  name: "game",
  data() {
    return {
      id: null,
      game_info: {}
    }
  },

  created() {
    this.id = this.$route.query.game_id;
    this.getInfo();
  },

  methods: {
    async getInfo() {
      let res = await get_game_info({
        game: this.id
      });
      this.game_info = res.data;
      console.log(res)
    }
  }
}
</script>

<style scoped>

</style>
