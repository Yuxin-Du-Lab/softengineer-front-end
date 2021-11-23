<template>
  <div>
    <v-row>
      <v-col offset="2">
        <h1>
          好友列表
        </h1>
      </v-col>
    </v-row>
    <v-row md="8" justify="center" align="center">
      <v-col align-self="center" offset="2">
          <v-row v-for="item in friends_list">
            <v-card width="400px" height="100px" >
              <v-col align-self="center">
                <v-row md="8" justify="left" align="center">
                  <br>
                  <v-card-title>
                    {{item}}
                  </v-card-title>

                  <v-card-actions>
                    <v-btn
                        outlined
                        rounded
                        text
                        color="green darken-2"
                        @click="add_message"
                    >
                      发消息
                    </v-btn>
                  </v-card-actions>

                  <v-card-actions>
                    <v-btn
                        outlined
                        rounded
                        text
                        color="green darken-2"
                        @click="delete_friend(item)"
                    >
                      删除
                    </v-btn>
                  </v-card-actions>

                </v-row>
              </v-col>
            </v-card>
          </v-row>
      </v-col>

      <v-col md="6" align-self="center">
        <v-card width="400px">
          <v-card-title>
            添加好友
          </v-card-title>

          <v-col
              md="6"
          >
            <v-text-field
                v-model="new_friend_name"
                label="请输入对方名称"
                clearable
                hide-details="auto"

            ></v-text-field>
          </v-col>

          <v-btn
              outlined
              rounded
              text
              color="green darken-2"
              @click="add_friend"
          >
            添加
          </v-btn>
        </v-card>
      </v-col>
    </v-row>



  </div>
</template>

<script>
import {add_friend, delete_friend, get_friend_list} from "../api/friends";

export default {
  name: "friends",

  data() {
    return {
      new_friend_name: '',
      friends_list: [
        'admin',
        'dyx',
        'lc',
        'dhy'
      ],
    }
  },

  created() {
    this.get_friend_list()
  },

  methods: {

    async add_friend() {
      console.log(this.new_friend_name)
      const Token = this.$store.getters.TokenStored
      let res = await add_friend({
        username: this.new_friend_name
      })
      await this.get_friend_list()
    },

    async delete_friend(name) {
      const Token = this.$store.getters.TokenStored
      console.log(name)
      let res = await delete_friend({
        username: name
      })
      await this.get_friend_list()
    },

    async add_message() {

    },

    async get_friend_list() {
      const Token = this.$store.getters.TokenStored
      let id = this.$store.getters.Id
      let res = await get_friend_list({
        user: this.$store.getters.Id
      })
      //this.friends_list = res.data
      let array = []
      console.log(res.data)
      console.log(res.data.length)
      console.log(res.data[0].username)
      let len = res.data.length
      for (let i = 0; i < len; i++) {
        array.push(res.data[i].username)
      }
      // for (let temp in res.data) {
      //   //
      //   //console.log(temp)
      // }
      console.log(array)
      this.friends_list = array
    }
  }

}
</script>

<style scoped>

</style>