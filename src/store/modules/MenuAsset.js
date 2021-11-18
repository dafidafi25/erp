import axios from 'axios'

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    CREATE_ASSET: (
      { commit },
      {
        asset_code,
        asset_name,
        entered_qty,
        nilai_asset,
        note,
        buying_date,
        asset_type_id,
        department_id,
        coa_id,
        active_flag,
      },
    ) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/asset/save', {
            asset_code: asset_code,
            asset_name: asset_name,
            entered_qty: entered_qty,
            nilai_asset: nilai_asset,
            note: note,
            buying_date: buying_date,
            asset_type_id: asset_type_id,
            department_id: department_id,
            coa_id: coa_id,
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
    UPDATE_ASSET: (
      { commit },
      {
        id,
        asset_code,
        asset_name,
        entered_qty,
        nilai_asset,
        note,
        buying_date,
        asset_type_id,
        department_id,
        coa_id,
        active_flag,
      },
    ) => {
      console.log(active_flag)
      return new Promise((resolve, reject) => {
        axios
          .post('/asset/update/' + id, {
            id: id,
            asset_code: asset_code,
            asset_name: asset_name,
            entered_qty: entered_qty,
            nilai_asset: nilai_asset,
            note: note,
            buying_date: buying_date,
            asset_type_id: asset_type_id,
            department_id: department_id,
            coa_id: coa_id,
            active_flag: active_flag == true ? 1 : 0,
          })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    DELETE_ASSET: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/asset/delete/' + id)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GET_ASSET: ({ commit }, { page, per_page, asset_code, asset_name, start_date, end_date }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/asset', {
            page: page,
            per_page: per_page,
            asset_code: asset_code,
            asset_name: asset_name,
            start_date: start_date == null ? null : format_date(start_date),
            end_date: end_date == null ? null : format_date(end_date),
          })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    GET_ASSET_ID: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .get('/asset/' + id)
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    GET_ASSET_TYPE: ({ commit }, { page, per_page, name }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/asset-type', {
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
    UPDATE_ASSET_TYPE: ({ commit }, { name, id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/asset-type/update/' + id, {
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
    ADD_ASSET_TYPE: ({ commit }, { name }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/asset-type/save', {
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
    DELETE_ASSET_TYPE: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/asset-type/delete/' + id)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GET_AT_LIST: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get('/asset-type/list')
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    GET_ASSET_TYPE_ID: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .get('asset-type/' + id)
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
  },
}
