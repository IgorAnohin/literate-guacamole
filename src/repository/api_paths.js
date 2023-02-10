export const BASE_URL = "http://localhost:4242";
const _API_URL = `${BASE_URL}/api`

const _AUTH = `${_API_URL}/auth`
export const LOGIN_URL = `${_AUTH}/login`;
export const GET_ROLE = `${_AUTH}/info`;

export const LOGOUT_URL = _API_URL + "/logout";

export const BUILD_ORDERS = `${_API_URL}/build-orders`
export const BUILD_ORDERS_CREATE = `${_API_URL}/build-orders/create-new`

export const BUILD_ORDERS_CHANGE_STATUS = (orderId) => `${_API_URL}/build-orders/${orderId}/set-status`

export const ASSETS = `${_API_URL}/asset-defs`

export const AUDIT = `${_API_URL}/audit`

export const USERS = `${_API_URL}/users`
export const GET_USER = (userId) => `${USERS}/${userId}`;

