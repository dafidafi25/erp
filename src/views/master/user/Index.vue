<template>
  <div>
    <v-card class="rounded-0" style="margin-top:62px">
      <main-menu @onLoading="loadingDialog" />

      <!-- loading Dialog -->
    </v-card>

    <v-dialog width="300" v-model="loading" persistent>
      <v-card color="error">
        <v-card-text>
          Loading
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import MainMenu from './MainMenu/MainMenu.vue'
export default {
  data() {
    return {
      loading: null,
      TriggerAddModal: null,
      updateModal: null,
      data: null,
      tab: null,
      tabs: [
        {
          title: 'User',
        },
      ],
    }
  },
  components: {
    MainMenu,
  },
  methods: {
    loadingDialog(value) {
      this.loading = value
    },
  },
}
</script>
