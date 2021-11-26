<template>
  <div>
    <v-card class="rounded-0" style="margin-top:62px">
      <v-tabs v-model="tab" show-arrows color="error">
        <v-tab v-for="(tab, index) in tabs" :key="index">
          <span>{{ tab.title }}</span>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" touchless>
        <v-tab-item>
          <main-menu @onLoading="loadingDialog" />
        </v-tab-item>
        <v-tab-item>
          <grade @onLoading="loadingDialog" />
        </v-tab-item>
        <v-tab-item>
          <merek @onLoading="loadingDialog" />
        </v-tab-item>
        <v-tab-item>
          <sub-merek @onLoading="loadingDialog" />
        </v-tab-item>
        <v-tab-item>
          <kategori @onLoading="loadingDialog" />
        </v-tab-item>
        <v-tab-item>
          <tipe @onLoading="loadingDialog" />
        </v-tab-item>
        <v-tab-item>
          <price @onLoading="loadingDialog" />
        </v-tab-item>
      </v-tabs-items>
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
import Kategori from './Kategori/MainMenu.vue'
import Grade from './Grade/MainMenu.vue'
import Tipe from './Type/MainMenu.vue'
import Price from './Price/MainMenu.vue'
import Merek from './Merek/MainMenu.vue'
import SubMerek from './SubMerek/MainMenu.vue'

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
          title: 'Item',
        },

        {
          title: 'Grade',
        },
        {
          title: 'Merek',
        },

        {
          title: 'Sub Merek',
        },

        {
          title: 'Kategori',
        },
        {
          title: 'Tipe',
        },
        {
          title: 'Price',
        },
      ],
    }
  },
  components: {
    MainMenu,
    Kategori,
    Grade,
    Tipe,
    Price,
    Merek,
    SubMerek,
  },
  methods: {
    loadingDialog(value) {
      this.loading = value
    },
  },
}
</script>
