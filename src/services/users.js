import {ADMIN_ROLE, BUILDER_ROLE, DEBUG, OWNER_ROLE, PAYMASTER_ROLE} from "../constants";
import {
    createUserRequest, deleteUserRequest,
    getRoleRequest, getUserRequest,
    getUsersRequest,
    updateUserRequest,
    uploadAvatarRequest
} from "../repository/user";
import {getToken} from "./auth";

const MOCK_AVATAR_URL = "https://img.freepik.com/free-photo/portrait-white-man-isolated_53876-40306.jpg";

export const getUserRole = async () => {
    let data
    if (DEBUG) {
        data = {
            "username": "admin",
            "roles": [
                PAYMASTER_ROLE
            ]
        }
    } else {
        data = await getRoleRequest(getToken());
    }

    return data.roles[0];
}

export const getUser = async (userId) => {
    let data
    if (DEBUG) {
        data = {id: 1, name: "MyName1", image: MOCK_AVATAR_URL, email: "q@q.ru", role: BUILDER_ROLE, last_enter: "08.11.2022 15:44"};
    } else {
        data = await getUserRequest(userId, getToken());
    }

    return data;
}

export const getUsers = async () => {
    let data;
    if (DEBUG) {
        data = [
            {id: 1, name: "MyName1", image: MOCK_AVATAR_URL, email: "1", role: ADMIN_ROLE, last_enter: "08.11.2022 15:44"},
            {id: 2, name: "MyName2", image: MOCK_AVATAR_URL, email: "12", role: BUILDER_ROLE, last_enter: "08.11.2022 15:44"},
            {id: 3, name: "MyName3", image: MOCK_AVATAR_URL, email: "123", role: OWNER_ROLE, last_enter: "08.11.2022 15:44"},
            {id: 4, name: "MyName4", image: MOCK_AVATAR_URL, email: "2", role: ADMIN_ROLE, last_enter: "08.11.2022 15:44"},
        ];
    } else {
        data = await getUsersRequest(getToken());
    }

    return data;
}

export const createUser = async (email, password, role, avatar, router) => {
    let avatarUrl;
    if (DEBUG) {
        avatarUrl = MOCK_AVATAR_URL;
    } else {
        avatarUrl = await uploadAvatarRequest(avatar, getToken());
    }

    console.log(email, password, role, avatar, avatarUrl);

    let data;
    if (DEBUG) {
        data = "123";
    } else {
        data = await createUserRequest(email, password, role, avatarUrl, getToken());
    }

    const newUserId = data;

    if (newUserId == null) {
        console.log("error");
    } else {
        router.go(-1);
    }

    return newUserId;
}

export const deleteUser = async (userId, router) => {
    if (DEBUG) {
        // Do nothing in case of Debug
    } else {
        await deleteUserRequest(userId, getToken())
    }

    router.go(-1);
}

export const updateUser = async (userId, updatedData, newImage, oldImage, router) => {
    let newUserAvatar = oldImage;
    if (newImage != "") {
        if (DEBUG) {
            newUserAvatar = MOCK_AVATAR_URL;
        } else {
            newUserAvatar = await uploadAvatarRequest(newImage, getToken());
        }

        updatedData.avatar = newUserAvatar;
    }

    if (DEBUG) {
        // Do nothing in case of Debug
    } else {
        await updateUserRequest(userId, updatedData, getToken())
    }

    router.go(-1);
}
