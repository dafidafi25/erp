import axios from 'axios'

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    ADD_JANGKA_WAKTU: ({ commit }, { name, keterangan, hari, active_flag, is_default }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/jwkredit/save', {
            name: name,
            keterangan: keterangan,
            hari: hari,
            active_flag: active_flag,
            is_default: is_default,
          })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GET_JANGKA_WAKTU: ({ commit }, { page, per_page, name, keterangan, hari }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/jwkredit', {
            page: page,
            per_page: per_page,
            name: name,
            keterangan: keterangan,
            hari: hari,
          })
          .then(res => {
            resolve(res)
          })
          .catch(function(err) {
            reject(err)
          })
      })
    },
    UPDATE_JANGKA_WAKTU: ({ commit }, { id, name, keterangan, hari, active_flag, is_default }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/jwkredit/update/' + id, {
            name: name,
            keterangan: keterangan,
            hari: hari,
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
    DELETE_JANGKA_WAKTU: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/jwkredit/delete/' + id)
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    GET_JANGKA_WAKTU_ID: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .get('jwkredit/' + id)
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
  },
}
