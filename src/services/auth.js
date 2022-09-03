import { loginUser } from '../repository/auth';


export const login = async (email, password, navigate) => {
    // const userToken = await loginUser(email, password);
    const userToken = "123";
    const userRole = "admin";

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

export const getToken = () => sessionStorage.getItem('token');
export const getRole = () => sessionStorage.getItem('role');


// export const userToken = () => {
//     const getToken = () => {
//         const tokenString = sessionStorage.getItem('token');
//         const userToken = JSON.parse(tokenString);
//         return userToken?.token
//     };
//
//     const [token, setToken] = useState(getToken());
//
//     const saveToken = userToken => {
//         sessionStorage.setItem('token', JSON.stringify(userToken));
//         setToken(userToken.token);
//     };
//
//     return {
//         setToken: saveToken,
//         token
//     }
// }
