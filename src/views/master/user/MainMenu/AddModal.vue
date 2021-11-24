<template>
  <v-form lazy-validation ref="form" v-model="valid" aria-autocomplete="">
    <v-card-title>
      <span class="text-h5">Tambah Data</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Username" required color="error" v-model="username" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="name" required color="error" v-model="name" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="email" required color="error" v-model="email" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Password" required color="error" type="password" v-model="password" />
          </v-col>
          <v-col cols="12">
            <v-text-field label="Masukan Ulang Password" required color="error" v-model="re_password" />
          </v-col>
          <v-radio-group v-model="gender" row>
            <v-radio label="Laki-Laki" value="1" color="error"></v-radio>
            <v-radio label="Perempuan" value="2" color="error"></v-radio>
          </v-radio-group>
          <v-col cols="12">
            <v-autocomplete
              label="Role"
              required
              color="error"
              :items="role_list"
              item-text="name"
              item-value="roleId"
              v-model="role"
            />
          </v-col>
          <v-radio-group v-model="is_karyawan" row>
            <v-radio label="Karyawan" value="1" color="error"></v-radio>
            <v-radio label="Bukan Karyawan" value="2" color="error"></v-radio>
          </v-radio-group>
          <v-col cols="12" v-if="karyawanValdiation">
            <v-autocomplete
              label="Department"
              required
              color="error"
              :items="department_list"
              item-text="department_name"
              item-value="id"
              v-model="dept_id"
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
  props: ['department_list', 'role_list'],
  data() {
    return {
      username: null,
      name: null,
      email: null,
      password: null,
      re_password: null,
      gender: null,
      is_karyawan: null,
      role: null,
      description: null,
      dept_id: null,
      valid: null,
    }
  },
  methods: {
    createData() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('REGISTER_USER', {
            username: this.username,
            name: this.name,
            email: this.email,
            password: this.password,
            gender: this.gender,
            is_karyawan: this.is_karyawan,
            role: this.role,
            description: this.description,
            dept_id: this.dept_id,
          })
          .then(() => {
            this.$router.go()
          })
          .catch(err => console.log(err))
      }
    },
  },
  computed: {
    karyawanValdiation() {
      if (this.is_karyawan == 1) {
        this.dept_id = null
        return true
      }
    },
  },
}
</script>
