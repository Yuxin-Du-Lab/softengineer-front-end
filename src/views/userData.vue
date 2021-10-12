<template>
    <div>
      <v-row justify="center" align="center">
        <v-col md="4" align-self="center">
          <v-card elevation="4">
            <v-row justify="center">
              <v-col md="8">
                <v-file-input v-if="editImage"
                              show-size
                              truncate-length="10"
                              v-model="newImage"
                              accept="image/*"
                              label="新头像"
                ></v-file-input>
<!--                <input v-if="editImage" type="file" @change="getFiles($event)" />-->

                <v-img v-else :src="img_url" height="100px" contain></v-img>
              </v-col>

            </v-row>

            <v-row justify="center">
              <v-card-actions>
                <v-btn
                    v-if="!editImage"
                    elevation="2"
                    outlined
                    rounded
                    text
                    @click="tryEditImage"
                >修改头像</v-btn>
                <v-btn v-if="editImage"
                       elevation="2"
                       outlined
                       rounded
                       text
                       @click="doEditImage"
                >确认修改</v-btn>
                <v-btn v-if="editImage"
                       elevation="2"
                       outlined
                       rounded
                       text
                       @click="giveUpEditImage"
                >放弃修改</v-btn>
              </v-card-actions>
            </v-row>
          </v-card>
        </v-col>

        <v-col md="4">
          <v-card>
            <v-row justify="center" align="center">

              <v-card-actions>
                <v-btn
                    outlined
                    rounded
                    text
                    color="deep-purple lighten-2"
                    to="/wareHouse"
                >
                  库
                </v-btn>
              </v-card-actions>

              <v-card-actions>
                <v-btn
                    outlined
                    rounded
                    text
                    color="deep-purple lighten-2"
                    to="/userServe"
                >
                  用户服务
                </v-btn>
              </v-card-actions>

              <v-card-actions>
                <v-btn
                    outlined
                    rounded
                    text
                    color="deep-purple lighten-2"
                    to="/mainPage"
                >
                  商城
                </v-btn>
              </v-card-actions>

            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <br>
      </v-row>

      <v-row justify="center" align="center">
        <v-col md="4" align-self="center">
          <v-card elevation="4">
            <v-row justify="center">
              <v-col md="8">
                <v-text-field v-if="editNickName"
                              name="newNickName"
                              v-model="newNickName"
                              label="新昵称"
                              hide-details="auto"></v-text-field>
                <v-row v-else justify="center">
                  {{nickName}}
                </v-row>
              </v-col>

            </v-row>

            <v-row justify="center">
              <v-card-actions>
                <v-btn
                    v-if="!editNickName"
                    elevation="2"
                    outlined
                    rounded
                    text
                    @click="tryEditNickName"
                >修改昵称</v-btn>
                <v-btn v-if="editNickName"
                       elevation="2"
                       outlined
                       rounded
                       text
                       @click="doEditNickName"
                >确认修改</v-btn>
                <v-btn v-if="editNickName"
                       elevation="2"
                       outlined
                       rounded
                       text
                       @click="giveUpEditNickName"
                >放弃修改</v-btn>
              </v-card-actions>
            </v-row>
          </v-card>
        </v-col>

        <v-col md="4" align-self="center">
          <v-card elevation="4">
            <v-row justify="center">
              <v-col md="8">
                <v-text-field v-if="editSignature"
                              name="newSignature"
                              v-model="newSignature"
                              label="新个性签名"
                              hide-details="auto"></v-text-field>
                <v-row v-else justify="center">
                  {{signature}}
                </v-row>
              </v-col>

            </v-row>

            <v-row justify="center">
              <v-card-actions>
                <v-btn
                    v-if="!editSignature"
                    elevation="2"
                    outlined
                    rounded
                    text
                    @click="tryEditSignature"
                >修改个性签名</v-btn>
                <v-btn v-if="editSignature"
                       elevation="2"
                       outlined
                       rounded
                       text
                       @click="doEditSignature"
                >确认修改</v-btn>
                <v-btn v-if="editSignature"
                       elevation="2"
                       outlined
                       rounded
                       text
                       @click="giveUpEditSignature"
                >放弃修改</v-btn>
              </v-card-actions>
            </v-row>
          </v-card>
        </v-col>


      </v-row>

      <v-row>
        <br>
      </v-row>

      <v-row justify="center" align="center">
        <v-col md="4" align-self="center">
          <v-card elevation="4">
            <v-row justify="center">
              <v-col md="8">
                <v-text-field v-if="editEmail"
                              name="newEmail"
                              v-model="newEmail"
                              label="新邮箱"
                              hide-details="auto"></v-text-field>
                <v-row v-else justify="center">
                  {{email}}
                </v-row>
              </v-col>

            </v-row>

            <v-row justify="center">
              <v-card-actions>
                <v-btn
                    v-if="!editEmail"
                    elevation="2"
                    outlined
                    rounded
                    text
                    @click="tryEditEmail"
                >修改邮箱</v-btn>
                <v-btn v-if="editEmail"
                       elevation="2"
                       outlined
                       rounded
                       text
                       @click="doEditEmail"
                >确认修改</v-btn>
                <v-btn v-if="editEmail"
                       elevation="2"
                       outlined
                       rounded
                       text
                       @click="giveUpEditEmail"
                >放弃修改</v-btn>
              </v-card-actions>
            </v-row>
          </v-card>
        </v-col>

        <v-col md="4" align-self="center">
          <v-card elevation="4">
            <v-row justify="center">
              <v-col md="8">
                <template v-if="editBirthday">
                  <div>
                    <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="date"
                            label="Birthday date"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                          v-model="date"
                          :active-picker.sync="activePicker"
                          :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                          min="1950-01-01"
                          @change="save"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                </template>

                <v-row v-else justify="center">
                  {{birthday}}
                </v-row>
              </v-col>

            </v-row>

            <v-row justify="center">
              <v-card-actions>
                <v-btn
                    v-if="!editBirthday"
                    elevation="2"
                    outlined
                    rounded
                    text
                    @click="tryEditBirthday"
                >修改生日</v-btn>
                <v-btn v-if="editBirthday"
                       elevation="2"
                       outlined
                       rounded
                       text
                       @click="doEditBirthday"
                >确认修改</v-btn>
                <v-btn v-if="editBirthday"
                       elevation="2"
                       outlined
                       rounded
                       text
                       @click="giveUpEditBirthday"
                >放弃修改</v-btn>
              </v-card-actions>
            </v-row>
          </v-card>
        </v-col>


        <v-col md="4" align-self="center">
          <v-card elevation="4">
            <v-row justify="center">
              <v-col md="8">
                <v-text-field v-if="editPhone"
                              name="newPhone"
                              v-model="newPhone"
                              label="新手机号码"
                              hide-details="auto"></v-text-field>
                <v-row v-else justify="center">
                  {{phone}}
                </v-row>
              </v-col>

            </v-row>

            <v-row justify="center">
              <v-card-actions>
                <v-btn
                    v-if="!editPhone"
                    elevation="2"
                    outlined
                    rounded
                    text
                    @click="tryEditPhone"
                >修改手机号码</v-btn>
                <v-btn v-if="editPhone"
                       elevation="2"
                       outlined
                       rounded
                       text
                       @click="doEditPhone"
                >确认修改</v-btn>
                <v-btn v-if="editPhone"
                       elevation="2"
                       outlined
                       rounded
                       text
                       @click="giveUpEditPhone"
                >放弃修改</v-btn>
              </v-card-actions>
            </v-row>
          </v-card>
        </v-col>

      </v-row>
    </div>
</template>

<script>

import {get_file_img} from "../api/file";
import {editUserImage, getAllUserData, getImgUrl, getUserInfo, updateUserData} from "../api/user";

export default {
  name: "userData",

  created() {
    this.myGetImg()
    this.getAllData()
  },

  data() {
    return {

      checkbox: false,
      activePicker: null,
      date: null,
      menu: false,
      dialog: false,


      img_url: '',
      imageName: 'end.png',
      userData: '',
      editImage: false,
      editNickName: false,
      editEmail: false,
      editBirthday: false,
      editPhone: false,
      editSignature: false,


      nickName: '',
      email: '',
      birthday: '',
      phone: '',
      id: '',
      signature: '',

      newImage: null,
      newNickName: '',
      newEmail: '',
      newBirthday: '',
      newPhone: '',
      newSignature: '',

    };
  },

  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },

  methods: {

    save (date) {
      this.$refs.menu.save(date)
    },

    async getAllData() {
      const Token = this.$store.getters.TokenStored;
      let res = await getAllUserData()
      this.userData = res.data
      this.nickName = this.userData.nickname
      this.email = this.userData.email
      this.birthday = this.userData.birthday
      this.phone = this.userData.phone
      this.id = this.userData.id
      this.signature = this.userData.signature
      await this.myGetImg()
    },

    async myGetImg() {
      this.img_url = this.$store.getters.Img_url;
    },

    async tryEditImage() {
      this.editImage = true
    },

    async doEditImage() {
      //console.log("doEditImage")
      //console.log(this.newImage)
      const formData = new FormData();
      formData.append("file", this.newImage)
      await editUserImage(formData)

      await this.myUpdateImg()
      this.$store.commit('setImgUrl', this.img_url)
      await this.myGetImg()

      this.editImage = false
      this.newImage = null
    },

    async giveUpEditImage() {
      this.editImage = false
      this.newImage = null
    },

    async tryEditNickName() {
      this.newNickName = this.nickName
      this.editNickName = true
    },

    async doEditNickName() {
      this.nickName = this.newNickName
      await updateUserData({
        birthday: this.birthday,
        email: this.email,
        id: this.id,
        nickname: this.nickName,
        phone: this.phone,
        signature: this.signature,
      })
      this.$store.commit("setNickName", this.nickName)
      this.editNickName = false
    },

    async giveUpEditNickName() {
      this.editNickName = false
    },

    async tryEditPhone() {
      this.newPhone = this.phone
      this.editPhone = true
    },

    async doEditPhone() {
      this.phone = this.newPhone
      await updateUserData({
        birthday: this.birthday,
        email: this.email,
        id: this.id,
        nickname: this.nickName,
        phone: this.phone,
        signature: this.signature,
      })
      this.editPhone = false
    },

    async giveUpEditPhone() {
      this.editPhone = false
    },

    async tryEditEmail() {
      this.newEmail = this.email
      this.editEmail = true
    },

    async doEditEmail() {
      this.email = this.newEmail
      await updateUserData({
        birthday: this.birthday,
        email: this.email,
        id: this.id,
        nickname: this.nickName,
        phone: this.phone,
        signature: this.signature,
      })
      this.editEmail = false
    },

    async giveUpEditEmail() {
      this.editEmail = false
    },

    async tryEditBirthday() {
      this.date = this.birthday
      this.editBirthday = true
    },

    async doEditBirthday() {
      this.birthday = this.date
      await updateUserData({
        birthday: this.birthday,
        email: this.email,
        id: this.id,
        nickname: this.nickName,
        phone: this.phone,
        signature: this.signature,
      })
      this.editBirthday = false
    },

    async giveUpEditBirthday() {
      this.editBirthday = false
    },

    async tryEditSignature() {
      this.newSignature = this.signature
      this.editSignature = true
    },

    async doEditSignature() {
      this.signature = this.newSignature
      await updateUserData({
        birthday: this.birthday,
        email: this.email,
        id: this.id,
        nickname: this.nickName,
        phone: this.phone,
        signature: this.signature
      })
      this.editSignature = false
    },

    async giveUpEditSignature() {
      this.editSignature = false
    },

    async myUpdateImg() {
      const id = this.$store.getters.Id;
      this.path = /(?<=http:\/\/49.235.193.150:8112\/file\/image\/).+$/

      let res = await getImgUrl({
        user: id
      })
      this.str = res.data
      this.imageName = this.path.exec(this.str)

      if (this.imageName) {
        this.img_url = await get_file_img({
          imageName: this.imageName,
        })
      } else {
        this.imageName = 'end.png'
      }
    },
  }
}
</script>

<style scoped>

</style>