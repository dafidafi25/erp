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
        <add-modal @onAddClicked="addItem" :department_list="department_list" :role_list="role_list" />
      </v-card>
    </v-dialog>
    <!-- edit Dialog -->
    <v-dialog max-width="600px" v-model="TriggerUpdateModal">
      <v-card>
        <edit-modal
          @onUpdateClicked="updateItem"
          :data="data"
          :department_list="department_list"
          :role_list="role_list"
        />
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
      department_list: null,
      role_list: null,
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
    async getList() {
      this.$store
        .dispatch('GET_ROLES_LIST')
        .then(res => (this.role_list = res.data.response_data))
        .catch(err => console.log(err))
      await this.$store
        .dispatch('GET_DEPT_LIST')
        .then(res => (this.department_list = res.data.response_data))
        .catch(err => console.log(err))
    },
  },
  mounted() {
    this.getList()
  },
}
</script>
