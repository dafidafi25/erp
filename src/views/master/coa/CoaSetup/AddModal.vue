<template>
  <v-form lazy-validation ref="form" v-model="valid">
    <v-card-title>
      <span class="text-h5">Tambah Data</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Program Akun"
              required
              color="error"
              v-model="program_account"
              :rules="[v => !!v || 'Program Akun Harus Diisi']"
            />
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              label="Coa"
              required
              color="error"
              v-model="coa_id"
              item-text="coa_name"
              item-value="id"
              :items="coa_list"
              :rules="[v => !!v || 'Data Coa Harus Terisi']"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Catatan" required color="error" v-model="note" />
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              label="Akun"
              required
              color="error"
              item-text="account_name"
              item-value="id"
              :items="account_list"
              :rules="[v => !!v || 'Data Account Harus Terisi']"
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
  props: ['account_list', 'coa_list'],
  data() {
    return {
      program_account: '',
      coa_id: null,
      note: '',
      account_id: null,
      valid: true,
    }
  },
  methods: {
    createData() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('CREATE_COA_SETUP', {
            coa_id: this.coa_id,
            program_account: this.program_account,
            note: this.note,
            account_id: this.account_id,
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
