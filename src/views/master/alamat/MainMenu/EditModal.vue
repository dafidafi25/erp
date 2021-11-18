<template>
  <v-form lazy-validation ref="form" v-model="valid">
    <v-card-title>
      <span class="text-h5">Update Data</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Alamat*"
              required
              :rules="[v => !!v || 'Alamat Tidak Boleh Kosong']"
              color="error"
              v-model="address"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Telepone" color="error" v-model="phone"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Fax" color="error" v-model="fax"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="NPWP" color="error" v-model="npwp"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              label="Provinsi*"
              item-text="name"
              item-value="id"
              required
              color="error"
              v-model="provinsi"
              :items="province_list"
              :rules="[v => !!v || 'Provinsi Tidak Boleh Kosong']"
              @input="onChangeProvince"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              label="Kota*"
              item-text="name"
              item-value="id"
              required
              color="error"
              v-model="city"
              :rules="[v => !!v || 'Pilih provinsi dahulu']"
              :items="list.kota"
              @input="onChangeProvince"
            ></v-autocomplete>
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
  props: ['data', 'province_list'],
  data() {
    return {
      valid: true,
      address: null,
      phone: null,
      fax: null,
      npwp: null,
      city: null,
      provinsi: null,
      active_flag: 1,
      ship_flag: 1,
      primary_ship_flag: 1,
      list: {
        kota: [],
      },
      id: this.data,
    }
  },

  methods: {
    updateData() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('UPDATE_ALAMAT', {
            id: this.id,
            address: this.address,
            phone: this.phone,
            fax: this.fax,
            npwp: this.npwp,
            city: this.city,
            province: this.provinsi,
            ship_flag: this.ship_flag,
            primary_ship_flag: this.primary_ship_flag,
          })
          .then(() => {
            this.$router.go()
          })
          .catch(err => console.log(err))
      }
    },
    async getDataId(id) {
      await this.$store
        .dispatch('GET_ALAMAT_ID', {
          id: id,
        })
        .then(res => {
          this.address = res.data.response_data.address
          this.phone = res.data.response_data.phone
          this.fax = res.data.response_data.fax
          this.npwp = res.data.response_data.npwp
          this.city = res.data.response_data.city
          this.provinsi = res.data.response_data.province
          this.active_flag = res.data.response_data.active_flag
          this.ship_flag = res.data.response_data.ship_flag
          this.primary_ship_flag = res.data.response_data.primary_ship_flag
        })
      this.$store
        .dispatch('GET_CITY_LIST', { province_id: this.provinsi })
        .then(res => (this.list.kota = res.data.response_data))
        .catch(err => console.log(err))
    },
    onChangeProvince() {
      this.$store
        .dispatch('GET_CITY_LIST', { province_id: this.provinsi })
        .then(res => (this.list.kota = res.data.response_data))
        .catch(err => console.log(err))
    },
  },
  mounted() {
    this.getDataId(this.data)
  },
  created() {
    EventBus.$on('onUpdate', value => {
      this.id = value
      this.getDataId(value)
    })
  },
}
</script>
