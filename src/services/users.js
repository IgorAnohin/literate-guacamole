export const createUser = async (email, password, role, router) => {
    // const userToken = await loginUser(email, password);
    const newUserId = "123";

    if (newUserId == null) {
        console.log("error");
    } else {
        // router.replace(`/`);
        // router.push(`/`);
        router.go(-1);
    }

    return newUserId;
}

export const deleteUser = async (userId) => {

}
