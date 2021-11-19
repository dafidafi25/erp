<template>
  <div>
    <!-- basic -->

    <index-table
      @onLoading="loadingDialog"
      @onDeleteClicked="deleteItem"
      @onAddClicked="addItem"
      @onUpdateClicked="updateItem"
    ></index-table>

    <!-- loading Dialog -->
    <v-dialog width="300" v-model="loading">
      <v-card color="error">
        <v-card-text>
          Loading
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- add Dialog -->
    <v-dialog max-width="600px" v-model="TriggerAddModal">
      <v-card>
        <add-modal @onAddClicked="addItem" :coa_list="coa_list" :account_list="account_list" />
      </v-card>
    </v-dialog>
    <!-- edit Dialog -->
    <v-dialog max-width="600px" v-model="TriggerUpdateModal">
      <v-card>
        <edit-modal @onUpdateClicked="updateItem" :data="data" :coa_list="coa_list" :account_list="account_list" />
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
      coa_list: null,
      account_list: null,
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
    addItem() {
      this.TriggerAddModal = !this.TriggerAddModal
    },
    getList() {
      this.$store
        .dispatch('GET_COA_LIST')
        .then(res => (this.coa_list = res.data.response_data))
        .catch(err => console.log(err))
      this.$store
        .dispatch('GET_ACCOUNT_LIST')
        .then(res => {
          this.account_list = res[0]
        })
        .catch(err => console.log(err))
    },
  },
  mounted() {
    this.getList()
  },
}
</script>
