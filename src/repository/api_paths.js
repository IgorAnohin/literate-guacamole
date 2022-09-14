export const BASE_URL = "http://localhost:4242";
const _API_URL = `${BASE_URL}/api`

export const LOGIN_URL = _API_URL + "/login";
export const LOGOUT_URL = _API_URL + "/logout";

export const BUILD_ORDERS = `${_API_URL}/build-orders`
export const BUILD_ORDERS_CREATE = `${_API_URL}/build-orders/create-new`

export const ASSETS = `${_API_URL}/asset-defs`

export const AUDIT = `${_API_URL}/audit`

export const GET_ROLE = `${_API_URL}/auth/info`

export const USERS = `${_API_URL}/users`
