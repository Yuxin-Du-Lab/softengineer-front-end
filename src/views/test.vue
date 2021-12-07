<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title> 测试1</v-card-title>
          <v-card-subtitle>
            <v-btn @click="myGetUserList"> 获取所有用户信息</v-btn>
          </v-card-subtitle>
          <v-card-subtitle>
            <v-list>
              <v-list-item v-for="item in user_list" :key="item.id">
                <v-list-item-content>
                  ID: {{ item.id }}<br/>
                  NAME: {{ item.username }}<br/>
                  NICKNAME: {{ item.nickname }}
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title> 测试2</v-card-title>
          <v-card-subtitle>
            <v-btn @click="myGetUser"> 获取当前用户信息</v-btn>
          </v-card-subtitle>
          <v-card-title>当前用户</v-card-title>
          <v-card-subtitle>
            ID: {{ visitingUserInfo.id }}<br/>
            NAME: {{ visitingUserInfo.username }}<br/>
            NICKNAME: {{ visitingUserInfo.nickname }}
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title> 测试3 md5</v-card-title>
          <v-card-subtitle>
            <v-text-field
                label="明文"
                hide-details="auto"
                v-model="originCode"
            ></v-text-field>
            <br>
            <v-btn @click="getPassword"> submit </v-btn>
          </v-card-subtitle>
          <v-card-title> 密文 </v-card-title>
          <v-card-subtitle>
            {{password}}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title> 测试4</v-card-title>
          <v-card-subtitle>
            <v-btn @click="myGetImg"> 获取图片</v-btn>
          </v-card-subtitle>
          <v-card-subtitle>
            <v-text-field
                label="image name"
                hide-details="auto"
                v-model="imageName"
            ></v-text-field>
            <v-card-subtitle>
              <v-img :src="pic"></v-img>
            </v-card-subtitle>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-card>
          <v-card-title>
            用户充值
          </v-card-title>
          <v-row>
            <v-col cols="12">
              <v-card-subtitle>
                <v-input>
                  <v-text-field label="金额" v-model="rechargeAmount"></v-text-field>
                  <div>￥</div>
                  <v-btn @click="myRecharge">recharge</v-btn>
                </v-input>
              </v-card-subtitle>
            </v-col>
            <v-col cols="12">
              <v-card-text>
                <v-chip>余额 {{balance}} ￥</v-chip>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card>
          <v-card-title>
            TAG测试
          </v-card-title>
          <v-card-text>
            <v-input>
              <v-text-field label="tag name" v-model="new_tag"></v-text-field>
              <v-btn @click="myCreateTag">create</v-btn>
            </v-input>
          </v-card-text>
          <v-card-text>
            <v-chip-group column>
              <v-chip v-for="item in tag_list" :key="item.id" close @click:close="myDeleteTag(item.id)" color="cyan darken-4">
                {{item.id}} - {{item.name}}
              </v-chip>
            </v-chip-group>
          </v-card-text>
          <v-card-text>
            <v-row v-for="game in game_list" :key="game.id">
              <v-col cols="12">
                {{game.id}} {{game.name}}
                <v-chip-group column>
                  <v-chip v-for="tag in game.tags" :key="tag.id" color="teal darken-4" close @click:close="deleteTag4game(game.id, tag.id)">
                    {{tag.id}} - {{tag.name}}
                  </v-chip>
                </v-chip-group>
                <v-chip-group column>
                  <v-chip v-for="rest_tag in game.rest_tags" :key="rest_tag.id" @click="addTag4game(game.id, rest_tag.id)">
                    {{rest_tag.id}} - {{rest_tag.name}}
                  </v-chip>
                </v-chip-group>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>

</template>

<script>
import {getUserList, getUserInfo, recharge, get_user_balance} from "@/api/user.js";
import {hex_md5} from "@/api/md5.js"
import {get_file_img} from "@/api/file.js"
import {create_tag, delete_tag, list_tag, manage_tag, list_tag_of_game} from "@/api/tag.js"
import {get_game_list} from "@/api/game.js"
export default {
  name: "test",

  data() {
    return {
      user_list: {},
      visitingUserInfo: '',
      originCode: null,
      password: null,
      imageName: 'end.png',
      pic: null,
      rechargeAmount: 0,
      balance: 0,
      tag_list: [],
      new_tag: '',
      game_list: [],
    };
  },

  async mounted() {
    await this.myGetBalance()
    await this.myListTags()
    await this.myGetGameList()
  },

  methods: {
    async addTag4game(game_id, tag_id) {
      let res = await manage_tag({
        gameId: game_id,
        tagId: tag_id,
        type: 0
      })
      await this.myGetGameList()
    },

    async deleteTag4game(game_id, tag_id) {
      let res = await manage_tag({
        gameId: game_id,
        tagId: tag_id,
        type: 1
      })
      await this.myGetGameList()
    },

    async myGetTags4game(game_id) {
      let res = await list_tag_of_game({
        game: game_id
      })
      return res.data
    },

    async myGetGameList() {
      let vm = this
      let res = await get_game_list()
      this.game_list = res.data
      for (let idx in this.game_list) {
        this.game_list[idx].tags = await this.myGetTags4game(this.game_list[idx].id)
        this.game_list[idx].rest_tags = this.tag_list.filter(function (global_tag) {
          for (let scan in vm.game_list[idx].tags) {
            if (vm.game_list[idx].tags[scan].id === global_tag.id) return false
          }
          return true
        })
      }
      console.log(this.game_list)
      this.$forceUpdate()
    },

    async myDeleteTag(tag_id) {
      let res = await delete_tag({
        id: tag_id
      })
      await this.myListTags()
      await this.myGetGameList()
    },

    async myCreateTag() {
      let res = await create_tag({
        name: this.new_tag
      })
      await this.myListTags()
      await this.myGetGameList()
    },

    async myListTags() {
      let res = await list_tag()
      console.log(res)
      this.tag_list = res.data
    },

    async myGetUserList() {
      let res = await getUserList();
      this.user_list = res.data;
      console.log(res);
    },

    async myGetUser() {
      const Token = this.$store.getters.TokenStored;
      if (Token == "") {
        this.visitingUserInfo = {};
        return;
      }
      console.log(Token);
      let res = await getUserInfo();
      console.log(res);
      this.visitingUserInfo = res.data;
    },

    getPassword() {
      const originString = String(this.originCode)
      this.password = hex_md5(originString)
      console.log(this.password)
    },

    async myGetImg() {
      if (this.imageName) {
        this.pic = await get_file_img({
          imageName: this.imageName,
        })
      } else {
        alert('error')
      }
    },

    async myRecharge() {
      if (this.rechargeAmount > 0 && !isNaN(this.rechargeAmount)) {
        let res = await recharge({
          amount: this.rechargeAmount
        })
        this.myGetBalance()
      } else {
        alert('请输入正确的金额')
      }
    },

    async myGetBalance() {
      let res = await get_user_balance();
      this.balance = res.data
    }
  },
};
</script>
