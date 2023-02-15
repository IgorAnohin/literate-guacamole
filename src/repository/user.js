import axios from "axios";
import {GET_ROLE, GET_USER, USERS} from "./api_paths";

export const getRoleRequest = async (token) => {
    try {
        const response = await axios.get(GET_ROLE, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            },
        )
        return response.data;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export const getUserRequest = async (userId, token) => {
    try {
        const response = await axios.get(GET_USER(userId), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            },
        )
        return response.data;
    } catch (err) {
        console.log(err);
        return {};
    }
}

export const getUsersRequest = async (token) => {
    try {
        const response = await axios.get(USERS, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            },
        )
        return response.data;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export const createUserRequest = async (username, email, password, role, avatarUrl, token) => {
    // returns new user ID
    try {
        const data = {
            'email': email,
            'username': username,
            'password': password,
            'role': role,
            'avatarUrl': avatarUrl,
        }
        const response = await axios.post(USERS, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            },
        )
        return response.data.id;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export const deleteUserRequest = async (userId, token) => {
    try {
        const response = await axios.delete(`${USERS}/${userId}`, {
                headers: {'Authorization': `Bearer ${token}`}
            },
        )
    } catch (err) {
        console.log(err);
        alert(err.response.data.message);
    }
}

export const updateUserRequest = async (userId, updatedData, token) => {
    try {
        const response = await axios.patch(`${USERS}/${userId}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            },
        )
        return response.data.id;
    } catch (err) {
        console.log(err);
        return [];
    }
}

