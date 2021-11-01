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
        <v-dialog
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
            v-model="order"
        >
          <template v-slot:activator="{ on, attrs }">>
            <v-btn
                color="success"
                v-bind="attrs"
                v-on="on"
                v-if="!isUserOwned && $store.getters.Id"
                @click="myGetBalance"
            >BUY IT</v-btn>
            <v-chip v-if="!$store.getters.Id" color="success">
              登陆后购买
            </v-chip>
          </template>
          <v-card>
            <v-toolbar>
              <h2>订单创建</h2>
              <v-spacer></v-spacer>
              <v-btn icon @click="order = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <br /><br />
            <v-row>
              <v-col cols="6" offset="3">
                <v-card>
                  <v-card-title>
                    <h2>即将为您创建 {{game_info.name}} 的订单:</h2>
                  </v-card-title>
                  <br />
                  <v-card-text>
                    <h4>{{game_info.describe}}</h4>
                  </v-card-text>
                  <v-card-subtitle>
                    <h3>此商品的价格为: {{game_info.price}} ￥</h3>
                  </v-card-subtitle>
                  <br />
                  <v-card-subtitle>
                    <h3>您账户当前的余额为 {{balance}} ￥</h3>
                  </v-card-subtitle>
                  <v-card-subtitle>
                    <v-checkbox v-model="forYourself" disabled label="为自己购买"></v-checkbox>
                  </v-card-subtitle>
                  <br />
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="myPurchaseGame(true)">直接购买</v-btn>
                    <v-btn color="primary" @click="myPurchaseGame(false)">创建订单</v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
        <v-btn color="success" to="/wareHouse" v-if="isUserOwned">
          在库中查看
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-snackbar
            v-model="purchaseResult"
            :timeout="3000"
            :color="payNowSuccess ? 'teal darken-2' : 'purple darken-1'"
            top
        >
            <h3 v-if="payNowSuccess">
              支付成功，游戏已为您添加到库
            </h3>
            <h3 v-else>
              支付失败，余额不足
            </h3>
          <template v-slot:action="{ attrs }">
            <v-btn
                color="black"
                text
                v-bind="attrs"
                @click="purchaseResult = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
        <v-snackbar
            v-model="orderResult"
            :timeout="3000"
            color="teal darken-2"
            top
        >
          <h3>
            订单已为您添加到订单列表
          </h3>
          <template v-slot:action="{ attrs }">
            <v-btn
                color="black"
                text
                v-bind="attrs"
                @click="orderResult = false"
            >
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {get_game_info, purchase_game} from "@/api/game.js"
import { get_user_balance, get_owned_games } from "@/api/user.js"
export default {
  name: "game",
  data() {
    return {
      gameId: null,
      game_info: {},
      order: false,
      forYourself: true,
      balance: 0,
      purchaseResult: false,
      orderResult: false,
      payNowSuccess: true,
      owned_list: [],
      isUserOwned: false,
    }
  },

  async mounted() {
    this.gameId = this.$route.query.game_id;
    this.getInfo();
    let res = await get_owned_games({
      user: this.$store.getters.Id
    })
    this.owned_list = res.data
    this.isUserOwned = this.isOwned()
  },

  methods: {
    async getInfo() {
      let res = await get_game_info({
        game: this.gameId
      });
      this.game_info = res.data;
    },

    async myPurchaseGame(payNow) {
      let res = await purchase_game({
        buyerId: this.$store.getters.Id,
        gameId: this.gameId,
        payNow: payNow,
        receiverId: this.$store.getters.Id
      })
      if (res.data.code === 1102) {
        this.payNowSuccess = false
      }
      this.order = false
      if (payNow) {
        this.purchaseResult = true
      } else {
        this.orderResult = true
      }
      this.isUserOwned = this.isOwned()
      this.$forceUpdate()
    },

    async myGetBalance() {
      let res = await get_user_balance()
      this.balance = res.data
    },

    isOwned() {
      let vm = this
      let newList = this.owned_list.filter(function (item) {
        return item.id == vm.gameId;
      })
      return newList.length > 0;
    }
  }
}
</script>

<style scoped>

</style>
