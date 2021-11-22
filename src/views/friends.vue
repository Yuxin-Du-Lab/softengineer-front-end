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
                      @click="remove_friend"
                  >
                    删除
                  </v-btn>
                </v-card-actions>

              </v-row>
            </v-col>
          </v-card>
        </v-row>
        </v-col>
    </v-row>


  </div>
</template>

<script>
export default {
  name: "friends",

  data() {
    return {
      friends_list: [
        'admin',
        'dyx',
        'lc',
        'dhy'
      ],
    }
  },

  methods: {
    async remove_friend() {

    },

    async add_message() {

    }
  }

}
</script>

<style scoped>

</style>