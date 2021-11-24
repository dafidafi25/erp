<template>
  <v-card flat class="pa-3 mt-2">
    <v-card-text>
      <v-form class="multi-col-validation mt-6">
        <v-row>
          <v-col md="6" cols="12">
            <v-text-field label="Username" v-model="username" dense outlined></v-text-field>
          </v-col>

          <v-col md="6" cols="12">
            <v-text-field label="Name" v-model="name" dense outlined></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field label="E-mail" v-model="email" dense outlined></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-select
              dense
              label="Role"
              v-model="role"
              :items="list.role"
              item-text="department_name"
              item-value="id"
              outlined
            ></v-select>
          </v-col>

          <v-col cols="12">
            <v-btn color="error" class="me-3 mt-4">
              Save changes
            </v-btn>
            <v-btn color="secondary" outlined class="mt-4" type="reset">
              Cancel
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiAlertOutline, mdiCloudUploadOutline } from '@mdi/js'

export default {
  setup(props) {
    return {
      icons: {
        mdiAlertOutline,
        mdiCloudUploadOutline,
      },
    }
  },
  data() {
    return {
      username: null,
      name: null,
      email: null,
      role: null,
      list: {
        role: [],
      },
    }
  },
  mounted() {
    this.$store
      .dispatch('GET_USER_PROFILE')
      .then(res => {
        this.username = res.data.username
        this.name = res.data.name
        this.email = res.data.email
        this.role = res.data.authorities[0].authority
      })
      .catch(err => console.log(err))

    this.$store
      .dispatch('GET_ROLES_LIST')
      .then(res => (this.list.role = res.data.response_data))
      .catch(err => console.log(err))
  },
}
</script>
