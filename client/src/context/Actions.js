export const LoginStart = (userCrendential) => ({
    type: "LOGIN_START",

});

export const LoginSucccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload : user
});

export const LoginFailure = () => ({
    type:"LOGIN_FAILURE"
});

export const Logout = () => ({
    type: "LOGOUT",

});

export const updateStart = (userCrendential) => ({
    type: "UPDATE_START",

});

export const updateSucccess = (user) => ({
    type: "UPDATE_SUCCESS",
    payload : user
});

export const updateFailure = () => ({
    type:"UPDATE_FAILURE"
});