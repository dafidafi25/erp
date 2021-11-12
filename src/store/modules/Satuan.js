import axios from "axios";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    REGISTER_SATUAN: (
      { commit },
      { uom_code, description, base_uom_flag, active_flag, primary_flag }
    ) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/uom/save", {
            uom_code: uom_code,
            description: description,
            base_uom_flag: base_uom_flag == true ? 1 : 2,
            active_flag: active_flag == true ? 1 : 2,
            primary_flag: primary_flag == true ? 1 : 2,
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    UPDATE_SATUAN: (
      { commit },
      { id, uom_code, description, base_uom_flag, active_flag, primary_flag }
    ) => {
      console.log(base_uom_flag, active_flag, primary_flag);
      return new Promise((resolve, reject) => {
        axios
          .post("/uom/update/" + id, {
            id: id,
            uom_code: uom_code,
            description: description,
            base_uom_flag: base_uom_flag == true ? 1 : 0,
            active_flag: active_flag == true ? 1 : 0,
            primary_flag: primary_flag == true ? 1 : 0,
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    DELETE_SATUAN: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/uom/delete/" + id)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    GET_SATUAN: ({ commit }, { page, per_page, uom_code, description }) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/uom", {
            page: page,
            per_page: per_page,
            uom_code: uom_code,
            description: description,
          })
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },
    GET_SATUAN_LIST: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get("/uom/list")
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },
  },
};
