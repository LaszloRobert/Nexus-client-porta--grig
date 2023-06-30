import axios from "axios";
import { ORDERS_URL } from "../AppSettings";
import { AUTH } from "./AuthService";

const OrderService = {
    getOrders
};

// const UNAUTHORIZED = 401;
// axios.interceptors.response.use(
//   response => response,
//   error => {
//       const {status} = error.response;
//       if (status === UNAUTHORIZED) {
//         localStorage.clear();
//         window.location.href = "/login";
//       }
//       return Promise.reject(error);
//  }
// );

function getOrders(id) {
    return axios.get(`${ORDERS_URL}/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH["access_token"]}`
        }
    })
        .then(response => response.data)
        .catch(error => console.error("Error:", error));
}

export default OrderService;
