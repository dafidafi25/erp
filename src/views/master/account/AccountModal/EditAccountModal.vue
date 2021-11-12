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
            <v-text-field label="Nama Akun 2*" required color="error"></v-text-field>
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
export default {
  props: ['data'],
  data() {
    return {
      nama_akun_1: null,
      nama_akun_2: null,
      id: this.data,
    }
  },
  methods: {
    updateData() {
      this.$store
        .dispatch('ADD_ACCOUNT', {
          account_name: this.nama_akun_1,
          account_name2: this.nama_akun_2,
          parent_flag: null,
          parent_id: null,
          active_flag: 1,
          neraca_flag: 1,
          status_flag: 1,
          primary_flag: 1,
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
        })
    },
  },
  mounted() {
    this.getDataId(this.id)
  },
  watch: {
    data(newVal) {
      this.getDataId(newVal)
    },
  },
}
</script>
