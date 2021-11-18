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
  props: ['province_list'],
  data() {
    return {
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
      valid: true,
    }
  },
  methods: {
    createData() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('ADD_ALAMAT', {
            address: this.address,
            phone: this.phone,
            fax: this.fax,
            npwp: this.npwp,
            city: this.city,
            province: this.provinsi,
            active_flag: this.active_flag,
            ship_flag: this.ship_flag,
            primary_ship_flag: this.primary_ship_flag,
          })
          .then(() => {
            this.$router.go()
          })
          .catch(err => console.log(err))
      }
    },
    onChangeProvince() {
      this.$store
        .dispatch('GET_CITY_LIST', { province_id: this.provinsi })
        .then(res => (this.list.kota = res.data.response_data))
        .catch(err => console.log(err))
    },
  },
}
</script>
