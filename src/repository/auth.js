import {ASSET_DEFS, LOGIN_URL, LOGOUT_URL} from './api_paths';
import axios from "axios";
import { toast } from 'react-toastify';


export const loginRequest = async (name, password) => {
    try {
        const response = await axios.post(LOGIN_URL, {
                email: name,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`,
                }
            },
        )
        return response.data;
    } catch (err) {
        console.log("Unable to login:", err);
        toast.error(err.response.data.message);
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
        console.log("Unable to logout:", err);
        return false;
    }
};
