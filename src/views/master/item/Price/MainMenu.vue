<template>
  <div>
    <!-- basic -->

    <index-table @onLoading="loadingDialog" @onDeleteClicked="deleteItem" @onUpdateClicked="updateItem"></index-table>

    <!-- loading Dialog -->
    <v-dialog width="300" v-model="loading">
      <v-card color="error">
        <v-card-text>
          Loading
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- edit Dialog -->
    <v-dialog max-width="600px" v-model="TriggerUpdateModal">
      <v-card>
        <edit-modal @onUpdateClicked="updateItem" :data="data" :item_list="item_list" />
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import IndexTable from './IndexTable.vue'
import AddModal from './AddModal.vue'
import EditModal from './EditModal.vue'
import { EventBus } from './event-bus.js'

export default {
  data() {
    return {
      loading: null,
      TriggerAddModal: null,
      TriggerUpdateModal: null,
      data: null,
      item_list: [],
    }
  },
  components: {
    IndexTable,
    AddModal,
    EditModal,
  },
  methods: {
    deleteItem(index) {
      console.log(index)
    },
    loadingDialog(value) {
      this.$emit('onLoading', value)
    },
    updateItem(value) {
      this.TriggerUpdateModal = !this.TriggerUpdateModal
      if (value != undefined) {
        this.data = value
        EventBus.$emit('onUpdate', value)
      }
    },
  },
  mounted() {
    this.$store.dispatch('GET_ITEM_LIST').then(res => (this.item_list = res.data.response_data))
  },
}
</script>
