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
          <v-form>
            <v-text-field
              v-model="email"
              outlined
              label="Email atau Username"
              hide-details
              class="mb-3"
              color="error"
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
            ></v-text-field>

            <div class="d-flex align-center justify-space-between flex-wrap">
              <v-checkbox label="Remember Me" hide-details class="me-3 mt-1" color="error"> </v-checkbox>

              <!-- forgot link -->
              <a class="mt-1" style="color:#FF4C51" color="error" @click="forgot_form = !forgot_form">
                Forgot Password
              </a>
            </div>
            <vue-recaptcha :sitekey="site_key" class="mt-1"></vue-recaptcha>

            <v-btn block color="error" class="mt-6" @click="login_auth">
              Login
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- forgot form -->
        <v-card-text v-if="forgot_form">
          <v-form>
            <v-text-field
              v-model="email"
              outlined
              label="Masukan Email Yang Terdaftar"
              hide-details
              class="mb-3"
              color="error"
            ></v-text-field>
            <!-- forgot link -->
            <a class="mt-1" style="color:#FF4C51" color="error" @click="forgot_form = !forgot_form">
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

export default {
  setup() {
    const isPasswordVisible = ref(false)
    const email = ref('')
    const password = ref('')
    const forgot_form = ref(false)
    const site_key = process.env.VUE_APP_SITE_KEY

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
    }
  },
  methods: {
    login_auth() {
      console.log(this.email)
      this.$router.replace('/home')
    },
  },
  components: { VueRecaptcha },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
