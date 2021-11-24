<template>
  <v-form lazy-validation ref="form" v-model="valid" aria-autocomplete="">
    <v-card-title>
      <span class="text-h5">Tambah Data</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Nilai" required color="error" v-model="nilai" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Keterangan" required color="error" v-model="keterangan" />
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
      nilai: null,
      keterangan: null,
      is_default: null,
      active_flag: null,
      id: null,
      valid: null,
    }
  },
  methods: {
    updateData() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('UPDATE_ITEM_GRADE', {
            id: this.id,
            nilai: this.nilai,
            keterangan: this.keterangan,
            is_default: this.is_default,
            active_flag: this.active_flag,
          })
          .then(() => {
            this.$router.go()
          })
          .catch(err => console.log(err))
      }
    },
    async getDataId(id) {
      await this.$store
        .dispatch('GET_ITEM_GRADE_ID', {
          id: id,
        })
        .then(res => {
          this.nilai = res.data.response_data.nilai
          this.keterangan = res.data.response_data.keterangan
          this.is_default = res.data.response_data.is_default
          this.active_flag = res.data.response_data.active_flag
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
