import axios from "axios";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    GET_PERSON: ({ commit }, { page, per_page }) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/person", {
            page: page,
            per_page: per_page,
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    GET_PERSON_LIST: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get("/person/list")
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },
  },
};
