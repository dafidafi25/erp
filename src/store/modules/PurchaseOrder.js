import axios from "axios";

export default {
  actions: {
    GET_PURCHASE_ORDER: (
      { commit },
      {
        page,
        per_page,
        role,
        username,
        order_code,
        payment_method,
        accounting_name,
      }
    ) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/purchase-order", {
            page: page,
            per_page: per_page,
            role: role,
            username: username,
            order_code: order_code,
            payment_method: payment_method,
            accounting_name: accounting_name,
          })
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },
    ADD_PURCHASE_ORDER: (
      { commit },
      {
        username,
        keterangan,
        payment_method,
        active_flag,
        is_approved,
        accounting_val,
        items,
        role,
        accounting_name,
        penerima,
      }
    ) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/purchase-order/save", {
            username: username,
            keterangan: keterangan,
            payment_method: payment_method,
            active_flag: active_flag,
            is_approved: is_approved,
            items: items,
            role: role,
            accounting_val: accounting_val,
            accounting_name: accounting_name,
            penerima: penerima,
          })
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },
    UPDATE_PURCHASE_ORDER: (
      { commit },
      {
        id,
        username,
        keterangan,
        payment_method,
        active_flag,
        is_approved,
        accounting_val,
        items,
        role,
        accounting_name,
        penerima,
      }
    ) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/purchase-order/update/" + id, {
            username: username,
            keterangan: keterangan,
            payment_method: payment_method,
            active_flag: active_flag,
            is_approved: is_approved,
            items: items,
            role: role,
            accounting_name: accounting_name,
            accounting_val: accounting_val,
            penerima: penerima,
          })
          .then((res) => {
            if (
              res.data.message ==
              "Stock item masih ada lebih dari sama dengan 10"
            ) {
              reject(false);
            } else {
              resolve(res);
            }
          })
          .catch((err) => reject(err));
      });
    },
    DELETE_PURCHASE_ORDER: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post("purchase-order/delete/" + id)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },
    GET_PURCHASE_ORDER_ID: ({ commit }, { id }) => {
      return new Promise((resolve, reject) => {
        axios
          .get("/purchase-order/" + id)
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },
    GET_PO_ITEM: ({ commit }, { po_id }) => {
      return new Promise((resolve, reject) => {
        axios
          .post("/po-items", {
            po_id: po_id,
          })
          .then((res) => resolve(res))
          .catch((err) => reject(err));
      });
    },
  },
};
