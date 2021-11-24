<template>
  <v-form lazy-validation ref="form" v-model="valid" aria-autocomplete="">
    <v-card-title>
      <span class="text-h5">Tambah Data</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Username" required color="error" v-model="username" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="name" required color="error" v-model="name" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="email" required color="error" v-model="email" />
          </v-col>
          <v-col cols="12">
            <v-radio-group v-model="gender">
              <v-radio
                v-for="n in 2"
                :key="n"
                :label="n == 1 ? 'Laki-Laki' : 'Perempuan'"
                :value="n"
                color="error"
                row
              ></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              label="Role"
              required
              color="error"
              :items="role_list"
              item-text="name"
              item-value="roleId"
              v-model="role"
            />
          </v-col>
          <v-col cols="12">
            <v-radio-group v-model="is_karyawan">
              <v-radio
                v-for="n in 2"
                :key="n"
                :label="n == 1 ? 'Karyawan' : 'Bukan Karyawan'"
                :value="n"
                color="error"
                row
              ></v-radio>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-container>
      <small>*Harus Diisi</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="$emit('onUpdateClicked')">
        Tutup
      </v-btn>
      <v-btn color="blue darken-1" text @click="updateData()">
        Simpan
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
import { EventBus } from './event-bus.js'
export default {
  props: ['role_list', 'data'],
  data() {
    return {
      username: null,
      name: null,
      email: null,
      password: null,
      re_password: null,
      gender: 1,
      is_karyawan: null,
      role: null,
      description: null,
      valid: null,
      id: null,
      radioGroup: 1,
    }
  },
  methods: {
    updateData() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('UPDATE_USER', {
            id: this.id,
            username: this.username,
            name: this.name,
            email: this.email,
            password: this.password,
            gender: this.gender,
            is_karyawan: this.is_karyawan,
            role: this.role,
          })
          .then(() => {
            this.$router.go()
          })
          .catch(err => console.log(err))
      }
    },
    async getDataId(id) {
      await this.$store
        .dispatch('GET_USER_ID', {
          id: id,
        })
        .then(res => {
          this.username = res.data.response_data.username
          this.name = res.data.response_data.name
          this.email = res.data.response_data.email
          this.password = 123
          this.gender = res.data.response_data.gender
          this.is_karyawan = res.data.response_data.is_karyawan
          this.role = res.data.response_data.roles[0].roleId
          this.description = res.data.response_data.description
        })
    },
  },
  created() {
    EventBus.$on('onUpdate', value => {
      this.id = value
      this.getDataId(value)
    })
  },
  mounted() {
    this.id = this.data
    this.getDataId(this.id)
  },
}
</script>
