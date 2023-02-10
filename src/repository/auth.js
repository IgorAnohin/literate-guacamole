import {LOGIN_URL, LOGOUT_URL} from './api_paths';


export const loginRequest = async (name, password) => {
    try {
        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: name,
                password: password
            })
        });
        return response.json();
    } catch (err) {
        console.log("Unable to login:");
        console.log(err);
        return null;
    }
};


export const logoutRequest = async (token) => {
    try {
        await fetch(LOGOUT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return true;
    } catch (err) {
        console.log("Unable to logout:");
        console.log(err);
        return false;
    }
};
