import {ADMIN_ROLE, BUILDER_ROLE, DEBUG, OWNER_ROLE} from "../constants";
import {createUserRequest, getRoleRequest, getUsersRequest, updateUserRequest} from "../repository/user";
import {getToken} from "./auth";

export const getUserRole = async () => {
    if (DEBUG) {
        return ADMIN_ROLE;
    } else {
        return await getRoleRequest(getToken());
    }
}

export const getUsers = async () => {
    let data;
    if (!DEBUG) {
        data = [
            {id: 1, "email": "1", role: ADMIN_ROLE},
            {id: 2, "email": "12", role: BUILDER_ROLE},
            {id: 3, "email": "123", role: OWNER_ROLE},
            {id: 4, "email": "2", role: ADMIN_ROLE},
        ]
        ;
    } else {
        data = await getUsersRequest(getToken());
    }

    return data;
}

export const createUser = async (email, password, role, router) => {
    let data;
    if (DEBUG) {
        data = "123";
    } else {
        data = await createUserRequest(email, password, role, getToken());
    }

    const newUserId = data;

    if (newUserId == null) {
        console.log("error");
    } else {
        router.go(-1);
    }

    return newUserId;
}

export const deleteUser = async (userId) => {

}

export const updateUser = async (userId, updatedFieldName, newValue) => {
    if (DEBUG) {
        return true;
    } else {
        await updateUserRequest(userId, updatedFieldName, newValue, getToken())
    }
}
