import axios from "axios";
import { DOCUMENTS_URL, ATTACHMENT_URL, THUMBNAILS_URL } from "../AppSettings";
import { AUTH } from "./AuthService";

const DocumentService = {
    getDocument,
    getThumbnail,
    getAttachment
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


function getDocument(id) {
    return axios.get(`${DOCUMENTS_URL}/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH["access_token"]}`
        }
    })
        .then(response => response.data)
        .catch(error => console.error("Error:", error));
}

function getThumbnail(id) {
    return axios.get(`${THUMBNAILS_URL}/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH["access_token"]}`
        }
    })
        .then(response => response.data)
        .catch(error => console.error("Error:", error));
}

function getAttachment(id) {
    return axios.get(`${ATTACHMENT_URL}/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH["access_token"]}`
        }
    })
        .then(response => response.data)
        .catch(error => console.error("Error:", error));
}

export default DocumentService;