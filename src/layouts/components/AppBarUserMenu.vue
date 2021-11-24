<template>
  <v-menu
    offset-y
    left
    nudge-bottom="14"
    min-width="230"
    content-class="user-profile-menu-content"
    class="text--white ml-10"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="#fff" x-large text v-bind="attrs" v-on="on"> Halo {{ user.name.value }} </v-btn>
    </template>
    <v-list>
      <div class="pb-3 pt-2">
        <v-badge bottom color="success" overlap offset-x="12" offset-y="12" class="ms-4" dot>
          <v-avatar size="40px">
            <v-img :src="require('@/assets/images/avatars/1.png')"></v-img>
          </v-avatar>
        </v-badge>
        <div class="d-inline-flex flex-column justify-center ms-3" style="vertical-align:middle">
          <span class="text--primary font-weight-semibold mb-n1">
            {{ user.username.value }}
          </span>
          <small class="text--disabled text-capitalize">{{ user.role.value }}</small>
        </div>
      </div>

      <v-divider></v-divider>

      <!-- Profile -->
      <v-list-item link :to="{ name: 'pages-account-settings' }">
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiAccountOutline }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <!-- Ubah password -->

      <!-- Logout-->
      <v-list-item link @click="user_logout">
        <v-list-item-icon class="me-2">
          <v-icon size="22">
            {{ icons.mdiLogoutVariant }}
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mdiAccountOutline, mdiCogOutline, mdiLogoutVariant } from '@mdi/js'
import { ref } from '@vue/composition-api'

export default {
  setup() {
    const name = ref(localStorage.getItem('name'))
    const username = ref(localStorage.getItem('username'))
    const role = ref(localStorage.getItem('role'))
    return {
      user: {
        name,
        username,
        role,
      },
      icons: {
        mdiAccountOutline,
        mdiCogOutline,
        mdiLogoutVariant,
      },
    }
  },
  methods: {
    user_logout() {
      localStorage.clear()
      this.$router.replace('/login')
    },
  },
}
</script>

<style lang="scss">
.user-profile-menu-content {
  .v-list-item {
    min-height: 2.5rem !important;
  }
}
</style>
