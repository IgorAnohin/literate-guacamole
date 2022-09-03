import {LOGIN_URL} from './api_paths';

export const loginUser = async (name, password) => {
    try {
        const response = await fetch(LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                password: password
            })
        });
        return response.json();
    } catch (err) {
        console.log(err);
        return null;
    }
};
