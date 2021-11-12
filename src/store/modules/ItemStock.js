import axios from "axios";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    GET_ITEM_STOCK: (
      { commit },
      { page, per_page, item_code, item_name, barcode }
    ) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/item-stock", {
            page: page,
            per_page: per_page,
            item_code: item_code,
            item_name: item_name,
            barcode: barcode,
          })
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },

    GET_ITEM_STOCK_LIST: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get("/item-stock/list")
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },
  },
};
