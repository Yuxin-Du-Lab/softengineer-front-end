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
                  <v-col cols="6" v-for="(system, index) in game_info.supportSystems" :key="index">
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
            >BUY IT
            </v-btn>
            <v-chip v-if="!$store.getters.Id" color="success">
              登录后购买
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
            <br/><br/>
            <v-row>
              <v-col cols="6" offset="3">
                <v-card>
                  <v-card-title>
                    <h2>即将为您创建 {{ game_info.name }} 的订单:</h2>
                  </v-card-title>
                  <br/>
                  <v-card-text>
                    <h4>{{ game_info.describe }}</h4>
                  </v-card-text>
                  <v-card-subtitle>
                    <h3>此商品的价格为: {{ game_info.price }} ￥</h3>
                  </v-card-subtitle>
                  <br/>
                  <v-card-subtitle>
                    <h3>您账户当前的余额为 {{ balance }} ￥</h3>
                  </v-card-subtitle>
                  <v-card-subtitle>
                    <v-checkbox v-model="forYourself" disabled label="为自己购买"></v-checkbox>
                  </v-card-subtitle>
                  <br/>
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
    <v-row justify="center" type="flex">
      <v-col cols="8">
        <v-card color="blue-grey darken-4">
          <v-card-title>
            <h2>评价</h2><v-spacer></v-spacer>
            <v-btn color="green darken-4" @click="dialog=true;replyId = null">
              发表评论
            </v-btn>
          </v-card-title>
          <v-row v-for="item in comment_list" :key="item.id" v-if="item.replyId===null" justify="center" type="flex">
            <v-col cols="10">
              <v-card color="blue-grey darken-2">
                <v-card-title>
                  <v-icon>
                    mdi-message-reply-text-outline
                  </v-icon>
                  {{item.title}}
                </v-card-title>
                <v-card-subtitle>
                  发布者: {{item.authorNickname}}
                </v-card-subtitle>
                <v-card-text>
                  <h4>{{item.content}}</h4>
                </v-card-text>
                <v-card-actions>
                    <span style="font-size:10px; color: grey; margin: 0 20px 0 20px;">{{toLocalTime(item.createTime)}}</span>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="dialog=true;replyId = item.id">
                      <v-icon>mdi-chat-plus-outline</v-icon>
                    </v-btn>
                    <v-btn icon @click="deleteId=item.id;showIsDelete=true" v-if="userId==item.authorId">
                      <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                </v-card-actions>
                <v-row v-for="subitem in comment_list" :key="subitem.id" v-if="subitem.replyId===item.id">
                  <v-col cols="12">
                    <v-card color="blue-grey darken-3">
                      <v-card-title>
                        {{subitem.title}}
                      </v-card-title>
                      <v-card-subtitle>
                        发布者: {{subitem.authorNickname}}
                      </v-card-subtitle>
                      <v-card-text>
                        <h4>{{subitem.content}}</h4>
                      </v-card-text>
                      <v-card-subtitle>
                        {{toLocalTime(subitem.createTime)}}
                      </v-card-subtitle>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="deleteId=subitem.id;showIsDelete=true" v-if="userId==subitem.authorId">
                          <v-icon>mdi-trash-can-outline</v-icon>
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
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
          发表评论
        </v-card-title>

        <v-card-text>
          <v-input>
            <v-text-field label="标题" v-model="comment_title"></v-text-field>
          </v-input>
          <v-textarea label="评论内容" v-model="comment_content"></v-textarea>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="cyan darken-3"
              @click="dialog=false;comment_content='';comment_title='';replyId=null"
          >
            取消
          </v-btn>
          <v-btn
              color="success"
              @click="addComment"
          >
            提交
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="showIsDelete"
        width="500"
    >
      <v-card>
        <v-card-title class="text-h5">
          确认删除
        </v-card-title>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="cyan darken-3"
              @click="showIsDelete=false;deleteId=null"
          >
            取消
          </v-btn>
          <v-btn
              color="error"
              @click="deleteComment(deleteId);showIsDelete=false"
          >
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
import {get_user_balance, get_owned_games} from "@/api/user.js"
import {creat_comment, delete_comment, get_comment_list} from "@/api/comment.js"
import {getLocalTime} from "@/units/api.js"

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
      comment_list: [],
      comment_content: '',
      comment_title: '',
      dialog: false,
      replyId: null,
      showIsDelete: false,
      deleteId: null,
      userId: null
    }
  },

  async mounted() {
    this.gameId = this.$route.query.game_id;
    this.userId = this.$store.getters.Id
    this.getInfo();
    await this.getOwnedGames()
    await this.myGetComments()
  },

  methods: {
    async getOwnedGames() {
      let res = await get_owned_games({
        user: this.$store.getters.Id
      })
      this.owned_list = res.data
      this.isUserOwned = this.isOwned()
    },

    toLocalTime(time) {
      return getLocalTime(time)
    },

    async deleteComment(id) {
      let res = await delete_comment({
        id: id
      })
      await this.myGetComments()
    },

    async addComment() {
      this.dialog = false
      let res = await creat_comment({
        content: this.comment_content,
        gameId: this.gameId,
        reply: this.replyId,
        title: this.comment_title
      })
      this.comment_content = ''
      this.comment_title = ''
      this.replyId = null
      await this.myGetComments()
    },

    async myGetComments () {
      let res = await get_comment_list({
        game: this.gameId
      })
      this.comment_list = res.data
    },

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
      if (this.userId == undefined) {
        return false
      }
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
