import axios from "axios";

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    REGISTER_USER: (
      { commit },
      {
        username,
        name,
        email,
        password,
        gender,
        is_karyawan,
        role,
        description,
        dept_id,
      }
    ) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/users/register", {
            username: username,
            name: name,
            email: email,
            password: password,
            gender: gender,
            is_karyawan: is_karyawan,
            role: role,
            description: description,
            dept_id: dept_id,
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    UPDATE_USER: (
      { commit },
      { id, username, name, email, password, gender, is_karyawan }
    ) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/users/update/" + id, {
            username: username,
            name: name,
            email: email,
            password: password,
            gender: gender,
            is_karyawan: is_karyawan,
          })
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    DELETE_USER: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/users/delete/" + id)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    GET_USER: ({ commit }, { page, per_page, username, name }) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/users", {
            page: page,
            per_page: per_page,
            username: username,
            name: name,
          })
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },
    GET_ROLES_LIST: ({ commit }) => {
      return new Promise((resolve, reject) => {
        axios
          .get("/roles/list")
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },
    UPDATE_KARYAWAN: (
      { commit },
      { id, username, name, description, dept_id }
    ) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/karyawan/update/" + id, {
            username: username,
            name: name,
            description: description,
            dept_id: dept_id,
          })
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },
    GET_KARYAWAN: (
      { commit },
      { page, per_page, username, name, dept_name }
    ) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/karyawan", {
            page: page,
            per_page: per_page,
            username: username,
            name: name,
            dept_name: dept_name,
          })
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },
    DELETE_KARYAWAN: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/karyawan/delete/" + id)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },
  },
};
