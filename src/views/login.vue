<template>
  <div class="all">
<!--    <i class="fab fa-accessible-icon"></i>-->
    <v-row justify="center" align="center">
      <v-col md = "6">
        <v-card elevation="4" outlined shaped>
          <p class="text-center font-italic" style="margin-top: 2rem; font-size:25px">
            Electric
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
                  @click="reserve"
              >
                忘记密码
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
      imageName: 'end.png',
      path: '',
      str: '',
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
        await this.myGetImg()
        this.$store.commit('setImgUrl', this.img_url)
        this.$router.push({path: '/mainPage'})
      } else {
        alert(res.data.message)
      }
    },

    async reserve() {
      //TODO:实现修改密码和忘记密码
    },

    async myGetImg() {
      if (this.imageName) {
        this.img_url = await get_file_img({
          imageName: this.imageName,
        })
      } else {
        this.imageName = 'end.png'
      }
    },

    async getUrl() {
      const id = this.$store.getters.Id;
      this.path = /(?<=http:\/\/49.235.193.150:8112\/file\/image\/).+$/

      let res = await getImgUrl({
        user: id
      })
      this.str = res.data
      this.imageName = this.path.exec(this.str)
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
  margin-top: 9rem;
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

</style>