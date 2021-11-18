<template>
  <div>
    <v-card-title>
      <span class="text-h5">Update Data</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Nama Akun 1*" required color="error" v-model="nama_akun_1" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Nama Akun 2*" required color="error" v-model="nama_akun_2"></v-text-field>
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
  </div>
</template>

<script>
import { EventBus } from './event-bus.js'
export default {
  props: ['data'],
  data() {
    return {
      nama_akun_1: null,
      nama_akun_2: null,
      parent_flag: null,
      parent_id: null,
      active_flag: null,
      neraca_flag: null,
      status_flag: null,
      primary_flag: null,
      id: this.data,
    }
  },

  methods: {
    updateData() {
      this.$store
        .dispatch('UPDATE_ACCOUNT', {
          account_name: this.nama_akun_1,
          account_name2: this.nama_akun_2,
          parent_flag: this.parent_flag,
          parent_id: this.parent_id,
          active_flag: this.active_flag,
          neraca_flag: this.neraca_flag,
          status_flag: this.status_flag,
          primary_flag: this.primary_flag,
          id: this.id,
        })
        .then(() => {
          this.$router.go()
        })
        .catch(err => console.log(err))
    },
    getDataId(id) {
      this.$store
        .dispatch('GET_ACCOUNT_ID', {
          id: id,
        })
        .then(res => {
          this.nama_akun_1 = res.data.response_data.account_name
          this.nama_akun_2 = res.data.response_data.account_name2
          this.parent_flag = res.data.response_data.parent_flag
          this.parent_id = res.data.response_data.parent_id
          this.active_flag = res.data.response_data.active_flag
          this.neraca_flag = res.data.response_data.neraca_flag
          this.status_flag = res.data.response_data.status_flag
          this.primary_flag = res.data.response_data.primary_flag
        })
    },
  },
  mounted() {
    this.getDataId(this.data)
  },
  created() {
    EventBus.$on('onUpdate', value => {
      this.id = value
      console.log(this.id)
      this.getDataId(value)
    })
  },
}
</script>
