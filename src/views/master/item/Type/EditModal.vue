<template>
  <v-form lazy-validation ref="form" v-model="valid" aria-autocomplete="">
    <v-card-title>
      <span class="text-h5">Edit Data</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Nilai" required color="error" v-model="type_name" />
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
              @input="getList"
            />
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              label="Kategori Item"
              required
              color="error"
              v-model="kategori_id"
              :items="list.kategori"
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
  props: ['merek_item_list', 'data'],
  data() {
    return {
      type_name: null,
      merek_id: null,
      kategori_id: null,
      id: null,
      valid: null,
      list: {
        kategori: [],
      },
    }
  },
  methods: {
    updateData() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('UPDATE_ITEM_TYPE', {
            id: this.id,
            type_name: this.type_name,
            merek_id: this.merek_id,
            kategori_id: this.kategori_id,
          })
          .then(() => {
            this.$router.go()
          })
          .catch(err => console.log(err))
      }
    },
    async getDataId(id) {
      await this.$store
        .dispatch('GET_ITEM_TYPE_ID', {
          id: id,
        })
        .then(res => {
          this.type_name = res.data.response_data.type_name
          this.merek_id = res.data.response_data.merek_id
          this.kategori_id = res.data.response_data.kategori_id
          this.getList()
        })
    },
    getList() {
      this.$store
        .dispatch('GET_ITEM_KATEGORI_LIST', {
          merek_id: this.merek_id,
        })
        .then(res => (this.list.kategori = res.data.response_data))
        .catch(err => console.log(err))
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
