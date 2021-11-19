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
            <v-text-field label="Saldo COA" required color="error" v-model="coa_saldo" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Debet COA" required color="error" v-model="coa_debet" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Kredit COA" required color="error" v-model="coa_credit" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Periode" required color="error" v-model="period_name" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Saldo Akun" required color="error" v-model="a_saldo" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Saldo Debet" required color="error" v-model="a_debet" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Saldo Kredit" required color="error" v-model="a_credit" />
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
  props: ['coa_list', 'account_list', 'data'],
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      dateFormatted: this.formatDate(
        new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      ),
      menu1: false,
      coa_id: null,
      balance_date: null,
      coa_saldo: null,
      coa_debet: null,
      coa_credit: null,
      period_name: null,
      a_saldo: null,
      a_debet: null,
      a_credit: null,
      valid: true,
      id: null,
    }
  },
  methods: {
    updateData() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('UPDATE_COA', {
            id: this.id,
            coa_id: this.coa_id,
            balance_date: this.dateFormatted,
            coa_saldo: this.coa_saldo,
            coa_debet: this.coa_debet,
            coa_credit: this.coa_credit,
            period_name: this.period_name,
            a_saldo: this.a_saldo,
            a_debet: this.a_debet,
            a_credit: this.a_credit,
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
    async getDataId(id) {
      console.log(id)
      await this.$store
        .dispatch('GET_COA_ID', {
          id: id,
        })
        .then(res => {
          this.coa_id = res.data.response_data.coa_id
          this.balance_date = res.data.response_data.balance_date
          this.coa_saldo = res.data.response_data.coa_saldo
          this.coa_debet = res.data.response_data.coa_debet
          this.coa_credit = res.data.response_data.coa_credit
          this.period_name = res.data.response_data.period_name
          this.a_saldo = res.data.response_data.a_saldo
          this.a_debet = res.data.response_data.a_debet
          this.a_credit = res.data.response_data.a_credit
          this.dateFormatted = this.balance_date
        })
    },
  },
  computedDateFormatted() {
    return this.formatDate(this.date)
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
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
