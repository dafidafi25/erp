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
            label="Nama Item"
            style="max-width:250px"
            color="error"
            @input="debounceInput"
            class="ml-5"
            v-model="filter.item_name"
          ></v-text-field>
          <v-autocomplete
            label="Warehouse"
            style="max-width:250px"
            class="ml-5"
            color="error"
            @input="debounceInput"
            item-text="name"
            item-value="id"
            v-model="filter.warehouse"
            :items="warehouse_list"
          ></v-autocomplete>
          <v-btn class="ml-5" color="error" @click="onResetFilter">Reset</v-btn>
        </div>
      </div>
    </v-expand-transition>

    <v-simple-table fixed-header dense>
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
              {{ item.item_name }}
            </td>
            <td>
              {{ item.item_description }}
            </td>
            <td class="text-center">
              {{ item.part_number }}
            </td>
            <td class="text-center">
              {{ item.uom_code }}
            </td>
            <td class="text-center">
              {{ item.grade_name }}
            </td>
            <td class="text-center">
              {{ item.kategori_name }}
            </td>
            <td class="text-center">
              {{ item.tipe_name }}
            </td>
            <td class="text-center">
              {{ item.merek_name }}
            </td>
            <td class="text-center">
              {{ item.panjang }}
            </td>
            <td class="text-center">
              {{ item.lebar }}
            </td>
            <td class="text-center">
              {{ item.tinggi }}
            </td>
            <td class="text-center">
              {{ item.warehouse_name }}
            </td>
            <td class="text-center col-1">
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
  props: ['warehouse_list'],
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
        item_name: null,
        warehouse: null,
      },
      fields: [
        {
          name: 'Nama Item',
          class: 'text-uppercase col-2',
        },
        {
          name: 'Dekripsi Item',
          class: 'text-uppercase col-2',
        },
        {
          name: 'Nomor Part',
          class: 'text-center text-uppercase col-1',
        },
        {
          name: 'Satuan',
          class: 'text-center text-uppercase col-1',
        },
        {
          name: 'Grade',
          class: 'text-center text-uppercase col-1',
        },
        {
          name: 'Kategori',
          class: 'text-center text-uppercase col-1',
        },
        {
          name: 'Tipe',
          class: 'text-center text-uppercase col-1',
        },
        {
          name: 'Merek',
          class: 'text-center text-uppercase col-1',
        },
        {
          name: 'Panjang',
          class: 'text-center text-uppercase col-1',
        },
        {
          name: 'Lebar',
          class: 'text-center text-uppercase col-1',
        },
        {
          name: 'Tinggi',
          class: 'text-center text-uppercase col-1',
        },
        {
          name: 'Gudang',
          class: 'text-center text-uppercase col-1',
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
        .dispatch('DELETE_ITEM', { id: this.items[index].id })
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
        .dispatch('GET_ITEM', {
          page: this.pagination.page,
          per_page: this.pagination.perPage,
          item_name: this.filter.item_name,
          warehouse_id: this.filter.warehouse_id,
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
      this.filter.item_name = null
      this.filter.warehouse = null
      this.debounceInput()
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
