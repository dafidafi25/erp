<template>
  <v-form lazy-validation ref="form" v-model="valid" aria-autocomplete="">
    <v-card-title>
      <span class="text-h5">Edit Data</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Name*"
              required
              color="error"
              v-model="name"
              :rules="[v => !!v || 'Nama Harus Diisi']"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Keterangan" required color="error" v-model="keterangan" />
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Hari"
              required
              color="error"
              v-model="hari"
              :rules="[v => !!v || 'Hari Harus Diisi']"
            />
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
  props: ['data'],
  data() {
    return {
      name: null,
      keterangan: null,
      hari: null,
      valid: true,
      id: null,
    }
  },
  methods: {
    updateData() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('UPDATE_JANGKA_WAKTU', {
            id: this.id,
            name: this.name,
            keterangan: this.keterangan,
            hari: this.hari,
            active_flag: this.active_flag,
            is_default: this.is_default,
          })
          .then(() => {
            this.$router.go()
          })
          .catch(err => console.log(err))
      }
    },
    async getDataId(id) {
      await this.$store
        .dispatch('GET_JANGKA_WAKTU_ID', {
          id: id,
        })
        .then(res => {
          this.name = res.data.response_data.name
          this.keterangan = res.data.response_data.keterangan
          this.hari = res.data.response_data.hari
          this.active_flag = res.data.response_data.active_flag
          this.is_default = res.data.response_data.is_default
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
