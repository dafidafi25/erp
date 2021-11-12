<template>
  <v-row>
    <!-- basic -->
    <v-col cols="12 " style="margin-top:62px">
      <v-card class="rounded-0">
        <account-table
          @onLoading="loadingDialog"
          @onUpdateClicked="showUpdateModal"
          @onDeleteClicked="deleteItem"
          @onAddClicked="addItem"
        ></account-table>
      </v-card>
    </v-col>
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
    <v-dialog max-width="600px" v-model="addModal">
      <v-card>
        <add-account-modal @onAddClicked="addItem" />
      </v-card>
    </v-dialog>
    <!-- edit Dialog -->
    <v-dialog max-width="600px" v-model="updateModal">
      <v-card>
        <edit-account-modal @onUpdateClicked="showUpdateModal" ref="form" :data="data" />
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import AccountTable from './AccountTable.vue'
import AddAccountModal from './AccountModal/AddAccountModal.vue'
import EditAccountModal from './AccountModal/EditAccountModal.vue'

export default {
  data() {
    return {
      loading: null,
      addModal: null,
      updateModal: null,
      data: null,
    }
  },
  components: {
    AccountTable,
    AddAccountModal,
    EditAccountModal,
  },
  methods: {
    showUpdateModal(value) {
      this.$refs.form.getDataId(value)
      this.updateModal = !this.updateModal
    },
    deleteItem(index) {
      console.log(index)
    },
    loadingDialog(value) {
      this.loading = value
    },
    addItem() {
      this.addModal = !this.addModal
    },
  },
}
</script>
