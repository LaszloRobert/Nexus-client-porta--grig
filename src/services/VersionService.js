import axios from "axios";
import { VERSIONS_URL } from "../AppSettings";
import { AUTH } from "./AuthService";

const VersionService = {
    getVersions
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

function getVersions(id) {
    return axios.get(`${VERSIONS_URL}/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH["access_token"]}`
        }
    })
        .then(response => response.data)
        .catch(error => console.error("Error:", error));
}

export default VersionService;
