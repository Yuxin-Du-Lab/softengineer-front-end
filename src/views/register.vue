<template>
  <v-row align="center" justify="center">
    <v-col md="6">

      <v-card elevation="4" outlined shaped>
        <v-col>
          <v-row align="center" justify="center">
            <v-card-title>
              注册
            </v-card-title>
          </v-row>

          <v-row align="center" justify="center">
            <v-col md="6">
              <v-text-field name="username"
                            v-model="username"
                            label="用户名"
                            hide-details="auto"></v-text-field>
            </v-col>
          </v-row>

          <v-row align="center" justify="center">
            <v-col md="6">
              <v-text-field name="nickname"
                            v-model="nickname"
                            label="昵称"
                            hide-details="auto"></v-text-field>
            </v-col>
          </v-row>

          <v-row align="center" justify="center">
            <v-col md="6">
              <v-text-field name="userEmail"
                            v-model="userEmail"
                            label="邮箱"
                            hide-details="auto"></v-text-field>
            </v-col>
          </v-row>

          <v-row align="center" justify="center">
            <v-col md="6">
              <v-text-field name="password"
                            v-model="password"
                            label="密码"
                            hide-details="auto"
                            :type="hidePassword ? 'password' : 'text'"
                            :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
                            @click:append="hidePassword = !hidePassword"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row align="center" justify="center">
            <v-col md="6">
              <v-text-field name="passwordAgain"
                            v-model="passwordAgain"
                            label="确认密码"
                            hide-details="auto"
                            :type="hidePasswordAgain ? 'password' : 'text'"
                            :append-icon="hidePasswordAgain ? 'mdi-eye-off' : 'mdi-eye'"
                            @click:append="hidePasswordAgain = !hidePasswordAgain"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row align="center" justify="center">
            <v-col md="3">
              <v-btn
                  outlined
                  rounded
                  text
                  color="deep-purple lighten-2"
                  @click="myRegister"
              >
                注册
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {register} from "../api/user";
import {hex_md5} from "../api/md5";

export default {
  name: "register",

  data() {
    return {
      hidePasswordAgain: true,
      hidePassword: true,
      username: '',
      nickname: '',
      userEmail: '',
      password: '',
      passwordAgain: '',
    };
  },

  methods: {
    async myRegister() {
        let vm = this;
        if (vm.password != vm.passwordAgain) {
          alert("两次密码输入不正确");
          return
        }
        let res = await register({
          username: vm.username,
          password: hex_md5(vm.password),
          nickname: vm.nickname,
        });
        if (res.data.code == 0) {
          alert("success");
          this.$router.push({path: '/login'});
        }
    }
  }
}
</script>

<style scoped>

</style>