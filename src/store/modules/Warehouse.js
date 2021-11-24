import axios from 'axios'

export default {
  actions: {
    GET_ALL_WAREHOUSE_LIST: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get('/warehouse/list/all')
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
  },
}
