import { USERS_URL, TOKEN_URL, CHANGEPASSWORD_URL } from "../AppSettings";
import axios from "axios";

const AuthService = {
    login,
    logout,
    getCurrentUser,
    changePassword
};

export let AUTH = JSON.parse(localStorage.getItem("authData")) || {};

function login(email, password) {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `username=${email}&password=${password}`
    };
    return fetch(TOKEN_URL, requestOptions)
        .then(handleResponse)
        .then(response => {
            if (response) {
                var date = Date.now() + response.expires_in * 1000;
                response.expires_in = date;
                localStorage.setItem("authData", JSON.stringify(response));
                AUTH = response;
            }
            return response;
        })
        .catch(err => err);
}


// function login(email, password) {
//     const requestOptions = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//         },
//         body: `grant_type=password&UserName=${email}&Password=${password}`
//     };
//     return fetch(TOKEN_URL, requestOptions)
//         .then(handleResponse)
//         .then(response => {
//             if (response) {
//                 var date = Date.now() + response.expires_in * 1000;
//                 response.expires_in = date;
//                 localStorage.setItem("authData", JSON.stringify(response));
//                 AUTH = response;
//             }
//             return response;
//         })
//         .catch(err => err);
// }

function logout() {
    //remove user from local storage to log user out
    localStorage.clear();
}

function changePassword(newPassword, currentPassowd) {
    let data = {
        newPassword: newPassword,
        currentPasssword: currentPassowd
    }
    return axios({
        method: "POST",
        url: CHANGEPASSWORD_URL,
        data: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AUTH["access_token"]}`
        }
    })
        .then(response => response.data)
        .catch(error => console.error("Error:", error.message));
}

function getCurrentUser() {
    return axios
        .get(USERS_URL, {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                Authorization: "Bearer " + AUTH["access_token"]
            }
        })
        .then(response => response.data)

        .catch(error => console.error("Error:", error));
}

function handleResponse(response) {
    if (response.ok) {
        return response.json();
    } else if (response.status === 400) {
        response.json().then(errors => {
            //NotificationService.displayErrors(Object.values(errors));
        });
        return Promise.reject("");
    } else if (response.status === 401) {
        // auto logout if 401 response returned from api
        AuthService.logout();
        window.location.href = "/login";
        return Promise.reject(response.statusText);
    } else {
        return Promise.reject(response.statusText);
    }
}

export default AuthService;
