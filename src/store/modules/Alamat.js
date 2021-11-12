import axios from "axios";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    GET_PROVINCE_LIST: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get("/province/list")
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    GET_CITY_LIST: ({ commit }, { province_id }) => {
      return new Promise((resolve, reject) => {
        axios
          .get(`/city?province_id=` + province_id)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    ADD_ALAMAT: (
      { commit },
      {
        address,
        phone,
        fax,
        npwp,
        city,
        province,
        active_flag,
        ship_flag,
        primary_ship_flag,
      }
    ) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/address/save/", {
            address: address,
            phone: phone,
            fax: fax,
            npwp: npwp,
            city: city,
            province: province,
            active_flag: active_flag,
            ship_flag: ship_flag,
            primary_ship_flag: primary_ship_flag,
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    DELETE_ALAMAT: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/address/delete/" + id)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    GET_ALAMAT: (
      { commit },
      { page, per_page, address, phone, npwp, city, province }
    ) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/address", {
            page: page,
            per_page: per_page,
            address: address,
            phone: phone,
            npwp: npwp,
            city: city,
            province: province,
          })
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },
    UPDATE_ALAMAT: (
      { commit },
      {
        id,
        address,
        phone,
        fax,
        npwp,
        city,
        province,
        ship_flag,
        primary_ship_flag,
      }
    ) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/address/update/" + id, {
            address: address,
            phone: phone,
            fax: fax,
            npwp: npwp,
            city: city,
            province: province,
            ship_flag: ship_flag,
            primary_ship_flag: primary_ship_flag,
          })
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },
    GET_ALAMAT_ID: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .get("address/" + id)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },
  },
};
