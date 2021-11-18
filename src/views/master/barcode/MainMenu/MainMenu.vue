<template>
  <div>
    <!-- basic -->

    <index-table @onLoading="loadingDialog"></index-table>

    <!-- loading Dialog -->
    <v-dialog width="300" v-model="loading">
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
import IndexTable from './IndexTable.vue'

export default {
  data() {
    return {
      loading: null,
    }
  },
  components: {
    IndexTable,
  },
  methods: {
    loadingDialog(value) {
      this.$emit('onLoading', value)
    },
  },
  mounted() {
    this.getList()
  },
}
</script>
