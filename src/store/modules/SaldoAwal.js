import axios from "axios";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    GET_SALDO_AWAL: ({ commit }, { page, per_page, item_name }) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/saldo-awal", {
            page: page,
            per_page: per_page,
            item_name: item_name,
          })
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },

    GET_SALDO_AWAL_LIST: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get("/saldo-awal/list")
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },
  },
};
