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
      <v-btn color="blue darken-1" text @click="$emit('onAddClicked')">
        Tutup
      </v-btn>
      <v-btn color="blue darken-1" text @click="createData()">
        Simpan
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      uom_code: null,
      description: null,
      valid: true,
    }
  },
  methods: {
    createData() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('REGISTER_SATUAN', {
            uom_code: this.uom_code,
            description: this.description,
          })
          .then(() => {
            this.$router.go()
          })
          .catch(err => console.log(err))
      }
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}-${month}-${year}`
    },
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
    },
  },
}
</script>
