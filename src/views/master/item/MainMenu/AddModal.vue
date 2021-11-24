<template>
  <v-form lazy-validation ref="form" v-model="valid">
    <v-card-title>
      <span class="text-h5">Tambah Data</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-autocomplete
              label="Gudang*"
              required
              color="error"
              v-model="warehouse_id"
              :items="warehouse_list"
              item-text="name"
              item-value="id"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Nama Item*"
              required
              color="error"
              v-model="item_name"
              :rules="[v => !!v || 'Nama Item Tidak Boleh Kosong']"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Deskripsi Item" required color="error" v-model="item_description" />
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              label="Supplier*"
              required
              color="error"
              v-model="person_id"
              :items="person_list"
              item-text="person_name"
              item-value="id"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Nomor Part" color="error" v-model="part_number" />
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              label="Satuan*"
              required
              color="error"
              v-model="uom_id"
              :items="uom_list"
              item-text="uom_code"
              item-value="id"
            />
          </v-col>

          <v-col cols="12">
            <v-autocomplete
              label="Grade*"
              required
              color="error"
              v-model="grade_id"
              :items="grade_list"
              item-text="nilai"
              item-value="id"
            />
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              label="Account*"
              required
              color="error"
              v-model="account_id"
              item-text="account_name"
              item-value="id"
              :items="account_list"
            />
          </v-col>

          <v-col cols="12">
            <v-autocomplete
              label="Merek*"
              required
              color="error"
              v-model="merek_id"
              :items="merek_list"
              item-text="name"
              item-value="id"
              @input="getKategoriList()"
            />
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              label="Kategori*"
              required
              color="error"
              v-model="kategori_id"
              :items="list.kategori"
              item-text="name"
              item-value="id"
              @input="getTypeList()"
            />
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              label="Tipe*"
              required
              color="error"
              v-model="tipe_id"
              :items="list.tipe"
              item-text="type_name"
              item-value="id"
            />
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              label="Coa"
              required
              color="error"
              v-model="coa_id"
              :items="coa_list"
              item-text="coa_name"
              item-value="id"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Panjang" required color="error" v-model="panjang" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Lebar" required color="error" v-model="lebar" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Tinggi" required color="error" v-model="tinggi" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Stock*" required color="error" v-model="stock" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Harga Jual*" required color="error" v-model="harga_jual" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Harga Beli*" required color="error" v-model="harga_beli" />
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
  props: ['warehouse_list', 'person_list', 'uom_list', 'grade_list', 'account_list', 'merek_list', 'coa_list'],
  data() {
    return {
      list: {
        kategori: [],
        tipe: [],
      },
      item_name: null,
      item_description: null,
      person_id: null,
      part_number: null,
      uom_id: null,
      active_flag: null,
      kategori_id: null,
      grade_id: null,
      account_id: null,
      tipe_id: null,
      merek_id: null,
      barcode: null,
      is_default: null,
      coa_id: null,
      bom_flag: null,
      panjang: null,
      lebar: null,
      tinggi: null,
      stock: null,
      harga_jual: null,
      harga_beli: null,
      warehouse_id: null,
      valid: null,
    }
  },
  methods: {
    createData() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('ADD_ITEM', {
            item_name: this.item_name,
            item_description: this.item_description,
            person_id: this.person_id,
            part_number: this.part_number,
            uom_id: this.uom_id,
            active_flag: this.active_flag,
            kategori_id: this.kategori_id,
            grade_id: this.grade_id,
            account_id: this.account_id,
            tipe_id: this.tipe_id,
            merek_id: this.merek_id,
            barcode: this.barcode,
            is_default: this.is_default,
            coa_id: this.coa_id,
            bom_flag: this.bom_flag,
            panjang: this.panjang,
            lebar: this.lebar,
            tinggi: this.tinggi,
            stock: this.stock,
            harga_jual: this.harga_jual,
            harga_beli: this.harga_beli,
            warehouse_id: this.warehouse_id,
          })
          .then(() => {
            this.$router.go()
          })
          .catch(err => console.log(err))
      }
    },
    getKategoriList() {
      console.log(this.merek_id)
      this.$store
        .dispatch('GET_ITEM_KATEGORI_LIST', { merek_id: this.merek_id })
        .then(res => (this.list.kategori = res.data.response_data))
        .catch(err => console.log(err))
    },
    getTypeList() {
      this.$store
        .dispatch('GET_ITEM_TYPE_LIST', { kategori_id: this.kategori_id })
        .then(res => (this.list.tipe = res.data.response_data))
        .catch(err => console.log(err))
    },
  },
}
</script>
