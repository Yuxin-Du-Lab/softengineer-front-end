<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title> 测试1 </v-card-title>
        <v-card-subtitle>
          <v-btn @click="myGetUserList"> 获取所有用户信息 </v-btn>
        </v-card-subtitle>
        <v-card-subtitle>
          <v-list>
            <v-list-item v-for="item in user_list" :key="item.id">
              <v-list-item-content>
                ID: {{ item.id }}<br />
                NAME: {{ item.username }}<br />
                NICKNAME: {{ item.nickname }}
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-subtitle>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-card-title> 测试2 </v-card-title>
        <v-card-subtitle>
          <v-btn @click="myGetUser"> 获取当前用户信息 </v-btn>
        </v-card-subtitle>
        <v-card-title>当前用户</v-card-title>
        <v-card-subtitle>
          ID: {{ visitingUserInfo.id }}<br />
          NAME: {{ visitingUserInfo.username }}<br />
          NICKNAME: {{ visitingUserInfo.nickname }}
        </v-card-subtitle>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { getUserList, getUserInfo } from "@/api/user.js";

export default {
  name: "test",

  data() {
    return {
      user_list: {},
      visitingUserInfo: "",
    };
  },

  methods: {
    async myGetUserList() {
      let res = await getUserList();
      this.user_list = res.data;
      console.log(res);
    },

    async myGetUser() {
      const Token = this.$store.getters.getTokenStored;
      if (Token == "") {
        this.visitingUserInfo = {};
        return;
      }
      console.log(Token);
      let res = await getUserInfo();
      console.log(res);
      this.visitingUserInfo = res.data;
    },
  },
};
</script>