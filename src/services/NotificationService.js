import axios from "axios";
import { NOTIFICATIONS_URL, NOTIFICATIONS_LAYOUT, READ_NOTIFICATIONS } from "../AppSettings";
import { AUTH } from "./AuthService";

const NotificationService = {
    getNotifications,
    readNotification,
    readNotifications,
    getLayoutForNotifications
};

function getNotifications(id) {
    return axios.get(`${NOTIFICATIONS_URL}/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH["access_token"]}`,
        }
    })
        .then(response => response.data)
        .catch(error => console.error("Error:", error));
}

function readNotification(data) {
    return axios({
        method: "POST",
        url: NOTIFICATIONS_URL,
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH["access_token"]}`
        }
    })
        .then(response => response.data)
        .catch(error => console.error("Error:", error.message));
}

function readNotifications(data) {
    return axios({
        method: "POST",
        url: READ_NOTIFICATIONS,
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH["access_token"]}`
        }
    })
        .then(response => response.data)
        .catch(error => console.error("Error:", error.message));
}

function getLayoutForNotifications(data) {
    return axios({
        method: "POST",
        url: NOTIFICATIONS_LAYOUT,
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH["access_token"]}`
        }
    })
        .then(response => response.data)
        .catch(error => console.error("Error:", error.message));
}

export default NotificationService;