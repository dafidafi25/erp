<template>
  <v-form lazy-validation ref="form" v-model="valid" aria-autocomplete="">
    <v-card-title>
      <span class="text-h5">Tambah Data</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Nama Kategori" required color="error" v-model="name" />
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              label="Merek"
              required
              color="error"
              v-model="merek_id"
              :items="merek_item_list"
              item-text="name"
              item-value="id"
              @input="getSubMerekList()"
            />
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              label="Sub Merek"
              required
              color="error"
              v-model="sub_merek_id"
              :items="list.sub_merek"
              item-text="name"
              item-value="id"
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
      name: null,
      merek_id: null,
      sub_merek_id: null,
      valid: null,
      list: {
        sub_merek: [],
      },
    }
  },
  methods: {
    createData() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('ADD_ITEM_KATEGORI', {
            name: this.name,
            merek_id: this.merek_id,
            sub_merek_id: this.sub_merek_id,
          })
          .then(() => {
            this.$router.go()
          })
          .catch(err => console.log(err))
      }
    },
    getSubMerekList() {
      this.$store
        .dispatch('GET_SUB_MEREK_LIST', {
          merek_id: this.merek_id,
        })
        .then(res => (this.list.sub_merek = res.data.response_data))
        .catch(err => console.log(err))
    },
  },
}
</script>
