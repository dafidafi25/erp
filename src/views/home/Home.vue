<template>
  <v-card style="margin-top:62px" class="rounded-0">
    <div class="d-flex flex-column justify-space-between align-center py-10">
      <v-img src="../../assets/Hokky.png"></v-img>
      <h1 class="mt-10 ">SELAMAT DATANG {{ firstname }}</h1>
    </div>
  </v-card>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { ref } from '@vue/composition-api'

export default {
  setup() {
    const firstname = ref(localStorage.getItem('name'))
    const email = ref('')
    const mobile = ref()
    const password = ref()
    const checkbox = ref(false)

    return {
      firstname,
      email,
      mobile,
      password,
      checkbox,
    }
  },
}
</script>
