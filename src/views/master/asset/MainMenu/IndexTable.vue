<template>
  <div>
    <div class="d-flex align-center pl-5 py-5">
      <div @click="filter.show = !filter.show" class="display-1">Filter</div>
      <v-btn icon @click="filter.show = !filter.show" class="mr-auto">
        <v-icon>{{ filter.show ? icons.mdiChevronUp : icons.mdiChevronDown }}</v-icon>
      </v-btn>
      <v-btn class="mr-5" color="error" @click="$emit('onAddClicked')">Add Data</v-btn>
    </div>

    <v-expand-transition>
      <div v-show="filter.show">
        <v-divider></v-divider>
        <div class="d-flex align-center pl-5 pr-5">
          <v-text-field
            label="Nama Akun"
            style="max-width:250px"
            color="error"
            @input="debounceInput"
            v-model="filter.nama_akun"
          ></v-text-field>
          <v-text-field
            label="Kode Akun"
            style="max-width:250px"
            class="ml-5"
            color="error"
            @input="debounceInput"
            v-model="filter.kode_akun"
          ></v-text-field>
          <v-btn class="ml-5" color="error" @click="onResetFilter">Reset</v-btn>
        </div>
      </div>
    </v-expand-transition>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th v-for="(item, index) in fields" :key="index" :class="item.class">
              {{ item.name }}
            </th>
            <th class="text-center text-uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>
              {{ item.asset_code }}
            </td>
            <td class="text-center">
              {{ item.asset_name }}
            </td>
            <td class="text-center">
              {{ item.entered_qty }}
            </td>
            <td class="text-center">
              {{ currency(index) }}
            </td>
            <td class="text-center">
              {{ item.note }}
            </td>
            <td class="text-left">
              {{ item.buying_date }}
            </td>
            <td class="text-center">
              {{ item.asset_type_id }}
            </td>
            <td class="text-center">
              {{ item.department_id }}
            </td>
            <td class="text-center">
              {{ item.coa_id }}
            </td>
            <td class="text-center">
              <v-btn @click="onUpdate(index)" max-width="10" min-width="2"
                ><v-icon size="22">
                  {{ icons.mdiPencilOutline }}
                </v-icon></v-btn
              >
              <v-btn @click="onDelete(index)" max-width="10" min-width="2" color="error"
                ><v-icon size="22">
                  {{ icons.mdiTrashCanOutline }}
                </v-icon></v-btn
              >
            </td>
          </tr>
          <v-divider />
        </tbody>
      </template>
    </v-simple-table>
    <v-layout wrap row class="pl-5 mt-10 " justify-end align-center>
      <v-flex lg1 md2 sm6 xs12>Rows Per Page</v-flex>
      <v-flex lg1 md2 sm6 xs12
        ><div style="width:100px;">
          <v-select
            :items="pagination.pageSelect"
            v-model="pagination.perPage"
            item-color="error"
            solo
            dense
            color="error"
            class="mt-5 ml-5"
            @input="updateData()"
          ></v-select></div
      ></v-flex>
      <v-flex lg2 md2 sm6 xs12
        >Data {{ currItemIndex }} - {{ currItemIndex + items.length - 1 }} dari {{ pagination.totalItem }}</v-flex
      >
      <v-flex lg4 md5 sm6 xs12>
        <v-pagination
          v-model="pagination.page"
          :length="pagination.totalPage"
          color="error"
          :total-visible="7"
          @input="updateData()"
        ></v-pagination
      ></v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mdiPencilOutline, mdiTrashCanOutline, mdiChevronUp, mdiChevronDown } from '@mdi/js'
import { EventBus } from './event-bus.js'
var timeOut
export default {
  data() {
    return {
      items: [],
      icons: {
        mdiPencilOutline,
        mdiTrashCanOutline,
        mdiChevronUp,
        mdiChevronDown,
      },
      pagination: {
        page: 1,
        perPage: 10,
        totalPage: 5,
        pageSelect: [5, 10, 20, 50, 100],
        totalItem: null,
      },
      filter: {
        show: false,
        phone: null,
        npwp: null,
        city: null,
        province: null,
      },
      fields: [
        {
          name: 'Kode Asset',
          class: 'text-uppercase',
        },
        {
          name: 'Nama Asset',
          class: 'text-center text-uppercase',
        },
        {
          name: 'Jumlah',
          class: 'text-center text-uppercase',
        },
        {
          name: 'Nilai Asset',
          class: 'text-center text-uppercase',
        },
        {
          name: 'Note',
          class: 'text-center text-uppercase',
        },
        {
          name: 'Tanggal Beli',
          class: 'text-center text-uppercase',
        },
        {
          name: 'Tipe Asset',
          class: 'text-center text-uppercase',
        },
        {
          name: 'Department',
          class: 'text-center text-uppercase',
        },
        {
          name: 'COA',
          class: 'text-center text-uppercase',
        },
      ],
    }
  },
  methods: {
    onUpdate(index) {
      this.$emit('onUpdateClicked', this.items[index].id)
    },
    onDelete(index) {
      this.$store
        .dispatch('DELETE_ALAMAT', { id: this.items[index].id })
        .then(() => {
          if (this.items.length == 0) {
            this.updateData()
            this.pagination.page = this.pagination.page == 1 ? 1 : this.pagination.page - 1
          }
          this.updateData()
        })
        .catch(err => console.log(err))
    },
    updateData() {
      this.$emit('onLoading', true)
      this.$store
        .dispatch('GET_ASSET', {
          page: this.pagination.page,
          per_page: this.pagination.perPage,
          asset_code: this.asset_code,
          asset_name: this.asset_name,
          start_date: this.start_date,
          end_date: this.end_date,
        })
        .then(res => {
          this.$emit('onLoading', false)
          this.items = res.data.response_data
          this.pagination.totalPage = res.data.total_page
          this.pagination.perPage = res.data.per_page
          this.pagination.totalItem = res.data.total_item
        })
        .catch(err => console.log(err))
    },
    debounceInput() {
      clearTimeout(timeOut)
      timeOut = setTimeout(() => {
        this.updateData()
      }, 500)
    },
    onResetFilter() {
      this.debounceInput()
    },
    currency(index) {
      if (this.items[index].nilai_asset != null) {
        let conversion = this.items[index].nilai_asset.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        return 'RP ' + conversion
      } else {
        return 0
      }
    },
  },
  mounted() {
    this.updateData()
  },
  computed: {
    currItemIndex() {
      return (this.pagination.page - 1) * this.pagination.perPage + 1
    },
  },
}
</script>
