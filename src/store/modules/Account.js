import axios from 'axios'

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    GET_ACCOUNT_LIST: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get('/account/list')
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    ADD_ACCOUNT: (
      { commit },
      { parent_flag, parent_id, account_name, active_flag, neraca_flag, status_flag, primary_flag, account_name2 },
    ) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/account/save/', {
            parent_flag: parent_flag,
            parent_id: parent_id,
            account_name: account_name,
            active_flag: active_flag,
            neraca_flag: neraca_flag,
            status_flag: status_flag,
            account_type_id: 0,
            primary_flag: primary_flag,
            account_name2: account_name2,
          })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    DELETE_ACCOUNT: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/account/delete/' + id)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GET_ACCOUNT: ({ commit }, { page, per_page, account_code, account_name }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/account', {
            page: page,
            per_page: per_page,
            account_code: account_code,
            account_name: account_name,
          })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    UPDATE_ACCOUNT: (
      { commit },
      {
        id,
        parent_flag,
        parent_id,
        account_name,
        active_flag,
        neraca_flag,
        status_flag,
        account_type_id,
        primary_flag,
        account_name2,
      },
    ) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/account/update/' + id, {
            parent_flag: parent_flag,
            parent_id: parent_id,
            account_name: account_name,
            active_flag: active_flag,
            neraca_flag: neraca_flag,
            status_flag: status_flag,
            account_type_id: account_type_id,
            primary_flag: primary_flag,
            account_name2: account_name2,
          })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    GET_ACCOUNT_ID: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .get('/account/' + id)
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
  },
}
