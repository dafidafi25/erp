import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'
import MasterUser from './modules/MasterUser'
import Satuan from './modules/Satuan'
import MenuAsset from './modules/MenuAsset'
import Account from './modules/Account'
import Alamat from './modules/Alamat'
import Item from './modules/Item'
import JangkaWaktu from './modules/JangkaWaktu'
import Coa from './modules/Coa'
import Barcode from './modules/Barcode'
import ItemStock from './modules/ItemStock'
import SaldoAwal from './modules/SaldoAwal'
import PO from './modules/PurchaseOrder'
import Person from './modules/Person'
import Customer from './modules/Customer'
import Department from './modules/Department'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    sideBar: false,
    sideBar2: false,
    sideBar3: false,
    sideBar4: false,
  },
  mutations: {
    setSideBar(state, current) {
      state.sideBar = current
    },
    setSideBar2(state, current) {
      state.sideBar2 = current
    },
    setSideBar3(state, current) {
      state.sideBar3 = current
    },
    setSideBar4(state, current) {
      state.sideBar4 = current
    },
  },
  modules: {
    user: User,
    account: Account,
    master: MasterUser,
    satuan: Satuan,
    asset: MenuAsset,
    alamat: Alamat,
    item: Item,
    jangka_waktu: JangkaWaktu,
    coa: Coa,
    barcode: Barcode,
    ItemStock: ItemStock,
    SaldoAwal: SaldoAwal,
    Po: PO,
    Person: Person,
    Customer: Customer,
    Department: Department,
  },
})

export default store
