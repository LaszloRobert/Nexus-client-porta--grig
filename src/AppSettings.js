//export const ORIGIN = "https://nexus.salemsports.com";
// export const ORIGIN = "https://nexusapp.eastus.cloudapp.azure.com:8080";
// export const ORIGIN = "http://localhost:1025";
// export const ORIGIN = "http://localhost:81";
// export const ORIGIN = "https://localhost:7082";

//Local npm run build:local
export const ORIGIN = "https://localhost:7034";

// Development azure - In azure we have the path "/clientportal" that is why we add /clientportal to ORIGIN - npm run build:clould
// export const ORIGIN = "https://salemsportswebapp-development.azurewebsites.net/clientportal";

//Production - npm run build:clould
// export const ORIGIN = "https://nexus.salemsports.com/clientportal";

export const BASE_URL = `${ORIGIN}/api`;
export const EVENTS_URL = `${BASE_URL}/events`;
export const PARTICIPANTS_URL = `${BASE_URL}/participants`;
export const ORDERS_URL = `${BASE_URL}/orders`;
export const VERSIONS_URL = `${BASE_URL}/versions`;
export const COMMENTS_URL = `${BASE_URL}/comments`;
export const DOCUMENTS_URL = `${BASE_URL}/documents`;
export const ATTACHMENT_URL = `${BASE_URL}/documents/attachment`;
export const THUMBNAILS_URL = `${BASE_URL}/documents/thumbnail`;
export const USERS_URL = `${BASE_URL}/users`;
export const TOKEN_URL = `${BASE_URL}/auth/token`;
// export const TOKEN_URL = `${BASE_URL}/token`; --old app
export const CHANGEPASSWORD_URL = `${BASE_URL}/users/changePassword`;
export const NOTIFICATIONS_URL = `${BASE_URL}/notifications`;
export const NOTIFICATIONS_LAYOUT = `${BASE_URL}/notifications/LayoutNotification`;
export const READ_NOTIFICATIONS = `${BASE_URL}/notifications/ReadNotifications`;

//resources
export const BG_IMAGE = `${ORIGIN}/static/media/bg_image.e9f94c21.png`;
export const LOGIN_BRANDING_IMAGE = `${ORIGIN}/static/media/Login Page Branding_adjusted.png`;
export const LOGO = `${ORIGIN}/static/media/nexus_logo.1479cf38.svg`;
export const EULA = `${ORIGIN}/static/media/200208 CLIENT PORTAL AGREEMENT - Beta FINAL.pdf`;


