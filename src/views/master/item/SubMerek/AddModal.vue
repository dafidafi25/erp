<template>
  <v-form lazy-validation ref="form" v-model="valid" aria-autocomplete="">
    <v-card-title>
      <span class="text-h5">Tambah Data</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Sub Merek" required color="error" v-model="name" />
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              label="Merek Item"
              required
              color="error"
              v-model="merek_id"
              :items="merek_item_list"
              item-text="name"
              item-value="id"
              item-color="error"
            />
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
  props: ['merek_item_list'],
  data() {
    return {
      merek_id: null,
      name: null,
      valid: null,
    }
  },
  methods: {
    createData() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('CREATE_SUB_MEREK', {
            merek_id: this.merek_id,
            name: this.name,
          })
          .then(() => {
            this.$router.go()
          })
          .catch(err => console.log(err))
      }
    },
  },
}
</script>
