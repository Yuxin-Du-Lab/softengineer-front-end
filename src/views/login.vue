<template>
  <div>
    <v-row md="10">
      <v-col md="6" offset-md="2">
        <v-card>
          <v-card-title> 登陆 </v-card-title>
          <v-card-subtitle>
<!--            <v-row>-->
<!--              <v-col md="3">-->
<!--                <v-btn @click="myLogin"> 登陆测试 </v-btn>-->
<!--              </v-col>-->
<!--              <v-col md="3">-->
<!--                <v-btn @click="myLogout"> 登出测试 </v-btn>-->
<!--              </v-col>-->
<!--            </v-row>-->
            <div>
              <v-text-field
                  label="用户名"
                  :rules="rules"
                  hide-details="auto"
              ></v-text-field>
              <v-text-field label="密码"></v-text-field>
              
            </div>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { login, logout } from "@/api/user.js";

export default {
  name: "login",

  data() {
    return {};
  },

  methods: {
    async myLogin() {
      let res = await login({
        username: "admin",
        password: "cede64ef2fe268fee04990066e875f74",
      });
      console.log(res);
      this.$store.commit('setTokenStored', res.data.token);    
    },

    async myLogout() {
      let res = await logout();
      console.log(res);
      this.$store.commit('setTokenStored', '');   
      // console.log(this.$store.getters.getTokenStored)
    },
  },
};
</script>