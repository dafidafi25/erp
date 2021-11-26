import axios from 'axios'

export default {
  actions: {
    GET_SUB_MEREK_PAGE: ({ commit }, { page, per_page }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/sub-merek/page', {
            page: page,
            per_page: per_page,
          })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    CREATE_SUB_MEREK: ({ commit }, { merek_id, name }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/sub-merek/save', {
            merek_id: merek_id,
            name: name,
          })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    UPDATE_SUB_MEREK: ({ commit }, { merek_id, name, id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/sub-merek/update/' + id, {
            merek_id: merek_id,
            name: name,
          })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    GET_SUB_MEREK_ID: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .get('/sub-merek/get/' + id)
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    GET_SUB_MEREK_LIST: ({ commit }, { merek_id }) => {
      return new Promise((resolve, reject) => {
        axios
          .get('/sub-merek/list?merek_id=' + merek_id)
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    DELETE_SUB_MEREK: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/sub-merek/delete/' + id)
          .then(res => resolve(res))
          .catch(err => console.log(err))
      })
    },
  },
}
