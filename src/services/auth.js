import {loginRequest, logoutRequest} from '../repository/auth';
import {ADMIN_ROLE, DEBUG} from "../constants";


export const login = async (email, password, navigate) => {
    let userData;
    if (DEBUG) {
        userData = {token: "123", role: ADMIN_ROLE}
    } else {
        userData = await loginRequest(email, password);
    }

    const userToken = userData.token;
    const userRole = userData.role;

    if (userToken == null) {
        console.log("error");
    } else {
        console.log(`New user token ${userToken}`);
        sessionStorage.setItem('token', userToken);
        sessionStorage.setItem('role', userRole);

        navigate.replace("/");
    }

    return userToken;
}

export const logout = async () => {
    const userToken = getToken();
    const success = await logoutRequest(userToken);
    if (success) {
        sessionStorage.removeItem('token');
    }
}

export const getToken = () => sessionStorage.getItem('token');
