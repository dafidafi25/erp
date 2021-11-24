import axios from 'axios'
export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    GET_ITEM_LIST: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get('items/list?warehouse_id=1')
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    ADD_ITEM: (
      { commit },
      {
        item_description,
        person_id,
        item_code,
        part_number,
        uom_id,
        kategori_id,
        grade_id,
        account_id,
        tipe_id,
        merek_id,
        barcode,
        item_name,
        coa_id,
        coa_hpp_id,
        coa_jual_id,
        coa_ret_jual_id,
        coa_ret_beli_id,
        coa_disc_jual_id,
        coa_suspend_id,
        panjang,
        lebar,
        tinggi,
        stock,
        harga_jual,
        harga_beli,
        warehouse_id,
      },
    ) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/items/save', {
            person_id: person_id,
            item_code: item_code,
            account_id: account_id,
            stock: stock,
            harga_jual: harga_jual,
            harga_beli: harga_beli,
            warehouse_id: warehouse_id,
            // baru
            item_description: item_description,
            item_name: item_name,
            part_number: part_number,
            panjang: panjang,
            lebar: lebar,
            tinggi: tinggi,
            uom_id: uom_id,
            kategori_id: kategori_id,
            grade_id: grade_id,
            tipe_id: tipe_id,
            merek_id: merek_id,
            active_flag: 1,
            is_default: 1,
            bom_flag: 1,
            account_id: 30,
            coa_id: coa_id,
            stock: stock,
            harga_beli: harga_beli,
            harga_jual: harga_jual,
            item_code: item_code,
            person_id: person_id,
            coa_hpp_id: coa_hpp_id,
            coa_jual_id: coa_jual_id,
            coa_ret_jual_id: coa_ret_jual_id,
            coa_ret_beli_id: coa_ret_beli_id,
            coa_disc_jual_id: coa_disc_jual_id,
            coa_suspend_id: coa_suspend_id,
            barcode: barcode == null || barcode == '' ? '' : barcode,
          })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    UPDATE_ITEM: (
      { commit },
      {
        id,
        item_description,
        person_id,
        item_code,
        part_number,
        uom_id,
        kategori_id,
        grade_id,
        account_id,
        tipe_id,
        merek_id,
        barcode,
        item_name,
        coa_id,
        coa_hpp_id,
        coa_jual_id,
        coa_ret_jual_id,
        coa_ret_beli_id,
        coa_disc_jual_id,
        coa_suspend_id,
        panjang,
        lebar,
        tinggi,
        stock,
        harga_jual,
        harga_beli,
        warehouse_id,
        active_flag,
        is_default,
        bom_flag,
      },
    ) => {
      return new Promise((resolve, reject) => {
        console.log(person_id)
        axios
          .post('/items/update/' + id, {
            person_id: person_id,
            item_code: item_code,
            account_id: account_id,
            stock: stock,
            harga_jual: harga_jual,
            harga_beli: harga_beli,
            warehouse_id: warehouse_id,
            // baru
            item_description: item_description,
            item_name: item_name,
            part_number: part_number,
            panjang: panjang,
            lebar: lebar,
            tinggi: tinggi,
            uom_id: uom_id,
            kategori_id: kategori_id,
            grade_id: grade_id,
            tipe_id: tipe_id,
            merek_id: merek_id,
            active_flag: active_flag,
            is_default: is_default,
            bom_flag: bom_flag,
            account_id: account_id,
            coa_id: coa_id,
            stock: stock,
            harga_beli: harga_beli,
            harga_jual: harga_jual,
            item_code: item_code,
            person_id: person_id,
            coa_hpp_id: coa_hpp_id,
            coa_jual_id: coa_jual_id,
            coa_ret_jual_id: coa_ret_jual_id,
            coa_ret_beli_id: coa_ret_beli_id,
            coa_disc_jual_id: coa_disc_jual_id,
            coa_suspend_id: coa_suspend_id,
            barcode: barcode == null || barcode == '' ? '' : barcode,
          })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    DELETE_ITEM: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/items/delete/' + id)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GET_ITEM: ({ commit }, { page, per_page, item_name, warehouse_id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/items', {
            page: page,
            per_page: per_page,
            warehouse_id: warehouse_id,
            item_name: item_name,
          })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GET_ITEM_ID: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .get('/items/' + id)
          .then(res => resolve(res.data.response_data))
          .catch(err => reject(err))
      })
    },
    GET_MEREK_ITEM_LIST: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get('/merek/list')
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GET_ITEM_TYPE_LIST: ({ commit }, { kategori_id }) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`/item-type/list?kategori_id=` + kategori_id)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    GET_ITEM_KATEGORI_LIST: ({ commit }, { merek_id }) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`/item-kategori/list?merek_id=` + merek_id)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    GET_ITEM_KATEGORI_ID: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`/item-kategori/` + id)
          .then(response => {
            resolve(response)
          })
          .catch(error => reject(error))
      })
    },
    GET_ITEM_GRADE_LIST: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get('/item-grade/list')
          .then(res => {
            resolve(res)
          })
          .catch(err => reject(err))
      })
    },
    GET_ITEM_GRADE_ID: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .get('/item-grade/' + id)
          .then(res => {
            resolve(res)
          })
          .catch(err => reject(err))
      })
    },
    ADD_ITEM_GRADE: ({ commit }, { nilai, keterangan, active_flag, is_default }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/item-grade/save', {
            nilai: nilai,
            keterangan: keterangan,
            active_flag: active_flag == true ? 1 : 2,
            is_default: is_default == true ? 1 : 2,
          })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    UPDATE_ITEM_GRADE: ({ commit }, { id, nilai, keterangan, active_flag, is_default }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/item-grade/update/' + id, {
            nilai: nilai,
            keterangan: keterangan,
            active_flag: active_flag == true ? 1 : 2,
            is_default: is_default == true ? 1 : 2,
          })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GET_ITEM_GRADE: ({ commit }, { page, per_page, nilai, keterangan }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/item-grade', {
            page: page,
            per_page: per_page,
            nilai: nilai,
            keterangan: keterangan,
          })
          .then(res => {
            resolve(res)
          })
          .catch(function(err) {
            reject(err)
          })
      })
    },
    DELETE_ITEM_GRADE: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/item-grade/delete/' + id)
          .then(res => {
            resolve(res)
          })
          .catch(function(err) {
            reject(err)
          })
      })
    },
    GET_PRICE_DATA: ({ commit }, { page, per_page, kode_item, nama_item }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/item-price', {
            page: page,
            per_page: per_page,
            kode_item: kode_item,
            nama_item: nama_item,
          })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    ADD_PRICE_DATA: ({ commit }, { item_id, harga_baru, ongkos, disc_persen, disc_price, active_flag }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/item-price/save', {
            item_id: item_id,
            harga_baru: price_buy,
            ongkos: ongkos,
            disc_persen: disc_persen,
            disc_price: disc_price,
            active_flag: active_flag,
          })
          .then(res => {
            // this.setItem(response.data.response_data);
            resolve(res)
            this.updateData()
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    UPDATE_PRICE_DATA: ({ commit }, { id, item_id, harga_baru, ongkos, disc_persen, disc_price, active_flag }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/item-price/update/' + id, {
            item_id: item_id,
            harga_baru: harga_baru,
            ongkos: ongkos,
            disc_persen: disc_persen,
            disc_price: disc_price,
            active_flag: active_flag,
          })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GET_PRICE_ID: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .get('/item-price/' + id)
          .then(res => resolve(res.data.response_data))
          .catch(err => reject(err))
      })
    },
    DELETE_PRICE: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/item-price/delete/' + id)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    ADD_ITEM_TYPE: ({ commit }, { type_name, merek_id, kategori_id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/item-type/save', {
            type_name: type_name,
            merek_id: merek_id,
            kategori_id: kategori_id,
          })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    DELETE_ITEM_TYPE: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/item-type/delete/' + id)
          .then(res => {
            resolve(res)
          })
          .catch(function(error) {
            reject(err)
          })
      })
    },
    UPDATE_ITEM_TYPE: ({ commit }, { id, type_name, merek_id, kategori_id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/item-type/update/' + id, {
            type_name: type_name,
            merek_id: merek_id,
            kategori_id: kategori_id,
          })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GET_ITEM_TYPE: ({ commit }, { page, per_page, type_name }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/item-type', {
            page: page,
            per_page: per_page,
            type_name: type_name,
          })
          .then(res => {
            // console.log(response);
            resolve(res)
          })
          .catch(function(err) {
            reject(err)
          })
      })
    },
    GET_ITEM_TYPE_ID: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .get('/item-type/' + id)
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    GET_ITEM_KATEGORI: ({ commit }, { page, per_page }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/item-kategori', {
            page: page,
            per_page: per_page,
          })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    DELETE_ITEM_KATEGORI: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/item-kategori/delete/' + id)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    UPDATE_ITEM_KATEGORI: ({ commit }, { name, merek_id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/item-kategori/update/' + id, {
            name: name,
            merek_id: merek_id,
          })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    ADD_ITEM_KATEGORI: ({ commit }, { name, merek_id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/item-kategori/save', {
            name: name,
            merek_id: merek_id,
          })
          .then(response => {
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GET_MEREK_ITEM: ({ commit }, { page, per_page, name }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/merek', {
            page: page,
            per_page: per_page,
            name: name,
          })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    DELETE_MEREK_ITEM: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/merek/delete/' + id)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    UPDATE_MEREK_ITEM: ({ commit }, { name, id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/merek/update/' + id, {
            name: name,
          })
          .then(res => {
            if (res.data.status == 'true') {
              resolve(res)
            }
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    ADD_MEREK_ITEM: ({ commit }, { name }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/merek/save', {
            name: name,
          })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GET_MEREK_ID: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .get('/merek/' + id)
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
  },
}
