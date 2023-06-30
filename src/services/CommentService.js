import axios from "axios";
import { COMMENTS_URL } from "../AppSettings";
import { AUTH } from "./AuthService";

const CommentsService = {
    addComment
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

function addComment(data) {
    return axios({
        method: "POST",
        url: COMMENTS_URL,
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH["access_token"]}`
        }
    })
        .then(response => response.data)
        .catch(error => console.error("Error:", error.message));
}

export default CommentsService;
