<template>
  <div>
    <div class="d-flex align-center pl-5 py-5">
      <div @click="filter.show = !filter.show" class="display-1">Filter</div>
      <v-btn icon @click="filter.show = !filter.show" class="mr-auto">
        <v-icon>{{ filter.show ? icons.mdiChevronUp : icons.mdiChevronDown }}</v-icon>
      </v-btn>
    </div>

    <v-expand-transition>
      <div v-show="filter.show">
        <v-divider></v-divider>
        <div class="d-flex align-center pl-5 pr-5">
          <v-text-field
            label="Barcode"
            style="max-width:250px"
            color="error"
            @input="debounceInput"
            v-model="filter.barcode"
          ></v-text-field>
          <v-text-field
            label="Nama Item"
            style="max-width:250px"
            color="error"
            @input="debounceInput"
            v-model="filter.item_name"
            class="ml-5"
          ></v-text-field>
          <v-text-field
            label="Kode Item"
            style="max-width:250px"
            class="ml-5"
            color="error"
            @input="debounceInput"
            v-model="filter.kode_item"
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
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items" :key="index">
            <td>
              {{ item.barcode }}
            </td>
            <td class="text-center">
              {{ item.kode_item }}
            </td>
            <td class="text-center">
              {{ item.item_description }}
            </td>
            <td class="text-center">
              {{ item.item_name }}
            </td>
            <td class="text-center">
              {{ item.uom_code }}
            </td>
            <td class="text-center">
              {{ item.harga_lama }}
            </td>
            <td class="text-center">
              {{ item.harga_baru }}
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
        kode_item: '',
        item_name: '',
        barcode: '',
      },
      fields: [
        {
          name: 'Barcode',
          class: 'text-uppercase',
        },
        {
          name: 'Kode Item',
          class: 'text-center text-uppercase',
        },
        {
          name: 'Deskripsi Item',
          class: 'text-center text-uppercase',
        },
        {
          name: 'Nama Item',
          class: 'text-center text-uppercase',
        },
        {
          name: 'Satuan',
          class: 'text-center text-uppercase',
        },
        {
          name: 'Harga Lama',
          class: 'text-center text-uppercase',
        },
        {
          name: 'Harga Baru',
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
        .dispatch('GET_BARCODE', {
          page: this.pagination.page,
          per_page: this.pagination.perPage,
          kode_item: this.filter.kode_item,
          item_name: this.filter.item_name,
          barcode: this.filter.barcode,
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
      this.filter.kode_item = ''
      this.filter.item_name = ''
      this.filter.barcode = ''
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
