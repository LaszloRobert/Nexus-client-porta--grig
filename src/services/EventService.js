import axios from "axios";
import { EVENTS_URL, PARTICIPANTS_URL } from "../AppSettings";
import { AUTH } from "./AuthService";

const EventService = {
    getEvents,
    invite,
    removeParticipant
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

function getEvents(id) {
    return axios.get(`${EVENTS_URL}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH["access_token"]}`
        }
    })
        .then(response => response.data)
        .catch(error => console.error("Error:", error));
}

function invite(user) {
    return axios({
        method: "POST",
        url: PARTICIPANTS_URL,
        data: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH["access_token"]}`
        }
    })
        .then(response => response.data)
        .catch(error => console.error("Error:", error));
}

function removeParticipant(user) {
    return axios({
        method: "DELETE",
        url: PARTICIPANTS_URL,
        data: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH["access_token"]}`
        }
    })
        .then(response => response.data)
        .catch(error => console.error("Error:", error));
}

export default EventService;
