const initState = {
    authError: null
}
const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':
            console.log('login error')
            return {
                ...state,
                authError: 'Login failed: please check the email and password provided'
            };
        case 'LOGIN_SUCCESS': 
        console.log('login success')
            return {
                ...state,
                authError: null
            };
        case 'SIGNEDOUT_SUCCESS':
            console.log('signedout success')
            return state;
        case 'SIGNUP_SUCCESS':
            console.log('signup success')
            return{
                ...state,
                authError: null
            }
        case 'SIGNUP_ERROR':
            console.log('signup error')
            return {
                ...state,
                authError: action.err.message
            }
        default:
            return state;
    }
}
export default authReducer;