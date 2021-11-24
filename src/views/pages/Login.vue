<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link to="/" class="d-flex align-center">
            <v-img
              :src="require('@/assets/Hokky.png')"
              max-height="300px"
              max-width="300px"
              alt="logo"
              contain
              class="me-3 "
            ></v-img>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text class="d-flex text-center">
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Selamat Datang Di Hokky Bangunan
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text v-if="!forgot_form">
          <v-form lazy-validation ref="form" v-model="valid" @submit.prevent="login_auth">
            <v-text-field
              v-model="email"
              outlined
              label="Email atau Username"
              hide-details
              class="mb-3"
              color="error"
              :rules="[v => !!v || 'Username Tidak Bisa Kosong']"
            ></v-text-field>

            <v-text-field
              v-model="password"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              placeholder="············"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
              color="error"
              :rules="[v => !!v || 'Username Tidak Bisa Kosong']"
            ></v-text-field>

            <div class="d-flex align-center justify-space-between flex-wrap">
              <v-checkbox label="Remember Me" hide-details class="me-3 mt-1" color="error"> </v-checkbox>

              <!-- forgot link -->
              <a class="mt-1" style="color:#FF4C51" color="error" @click="forgot_form = !forgot_form">
                Forgot Password
              </a>
            </div>
            <vue-recaptcha :sitekey="site_key" class="mt-1"></vue-recaptcha>

            <v-btn block color="error" class="mt-6" type="submit">
              Login
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- forgot form -->
        <v-card-text v-if="forgot_form">
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="email"
              outlined
              label="Masukan Email Yang Terdaftar"
              hide-details
              class="mb-3"
              color="error"
              :rules="[v => !!v || 'Username Tidak Bisa Kosong']"
            ></v-text-field>
            <!-- forgot link -->
            <a
              class="mt-1"
              style="color:#FF4C51"
              color="error"
              @click="forgot_form = !forgot_form"
              :rules="[v => !!v || 'Password Tidak Bisa Kosong']"
            >
              Back
            </a>
            <v-btn block color="error" class="mt-6" @click="login_auth">
              Forgot Password
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import VueRecaptcha from 'vue-recaptcha'
import VueJwtDecode from 'vue-jwt-decode'

export default {
  setup() {
    const isPasswordVisible = ref(false)
    const email = ref('')
    const password = ref('')
    const forgot_form = ref(false)
    const site_key = process.env.VUE_APP_SITE_KEY
    const valid = ref(true)

    return {
      isPasswordVisible,
      email,
      password,
      forgot_form,
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
      site_key,
      valid,
      VueJwtDecode,
    }
  },
  methods: {
    login_auth() {
      if (this.$refs.form.validate()) {
        // console.log('Masok')
        this.$store
          .dispatch('LOGIN', {
            usernameOrEmail: this.email,
            password: this.password,
            status: this.forgot_form,
            captcha: null,
          })
          .then(res => {
            if (res.data.message == 'Login Successfully') {
              localStorage.setItem('token', res.data.response_data.token)
              localStorage.setItem('refreshToken', res.data.refreshToken)
              localStorage.setItem('department', VueJwtDecode.decode(localStorage.getItem('token')))
              localStorage.setItem('password', this.password)
              localStorage.setItem('department', VueJwtDecode.decode(localStorage.getItem('token')).sub)
              axios.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')
              this.getUserInfo()
            }
          })
      }
    },
    getUserInfo() {
      this.$store
        .dispatch('GET_USER_PROFILE')
        .then(res => {
          localStorage.setItem('role', res.data.authorities[0].authority)
          localStorage.setItem('username', res.data.name)
          localStorage.setItem('name', res.data.name)
          this.$router.push('/')
        })
        .catch(err => {})
    },
  },
  components: { VueRecaptcha },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
