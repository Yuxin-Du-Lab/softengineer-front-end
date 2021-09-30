<template>
  <v-app>
    <v-app-bar app color="blue-grey darken-2" dark>
      <v-container>
        <v-row type="flex" align="center">
          <v-col cols="1">
            <v-img
              alt="Logo"
              class="shrink mr-2"
              contain
              src="@/assets/logo.jpg"
              transition="scale-transition"
              min-width="70"
              width="70"
              @click="toHome"
            >
            </v-img>
          </v-col>
          <v-col cols="2">
            <v-img
              alt="Name"
              class="shrink mt-1"
              contain
              min-width="100"
              src="@/assets/name.png"
              width="200"
              @click="toHome"
            />
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="1">
            <v-btn x-large app collapse-on-scroll to="/test"> 测试 </v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn x-large app collapse-on-scroll to="/login"> 登陆 </v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn x-large app collapse-on-scroll @click="myLogout" to="/mainPage"> 注销 </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { logout } from "@/api/user.js";

export default {
  name: "home",

  data: () => ({
    //
  }),

  methods: {
    toHome() {
      this.$router.push("/mainPage").catch((error) => {
        console.log('已在主页')
      });
    },

    async myLogout() {
      const Token = this.$store.getters.getTokenStored;
      if ( Token ) {
        let res = await logout();
        this.$store.commit('setTokenStored', '');
        alert('注销成功！')
      } else {
        alert('您尚未登陆')
      }
    },
  },
};
</script>

<style scoped>
  .bar{
    margin:5px 5px 5px 5px;
  }
</style>