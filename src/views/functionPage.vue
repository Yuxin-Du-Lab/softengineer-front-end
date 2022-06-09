<template>
  <div>
    <v-row align="center" justify="center">
      <v-col cols="2" offset="1">
        <v-btn>{{this.status}}</v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="1">
        <v-btn :disabled="this.disable_start" color="primary" @click="my_ros_start">开机</v-btn>
      </v-col>
      <v-col cols="1">
        <v-btn :disabled="!this.disable_start" color="error" @click="my_ros_stop">关机</v-btn>
      </v-col>
      <v-col cols="2">
        <v-btn color="success" @click="my_get_ros_status">刷新机器人状态</v-btn>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="10" offset="1">
        <v-simple-table>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">
                操作
              </th>
              <th class="text-left">
                执行
              </th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>启动物品抓取</td>
              <td>
                <v-btn color="success" @click="my_use_ros_grab">执行</v-btn>
              </td>
            </tr>
            <tr>
              <td>启动手柄/键盘控制</td>
              <td>
                <v-btn color="success" @click="my_use_key_ctrl">执行</v-btn>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>

    <br />
    <v-card>
      <v-snackbar
          :value="this.show_snack_bar"
          centered
          shaped
          top
          color="teal darken-3"
      >
        机器人正在开机,请耐心约<strong>20秒</strong>...
      </v-snackbar>
    </v-card>
  </div>
</template>

<script>
import {
  use_ros_grab,
  use_key_ctrl,
  use_ros_start,
  get_ros_status,
  use_ros_stop
} from "@/api/ros.js";

export default {
  name: "functionPage",

  data() {
    return {
      status: "",
      show_snack_bar: false,
      disable_start: false,
    }
  },

  mounted() {
    this.my_get_ros_status()
  },

  methods: {
    async my_get_ros_status() {
      let res = await get_ros_status()
      console.log(res)
      this.status = res.data
      if (this.status === "机器人未运行") {
        this.disable_start = false
      }
    },

    async my_use_key_ctrl() {
      if (this.status === "机器人未运行") {
        alert("请先启动机器人，再执行操作")
        return
      }
      let res = await use_key_ctrl()
      console.log(res)
      if(res.statusText === "OK") {
        alert(res.data)
      }
    },

    async my_use_ros_grab() {
      if (this.status === "机器人未运行") {
        alert("请先启动机器人，再执行操作")
        return
      }
      let res = await use_ros_grab()
      console.log(res)
      if(res.status === 200) {
        this.status = "正在执行抓取"
        await this.sleep(20000)
        await this.my_get_ros_status()
      }
    },

    async my_ros_start() {
      let res = await use_ros_start()
      console.log(res)
      if(res.status === 200) {
        this.disable_start = true
        this.show_snack_bar = true
        this.status = "机器人正在开机"
        await this.sleep(20000)
        this.show_snack_bar = false
        await this.my_get_ros_status()
        if (this.status === "机器人未运行") {
          this.disable_start = false
          alert("请检查机器人的运行状态")
        }
      }
    },

    async my_ros_stop() {
      if (this.status === "机器人未运行") {
        alert("请先启动机器人，再执行操作")
        return
      }
      let res = await use_ros_stop()
      console.log(res)
      if(res.status === 200) {
        alert(res.data)
        await this.sleep(3000)
        this.disable_start = false
        await this.my_get_ros_status()
      }
    },

    async sleep(ms) {
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      });
    }
  }
}
</script>

<style scoped>

</style>

