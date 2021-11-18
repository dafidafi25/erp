<template>
  <v-form lazy-validation ref="form" v-model="valid" aria-autocomplete="">
    <v-card-title>
      <span class="text-h5">Tambah Data</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Kode Asset" required color="error" v-model="asset_code" />
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Nama Asset*"
              color="error"
              v-model="asset_name"
              :rules="[v => !!v || 'Nama Asset Tidak Boleh Kosong']"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Kuantitas" color="error" v-model="entered_qty"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Note" color="error" v-model="nilai_asset"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field label="Nilai Asset" color="error" v-model="note"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateFormatted"
                  label="Date"
                  hint="dd-mm-yy format"
                  persistent-hint
                  v-bind="attrs"
                  @blur="date = parseDate(dateFormatted)"
                  v-on="on"
                  color="error"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title @input="menu1 = false" color="error"></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              label="Tipe Asset*"
              item-text="name"
              item-value="id"
              required
              color="error"
              v-model="asset_type_id"
              :items="asset_type_list"
              :rules="[v => !!v || 'Tipe Asset Tidak Boleh Kosong']"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              label="Department*"
              item-text="department_name"
              item-value="id"
              required
              color="error"
              v-model="department_id"
              :rules="[v => !!v || 'Department Tidak Boleh Kosong']"
              :items="department_list"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              label="COA*"
              item-text="coa_name"
              item-value="id"
              required
              color="error"
              v-model="coa_id"
              :rules="[v => !!v || 'COA Tidak Boleh Kosong']"
              :items="coa_list"
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
  props: ['department_list', 'coa_list', 'asset_type_list'],
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      dateFormatted: this.formatDate(
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      ),
      menu1: false,
      asset_code: null,
      asset_name: null,
      entered_qty: null,
      nilai_asset: null,
      note: null,
      buying_date: null,
      asset_type_id: null,
      department_id: null,
      coa_id: null,
      active_flag: 1,
      valid: true,
    }
  },
  methods: {
    createData() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('CREATE_ASSET', {
            asset_code: this.asset_code,
            asset_name: this.asset_name,
            entered_qty: this.entered_qty,
            nilai_asset: this.nilai_asset,
            note: this.note,
            buying_date: this.dateFormatted,
            asset_type_id: this.asset_type_id,
            department_id: this.department_id,
            coa_id: this.coa_id,
            active_flag: this.active_flag,
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
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
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
