import recipeReducer from "./recipeReducer";
import {combineReducers} from "redux";
import {firestoreReducer} from "redux-firestore";
import {firebaseReducer} from "react-redux-firebase";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    recipe: recipeReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;
