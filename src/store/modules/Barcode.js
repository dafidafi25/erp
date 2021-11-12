import axios from "axios";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    GET_BARCODE: (
      { commit },
      { page, per_page, kode_item, item_name, barcode }
    ) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/barcode", {
            page: page,
            per_page: per_page,
            kode_item: kode_item,
            item_name: item_name,
            barcode: barcode,
          })
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },

    GET_BARCODE_LIST: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get("/barcode/list")
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },
  },
};
