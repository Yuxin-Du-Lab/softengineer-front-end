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
                            hide-details="auto"
                            :rules="[rules.required,rules.lenRequire]"></v-text-field>
            </v-col>
          </v-row>

          <v-row align="center" justify="center">
            <v-col md="6">
              <v-text-field name="nickname"
                            v-model="nickname"
                            label="昵称"
                            :rules="[rules.required]"
                            hide-details="auto"></v-text-field>
            </v-col>
          </v-row>

          <v-row align="center" justify="center">
            <v-col md="6">
              <v-text-field name="userEmail"
                            v-model="userEmail"
                            label="邮箱"
                            :rules="[rules.required]"
                            hide-details="auto"></v-text-field>
            </v-col>
          </v-row>

          <v-row align="center" justify="center">
            <v-col md="6">
              <v-text-field name="password"
                            v-model="password"
                            label="密码"
                            :rules="[rules.required]"
                            hide-details="auto"
                            :type="hidePassword ? 'password' : 'text'"
                            :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
                            @click:append="hidePassword = !hidePassword"
              ></v-text-field>
              <v-card-title>

              </v-card-title>
              <v-progress-linear v-model="password.length==0?0:password.length<7?30: password.length < 15?60:100">
              </v-progress-linear>
            </v-col>
          </v-row>

          <v-row align="center" justify="center">
            <v-col md="6">
              <v-text-field name="passwordAgain"
                            v-model="passwordAgain"
                            label="确认密码"
                            :rules="[rules.required,rules.compare]"
                            hide-details="auto"
                            :type="hidePasswordAgain ? 'password' : 'text'"
                            :append-icon="hidePasswordAgain ? 'mdi-eye-off' : 'mdi-eye'"
                            @click:append="hidePasswordAgain = !hidePasswordAgain"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col offset="3" class="font-weight-thin">
              出生日期
            </v-col>
          </v-row>

          <v-row align="center" justify="center">
            <v-col
                class="d-flex"
                md="2"
            >
              <v-select
                  :items="yearitems"
                  dense
                  label="年"
              ></v-select>
            </v-col>

            <v-col
                class="d-flex"
                md="2"
            >
              <v-select
                  :items="monthitems"
                  dense
                  label="月"
              ></v-select>
            </v-col>

            <v-col
                class="d-flex"
                md="2"
            >
              <v-select
                  :items="dayitems"
                  dense
                  label="日"
              ></v-select>
            </v-col>
          </v-row>

          <v-row align="center" justify="center">
            <v-col md="6">
                <v-checkbox
                    v-model="checkbox"
                    :label="`我已阅读并同意用户须知`"
                ></v-checkbox>
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
      passwordValue: 10,
      rules: {
        required: value => !!value || 'Required.',
        lenRequire: value => value.length <= 10 || '长度过长',
        compare: value => value == this.password || '两次输入密码不一样',
      },
      checkbox: false,
      yearitems: [
        '1980',
        '1981',
        '1982',
        '1983',
        '1984',
        '1985',
        '1986',
        '1987',
        '1988',
        '1989',
        '1990',
        '1991',
        '1992',
        '1993',
        '1994',
        '1995',
        '1996',
        '1997',
        '1998',
        '1999',
        '2000',
        '2001',
        '2002',
        '2003',
        '2004',
        '2005',
        '2006',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012',
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
        '2018',
        '2019',
        '2020',
      ],
      monthitems: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
      ],
      dayitems: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
        '15',
        '16',
        '17',
        '18',
        '19',
        '20',
        '21',
        '22',
        '23',
        '24',
        '25',
        '26',
        '27',
        '28',
        '29',
        '30',
        '31',
      ],
      dialog: false,
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
        if (!vm.checkbox) {
          alert("请阅读用户须知");
          return
        }
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