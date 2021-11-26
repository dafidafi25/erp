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
              @input="gerSubMerekList()"
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
      name: null,
      merek_id: null,
      sub_merek_id: null,
      id: null,
      valid: null,
      list: {
        sub_merek: [],
      },
    }
  },
  methods: {
    updateData() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('UPDATE_SUB_MEREK', {
            id: this.id,
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
    getDataId(id) {
      this.$store
        .dispatch('GET_ITEM_KATEGORI_ID', {
          id: id,
        })
        .then(res => {
          this.name = res.data.response_data.name
          this.merek_id = res.data.response_data.merek_id
          this.sub_merek_id = res.data.response_data.sub_merek_id
          this.getSubMerekList()
        })
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
