<template>
  <div class="lzr" :style ="home">
    <v-row justify="center" align="center">
      <v-col cols="4">
        <v-card class="title" color="green darken-4">
          <v-card-title>
            <h2 style="justify-self: center">欢迎来到下岗机器人再就业主页</h2>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="4">
        <v-img
            max-height="2048"
            max-width="2048"
            src="../assets/help-robot.jpg"
        ></v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  name: 'mainPage',

  data() {
    return {
      gameList: null,
      home: {
        backgroundImage:"url(" + require("../assets/background2.jpg") + ")",
        backgroundSize: "cover",
        width: "100%",
        height: "120%",
      },
    }
  },

  created() {
  },

  methods: {
  }
}
</script>

<style scoped>
.lzr{
  margin-top: -4rem;
}

.title{
  margin-top: 4rem;
  background:radial-gradient(mediumslateblue, darkslategray);
  transform:scale(.85,.85);
  box-shadow: 2px 2px 2px 1px #aa0000;
}
</style>
