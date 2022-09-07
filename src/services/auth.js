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

// export const getToken = () => sessionStorage.getItem('token');
export const getToken = () => "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiYWRtaW5AaXRtby5ydSIsImV4cCI6MTY2MjU2Njk4MiwiaWF0IjoxNjYyNTMwOTgyLCJzY29wZSI6IndhcnJpb3IifQ.jRwgEtAxX7055R4cyeFmLzDR_H5tmk-F7jiZ0ajEFPb5EAyKzSoeaQzgfk4BcewfTEbN2u2soujYT5GVglGtxsTSSkBoSJ_TN7fX2OcjFDCPR7vDvBM_CDylnJiGp4ZFIhe9ilyTAU9UwKlqaFmhE3f_fs_ETtXn1nuCJ4PUf7pV2XaPgY4vEUyMLMyGXvTGKDCkipeaSp46cgJAsR_dlwtaWDZSSgai1gnghyEcgPRDjYzpQX-KJDAQlQwAsupwIQJbO4gMAUBX0HUV2TLUhF4Pj2h8GvLS01_hYe85XDE1yn6FZL6AWOBhhlVMXkGKGKNDirQN5Ub9qBDcl2tXbQ";
