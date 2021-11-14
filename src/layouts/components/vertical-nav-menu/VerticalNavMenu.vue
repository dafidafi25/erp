<template>
  <v-navigation-drawer
    :value="isDrawerOpen"
    app
    absolute
    width="260"
    height="calc(100% - 150px)"
    class="app-navigation-menu"
    style="margin-top:150px"
    hide-overlay
    @input="val => $emit('update:is-drawer-open', val)"
  >
    <!-- Navigation Header -->
    <!-- <div class="vertical-nav-header d-flex items-center ps-6 pe-5 pt-5 pb-2">
      <router-link to="/" class="d-flex align-center text-decoration-none">
        <v-slide-x-transition>
          <h2 class="app-title black--text">Hokky Bangunan</h2>
        </v-slide-x-transition>
      </router-link>
    </div> -->

    <!-- Navigation Items -->
    <v-list expand shaped class="vertical-nav-menu-items pr-5">
      <nav-menu-link title="Home" :to="{ name: 'home' }" :icon="icons.mdiHomeOutline"></nav-menu-link>
      <nav-menu-group title="Master" :icon="icons.mdiCity">
        <nav-menu-link title="Satuan" :to="{ name: 'master-satuan' }"></nav-menu-link>
        <nav-menu-link title="Account" :to="{ name: 'master-account' }"></nav-menu-link>
        <nav-menu-link title="User Group" :to="{ name: 'master-user' }"></nav-menu-link>
        <nav-menu-link title="Karyawan" :to="{ name: 'master-karyawan' }"></nav-menu-link>
        <nav-menu-link title="Alamat" :to="{ name: 'master-alamat' }"></nav-menu-link>
        <nav-menu-link title="Item" :to="{ name: 'master-item' }"></nav-menu-link>
        <nav-menu-link title="Coa" :to="{ name: 'master-coa' }"></nav-menu-link>
        <nav-menu-link title="Asset" :to="{ name: 'master-asset' }"></nav-menu-link>
        <nav-menu-link title="Barcode" :to="{ name: 'master-barcode' }"></nav-menu-link>
        <nav-menu-link title="Jangka Waktu" :to="{ name: 'master-jangka-waktu' }"></nav-menu-link>
        <nav-menu-link title="Item Minus" :to="{ name: 'master-item-minus' }"></nav-menu-link>
        <nav-menu-link title="Saldo Awal" :to="{ name: 'master-saldo-awal' }"></nav-menu-link>
        <nav-menu-link title="Person" :to="{ name: 'master-person' }"></nav-menu-link>
      </nav-menu-group>
      <nav-menu-group title="Inventory" :icon="icons.mdiHockeyPuck">
        <nav-menu-link title="Stok Item" class="ml-5"></nav-menu-link>
      </nav-menu-group>
      <nav-menu-group title="Pembelian" :icon="icons.mdiCreditCard">
        <nav-menu-link title="Request PO" class="ml-5"></nav-menu-link>
        <nav-menu-link title="PO Process" class="ml-5"></nav-menu-link>
        <nav-menu-link title="Alamat" class="ml-5"></nav-menu-link>
        <nav-menu-link title="History PO" class="ml-5"></nav-menu-link>
      </nav-menu-group>
      <nav-menu-group title="Penjualan" :icon="icons.mdiShoppingOutline">
        <nav-menu-link title="SO Request" class="ml-5"></nav-menu-link>
        <nav-menu-link title="SO Kasir" class="ml-5"></nav-menu-link>
        <nav-menu-link title="History SO Kerja" class="ml-5"></nav-menu-link>
      </nav-menu-group>
      <nav-menu-group title="Administrasi" :icon="icons.mdiDatabase">
        <nav-menu-link title="Customer" class="ml-5"></nav-menu-link>
        <nav-menu-link title="Department Karyawan" class="ml-5"></nav-menu-link>
        <nav-menu-link title="Jam Kerja" class="ml-5"></nav-menu-link>
        <nav-menu-link title="Role" class="ml-5"></nav-menu-link>
      </nav-menu-group>
      <!-- <v-divider></v-divider>
      <nav-menu-link title="Account Settings" :to="{ name: 'pages-account-settings' }" :icon="icons.mdiAccountCogOutline"></nav-menu-link>
      <nav-menu-group title="Pages" :icon="icons.mdiFileOutline">
        <nav-menu-link title="Login" :to="{ name: 'pages-login' }" target="_blank" class="ml-5"></nav-menu-link>
        <nav-menu-link title="Register" :to="{ name: 'pages-register' }" target="_blank" class="ml-5"></nav-menu-link>
        <nav-menu-link title="Error" :to="{ name: 'error-404' }" target="_blank" class="ml-5"></nav-menu-link>
      </nav-menu-group>
      <v-divider></v-divider> -->
    </v-list>
    <div class="upgrade-banner mx-auto" transition="scale-transition">ERP V 1.00</div>
  </v-navigation-drawer>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import {
  mdiEmail,
  mdiFormatListBulletedType,
  mdiClock,
  mdiLabel,
  mdiAccountDetails,
  mdiAccountGroup,
  mdiWarehouse,
  mdiInformation,
  mdiPackage,
  mdiHockeyPuck,
  mdiCity,
  mdiClipboardList,
  mdiPackageVariantClosed,
  mdiCreditCard,
  mdiDatabase,
  mdiBriefcase,
  mdiHomeOutline,
  mdiAlphaTBoxOutline,
  mdiEyeOutline,
  mdiCreditCardOutline,
  mdiTable,
  mdiFileOutline,
  mdiFormSelect,
  mdiAccountCogOutline,
  mdiShoppingOutline,
} from '@mdi/js'
import NavMenuGroup from './components/NavMenuGroup.vue'
import NavMenuLink from './components/NavMenuLink.vue'

export default {
  components: {
    NavMenuGroup,
    NavMenuLink,
  },
  props: {
    isDrawerOpen: {
      type: Boolean,
      default: null,
    },
  },
  setup() {
    return {
      icons: {
        mdiEmail,
        mdiFormatListBulletedType,
        mdiClock,
        mdiLabel,
        mdiAccountDetails,
        mdiAccountGroup,
        mdiWarehouse,
        mdiInformation,
        mdiPackage,
        mdiHockeyPuck,
        mdiCity,
        mdiClipboardList,
        mdiPackageVariantClosed,
        mdiCreditCard,
        mdiBriefcase,
        mdiDatabase,
        mdiHomeOutline,
        mdiAlphaTBoxOutline,
        mdiEyeOutline,
        mdiCreditCardOutline,
        mdiTable,
        mdiFileOutline,
        mdiFormSelect,
        mdiAccountCogOutline,
        mdiShoppingOutline,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.sub-menu {
  margin-left: 10px;
}

.app-title {
  font-size: 1.25rem;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
}

// ? Adjust this `translateX` value to keep logo in center when vertical nav menu is collapsed (Value depends on your logo)
.app-logo {
  transition: all 0.18s ease-in-out;
  .v-navigation-drawer--mini-variant & {
    transform: translateX(-4px);
  }
}

@include theme(app-navigation-menu) using ($material) {
  background-color: #fff;
}

.app-navigation-menu {
  .v-list-item {
    &.vertical-nav-menu-link {
      ::v-deep .v-list-item__icon {
        .v-icon {
          transition: none !important;
        }
      }
    }
  }
}

// You can remove below style
// Upgrade Banner
.app-navigation-menu {
  .upgrade-banner {
    position: absolute;
    bottom: 13px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
