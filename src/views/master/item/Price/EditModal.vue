<template>
  <v-form lazy-validation ref="form" v-model="valid" aria-autocomplete="">
    <v-card-title>
      <span class="text-h5">Tambah Data</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-autocomplete
              label="Item"
              required
              color="error"
              v-model="item_id"
              :items="item_list"
              item-value="id"
              item-text="item_name"
              readonly
              item-color="error"
              hint="Read Only"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Harga Baru" required color="error" v-model="harga_baru" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Ongkos" required color="error" v-model="ongkos" />
          </v-col>
          <v-col cols="12">
            <v-radio-group v-model="diskon" row>
              <v-radio label="%" value="1" color="error"></v-radio>
              <v-radio label="RP" value="2" color="error"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" v-if="diskon != null">
            <v-text-field
              :label="diskon == 1 ? '% Diskon' : 'Rp Diskon'"
              required
              color="error"
              v-model="diskon_value"
              hint="Isi 0 Jika Tidak Ada"
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
  props: ['data', 'item_list'],
  data() {
    return {
      harga_baru: null,
      ongkos: null,
      is_default: 1,
      item_id: null,
      active_flag: 1,
      id: null,
      valid: null,
      diskon: null,
      diskon_value: null,
    }
  },
  methods: {
    updateData() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('UPDATE_PRICE_DATA', {
            id: this.id,
            item_id: this.item_id,
            harga_baru: this.harga_baru,
            ongkos: this.ongkos,
            disc_persen: this.diskon == 1 ? this.diskon_value : null,
            disc_price: this.diskon == 2 ? this.diskon_value : null,
            active_flag: 1,
          })
          .then(() => {
            this.$router.go()
          })
          .catch(err => console.log(err))
      }
    },
    async getItem(id) {
      await this.$store
        .dispatch('GET_PRICE_ID', { id: id })
        .then(res => (this.item_id = res.item_id))
        .catch(err => console.log(err))
    },
  },
  created() {
    EventBus.$on('onUpdate', value => {
      this.id = value
      this.getItem(this.id)
    })
  },
  mounted() {
    this.id = this.data
    this.getItem(this.id)
    console.log(this.item_list)
  },
}
</script>
