import axios from 'axios'

export default {
  actions: {
    GET_DEPARTMENT: ({ commit }, { page, per_page }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/department', {
            page: page,
            per_page: per_page,
          })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    GET_DEPT_LIST: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get(
            '/department/list?role=' +
              localStorage.getItem('role') +
              '&warehouse-id=' +
              localStorage.getItem('warehouse'),
          )
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    UPDATE_DEPT: ({ commit }, { id, department_code, department_name }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('department/update/' + id, {
            department_code: department_code,
            department_name: department_name,
          })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
  },
}
