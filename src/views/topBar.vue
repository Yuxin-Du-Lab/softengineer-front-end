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
                style="cursor:pointer"
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
                src="@/assets/title.svg"
                width="200"
                style="cursor:pointer"
                @click="toHome"
            />
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="1">
            <v-btn x-large app collapse-on-scroll color="blue" @click="toFunction"> 功能</v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn x-large app collapse-on-scroll @click="myUserData"> 登录</v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn x-large app collapse-on-scroll @click="myLogout" to="/mainPage"> 注销</v-btn>
          </v-col>
          <v-col cols="2">
            <v-card color="#385F73" style="cursor:pointer" @click="myUserData">
              <v-card-subtitle>
                <v-icon>mdi-account</v-icon>
                {{ $store.getters.NickName ? $store.getters.NickName : '您尚未登录' }}
              </v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import {logout} from "@/api/user.js";

export default {
  name: "home",

  data() {
    return {}
  },

  methods: {
    toHome() {
      this.$router.push("/mainPage").catch((error) => {
        console.log('已在主页')
      });
    },

    async myLogout() {
      const Token = this.$store.getters.TokenStored;
      if (Token) {
        let res = await logout();
        this.$store.commit('logout')
        alert('注销成功！')
      } else {
        alert('您尚未登录')
      }
    },

    async myUserData() {
      const Token = this.$store.getters.TokenStored;
      if (Token) {
        alert('您已登录')
        await this.$router.push({path: '/mainPage'})
      } else {
        await this.$router.push({path: '/login'})
      }
    },

    toFunction() {
      const Token = this.$store.getters.TokenStored;
      if (Token) {
        this.$router.push("/functionPage")
      } else {
        alert('您尚未登录')
      }
    }
  },
};
</script>

<style scoped>
.bar {
  margin: 5px 5px 5px 5px;
}
</style>
