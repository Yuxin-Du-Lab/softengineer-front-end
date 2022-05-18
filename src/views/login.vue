<template>
  <div class="login" :style ="login">
    <div class="all">
      <!--    <i class="fab fa-accessible-icon"></i>-->
      <v-row justify="center" align="center">
        <v-col md = "6">

          <v-card class="lzr" elevation="4" outlined shaped>
            <p class="text-center" style="margin-top: 2rem; font-size:25px">
              下岗机器人再就业
            </p>

            <v-form class="form">
              <v-text-field class="input"
                            append-icon="mdi-account"
                            name="username"
                            v-model="username"
                            label="用户名"
                            hide-details="auto"
              ></v-text-field>

              <v-text-field
                  class="input"
                  :type="hidePassword ? 'password' : 'text'"
                  :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
                  name="password"
                  v-model="password"
                  label="密码"
                  @keyup.enter="myLogin"
                  id="password"
                  hide-details="auto"
                  @click:append="hidePassword = !hidePassword"
              ></v-text-field>
            </v-form>


            <v-row class="row_of_btn">
              <v-card-actions>
                <v-btn
                    outlined
                    rounded
                    text
                    color="green darken-2"
                    @click="myLogin"
                >
                  登录
                </v-btn>
              </v-card-actions>

              <v-card-actions>
                <v-btn
                    outlined
                    rounded
                    text
                    color="deep-purple lighten-2"
                    to="/register"
                >
                  注册
                </v-btn>
              </v-card-actions>
            </v-row>


          </v-card>
        </v-col>

      </v-row>
    </div>
  </div>
</template>

<script>
import { login, getUserInfo } from "@/api/user.js";
import {hex_md5} from '@/api/md5.js';
import {get_file_img} from "../api/file";
import {getImgUrl} from "../api/user";

export default {
  name: "login",

  data() {
    return {
      username: '',
      password: '',
      hidePassword: true,
      error: false,
      img_url: '',
      // imageName: 'end.png',
      path: '',
      str: '',
      login: {
        backgroundImage:"url(" + require("../assets/background2.jpg") + ")",
        backgroundSize: "cover",
        width: "100%",
        height: "120%",
      },
    };
  },

  methods: {
    async myLogin() {
      let vm = this;
      let res = await login({
        username: vm.username,
        password: hex_md5(vm.password),
      });
      // console.log(res)
      if (res.data.token) {
        this.$store.commit('setToken', res.data.token)
        let user = await getUserInfo()
        // console.log(user)
        this.$store.commit('setUser', user.data)

        await this.getUrl()
        // await this.myGetImg()
        this.$store.commit('setImgUrl', this.img_url)
        this.$router.push({path: '/mainPage'})
      } else {
        alert(res.data.message)
      }
    },

    // async myGetImg() {
    //   if (this.imageName) {
    //     this.img_url = await get_file_img({
    //       imageName: this.imageName,
    //     })
    //   } else {
    //     this.imageName = 'end.png'
    //   }
    // },

    async getUrl() {
      const id = this.$store.getters.Id;
      // this.path = /(?<=http:\/\/49.235.193.150:8112\/file\/image\/).+$/

      let res = await getImgUrl({
        user: id
      })
      // console.log(res)
      // this.str = res.data
      // this.imageName = this.path.exec(this.str)
      this.img_url = res.data
    }
  },
};
</script>

<style scoped lang="css">

.row_of_btn {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 1rem;
  padding-left: 10rem;
  padding-right: 10rem;
}

.all {
  margin-top: -4rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.form {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}

.input {
  width: 30rem;
  height: 5rem;
}
.lzr{
  background:radial-gradient(gray, darkslateblue);
  transform:translateY(150px);
  box-shadow: 2px 2px 2px 1px #aa0000;    }
</style>
