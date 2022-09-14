import {loginRequest, logoutRequest} from '../repository/auth';
import {ADMIN_ROLE, DEBUG} from "../constants";


export const login = async (email, password) => {
    let userData;
    if (DEBUG) {
        userData = {token: "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoiYWRtaW4iLCJleHAiOjE2NjMxMjYwMzcsImlhdCI6MTY2MzA5MDAzNywic2NvcGUiOiJhZG1pbiJ9.aOpDucwxPAIBSXzzowV2L3PM7ciD6rysVzF_PT3IpGBvqGhA1oeK7Je8VZMpqX-8hQ34OfPYqfkjlTVMxOfeYHL5nUEOt7ztyWs7JlP4XVTbmLldR_pOHZ7JM6u2udzkB3VLoAOCIznFFIJNLRXVE6LfiA0FPIXWkNxYViSrGEy8wsS4pXHcdH5dA0YcMVUXPCjkv7VRmDe6TpjAUmkYEGL83_loSev_wp5mh-f_0Ssgdrs8tR4XbzUaDRg1ptodj4xPVqCgjTINbkkk5m1EB6DHm12mpxk43t1Xq4aEFD-ltCUF-31siZBlYgMoGGJOF1VZs178a_UhryjWlfP0LA"}
    } else {
        userData = await loginRequest(email, password);
    }

    const userToken = userData.token;

    if (userToken == null) {
        console.log("error");
    } else {
        console.log(`New user token ${userToken}`);
        localStorage.setItem('token', userToken);
    }

    return userToken;
}

export const logout = async () => {
    const userToken = getToken();
    const success = DEBUG ? true : await logoutRequest(userToken);

    if (success) {
        localStorage.removeItem('token');
    }
    return success;
}

export const getToken = () => localStorage.getItem('token');
