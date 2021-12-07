<template>
  <div>
    <v-row justify="center">
      <v-col cols="12">
        <v-card color="blue-grey darken-3">
          <v-row justify="center">
            <v-col cols="8">
              <h1>
                WorkShop
              </h1>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="10">
              <v-card color="brown darken-1">
                <v-card-title>
                  <h2>
                    {{gameInfo.name}}'s MODS
                  </h2>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-3" @click="dialog=true" :disabled="!isLogin">创建MOD</v-btn>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="5" v-for="mod in mods_list" :key="mod.id">
                      <v-card color="brown darken-2">
                        <v-card-title>
                          <v-icon>
                            mdi-package-variant
                          </v-icon> {{mod.name}}
                          <v-spacer></v-spacer>
                          <v-checkbox :disabled="!isLogin" label="订阅" color="green" v-model="mod.subscribe" @click="subscribeMod(mod.subscribe, mod.id)"></v-checkbox>
                        </v-card-title>
                        <v-card-subtitle>
                          创作者: {{mod.authorNickname}}
                        </v-card-subtitle>
                        <v-card-text>
                          {{mod.describe}}
                        </v-card-text>
                        <v-card-subtitle>
                          发布时间 {{toLocalTime(mod.createTime)}}
                        </v-card-subtitle>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
        v-model="dialog"
        width="500"
    >
      <v-card>
        <v-card-title class="text-h5">
          创建MOD
        </v-card-title>

        <v-card-text>
          <v-input>
            <v-text-field label="MOD名称" v-model="mod_name"></v-text-field>
          </v-input>
          <v-textarea label="描述" v-model="mod_describe"></v-textarea>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="cyan darken-3"
              @click="dialog=false;mod_describe='';mod_name=''"
          >
            取消
          </v-btn>
          <v-btn
              color="success"
              @click="createMod"
          >
            提交
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
        v-model="pick_notice"
        top
        color="green darken-3"
        timeout="2500"
    >
      订阅成功
    </v-snackbar>
    <v-snackbar
        v-model="unpick_notice"
        top
        color="light-green darken-4"
        timeout="2500"
    >
      取消订阅
    </v-snackbar>
  </div>
</template>

<script>
import {get_game_info} from "@/api/game.js"
import {list_mods4game, create_mod4game, list_subscriptions, subscribe_mod, unsubscribe_mod} from "@/api/mod.js"
import {getLocalTime} from "@/units/api.js"

export default {
  name: "workshop",

  data () {
    return {
      gameId: this.$route.query.game_id,
      gameInfo: {},
      mods_list: [],
      dialog: false,
      mod_describe: '',
      mod_name: '',
      pick_notice: false,
      unpick_notice: false,
      isLogin: this.$store.getters.Id !== ''
    }
  },

  async mounted() {
    await this.getGameInfo()
    await this.getMods4game()
    await this.getSubscriptions()
  },

  methods: {
    async createMod() {
      this.dialog = false
      let res = await create_mod4game({
        describe: this.mod_describe,
        gameId: this.gameId,
        name: this.mod_name
      })
      this.mod_describe = ''
      this.mod_name = ''
      await this.getMods4game()
    },

    async getGameInfo() {
      let res = await get_game_info({
        game: this.gameId
      })
      this.gameInfo = res.data
    },

    async getMods4game() {
      let res = await list_mods4game({
        game: this.gameId
      })
      this.mods_list = res.data
    },

    toLocalTime(time) {
      return getLocalTime(time)
    },

    async getSubscriptions() {
      if (this.$store.getters.Id === '') {
        return
      }
      let res = await list_subscriptions({
        user: this.$store.getters.Id
      })
      let modsOfUser = res.data
      for (let idx1 in this.mods_list) {
        this.mods_list[idx1].subscribe = false
        for (let idx2 in modsOfUser) {
          if (this.mods_list[idx1].id === modsOfUser[idx2].id) {
            this.mods_list[idx1].subscribe = true
            break
          }
        }
      }
      this.$forceUpdate()
    },

    async subscribeMod(pick_mod, mod_id) {
      if (pick_mod) {
        let res = await subscribe_mod({
          id: mod_id
        })
        this.pick_notice = true
      } else {
        let res = await unsubscribe_mod({
          id: mod_id
        })
        this.unpick_notice = true
      }
      await this.getSubscriptions()
    }
  }
}
</script>

<style scoped>

</style>
