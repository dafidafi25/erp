import axios from 'axios'

export default {
  state: {
    site_key: '6Ld8yK0cAAAAABO--QCSRNFybCs2QOmToRntCUfp',
  },
  getters: {},
  mutations: {},
  actions: {
    LOGIN: ({ commit }, { usernameOrEmail, password, status, captcha }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/users/login?remember-me=' + status + '&g-recaptcha-response=' + captcha, {
            usernameOrEmail: usernameOrEmail,
            password: password,
          })
          .then(res => {
            if ((status = 200)) {
              resolve(res)
            }
          })
          .catch(err => reject(err))
      })
    },
    FORGOT_PASSWORD_EMAIL: ({ commit }, { email }) => {
      return new Promise((resolve, reject) => {
        axios
          .post('/user/forgot-password', {
            email: email,
          })
          .then(res => {
            resolve(res)
          })
          .catch(err => reject(err))
      })
    },
    REFRESH_TOKEN: ({ commit }, { token, password }) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`/refresh-token?token=` + token + '&password=' + password)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    GET_USER_PROFILE: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get('/info')
          .then(res => {
            resolve(res)
          })
          .catch(err => reject(err))
      })
    },
  },
}
