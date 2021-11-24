import axios from 'axios'

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    CREATE_COA: (
      { commit },
      { coa_id, balance_date, coa_saldo, coa_debet, coa_credit, period_name, a_saldo, a_debet, a_credit },
    ) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/coa-balance/save', {
            coa_id: coa_id,
            balance_date: balance_date,
            coa_saldo: coa_saldo,
            coa_debet: coa_debet,
            coa_credit: coa_credit,
            period_name: period_name,
            a_saldo: a_saldo,
            a_debet: a_debet,
            a_credit: a_credit,
          })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    UPDATE_COA: (
      { commit },
      { id, coa_id, balance_date, coa_saldo, coa_debet, coa_credit, period_name, a_saldo, a_debet, a_credit },
    ) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/coa-balance/update/' + id, {
            coa_id: coa_id,
            balance_date: balance_date,
            coa_saldo: coa_saldo,
            coa_debet: coa_debet,
            coa_credit: coa_credit,
            period_name: period_name,
            a_saldo: a_saldo,
            a_debet: a_debet,
            a_credit: a_credit,
          })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    DELETE_COA: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/coa-balance/delete/' + id)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GET_COA: ({ commit }, { page, per_page }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/coa-balance', {
            page: page,
            per_page: per_page,
          })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    GET_COA_ID: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .get('/coa-balance/' + id)
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    CREATE_COA_SETUP: ({ commit }, { program_account, coa_id, note, account_id, id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/coa-setup/save', {
            coa_id: coa_id,
            program_account: program_account,
            note: note,
            account_id: account_id,
            id: id,
          })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    UPDATE_COA_SETUP: ({ commit }, { program_account, coa_id, note, account_id, id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/coa-setup/update/' + id, {
            coa_id: coa_id,
            program_account: program_account,
            note: note,
            account_id: account_id,
            id: id,
          })
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    DELETE_COA_SETUP: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/coa-setup/delete/' + id)
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    GET_COA_SETUP: ({ commit }, { page, per_page, note }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/coa-setup', {
            page: page,
            per_page: per_page,
            note: note,
          })
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    GET_COA_SETUP_ID: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .get('/coa-setup/' + id)
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
    GET_COA_LIST: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get('/coa/list')
          .then(res => {
            resolve(res)
          })
          .catch(err => reject(err))
      })
    },
    GET_ACCOUNT_LIST: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get('/account/list')
          .then(res => resolve(res))
          .catch(err => reject(err))
      })
    },
  },
}
