<template>
  <v-form lazy-validation ref="form" v-model="valid" aria-autocomplete="">
    <v-card-title>
      <span class="text-h5">Tambah Data</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Satuan*"
              required
              color="error"
              v-model="uom_code"
              :rules="[v => !!v || 'Satuan Harus Diisi']"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Deskripsi" required color="error" v-model="description" />
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
      uom_code: null,
      description: null,
      valid: true,
      id: null,
    }
  },
  methods: {
    updateData() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('UPDATE_SATUAN', {
            id: this.id,
            uom_code: this.uom_code,
            description: this.description,
            base_uom_flag: 1,
            active_flag: 1,
            primary_flag: 1,
          })
          .then(() => {
            this.$router.go()
          })
          .catch(err => console.log(err))
      }
    },
    async getDataId(id) {
      await this.$store
        .dispatch('GET_SATUAN_ID', {
          id: id,
        })
        .then(res => {
          this.uom_code = res.data.response_data.uom_code
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
