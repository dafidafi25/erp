import axios from "axios";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    ADD_CUSTOMER: (
      { commit },
      {
        address,
        name,
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
          .post("/customer/save/", {
            address: address,
            name: name,
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
    DELETE_CUSTOER: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/customer/delete/" + id)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    GET_CUSTOMER: (
      { commit },
      { page, per_page, address, name, phone, npwp, city, province }
    ) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/customer", {
            page: page,
            per_page: per_page,
            address: address,
            name: name,
            phone: phone,
            npwp: npwp,
            city: city,
            province: province,
          })
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },
    UPDATE_CUSTOMER: (
      { commit },
      {
        id,
        name,
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
          .post("/customer/update/" + id, {
            address: address,
            name: name,
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
    GET_CUSTOMER_ID:({commit},{id})=>{
      return new Promise((resolve,reject)=>{
        axios
          .get("/customer/" +id)
          .then((res)=>resolve(res))
          .catch((err)=>reject(err))
      })
    }
  },
};
