import axios from "axios";
import {GET_ROLE, USERS} from "./api_paths";

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

export const createUserRequest = async (email, password, role, token) => {
    // returns new user ID
}

export const deleteUserRequest = async (userId, token) => {

}

export const updateUserRequest = async (userId, updatedFieldName, newValue, token) => {
}

