
export const createRecipe = (recipe) => {
    
    return (dispatch, getState, {getFirebase, getFirestore}) => {
       
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;
        firestore.collection("recipes").add({
            ...recipe,
            authorFirstName:profile.firstName,
            authorLastName:profile.lastName,
            authorId: authorId,
        }).then(() => {
            dispatch({ type: "CREATE_RECIPE", recipe: recipe}) 
        }).catch((error)=>{
            dispatch({ type: "CREATE_RECIPE_ERROR", error})
        })
    }
};

export const deleteRecipe = (recipe) => {
    
    return (dispatch, getState, {getFirebase, getFirestore}) => {
       
        const firestore = getFirestore();
        firestore.collection("recipes").doc(recipe).delete().then(() => {
            dispatch({ type: "DELETE_RECIPE", recipe: recipe}) 
        }).catch((error)=>{
            dispatch({ type: "DELETE_RECIPE_ERROR", error})
        })
    }
};

export const updateRecipe = (recipeId, recipe) => {
    
    return (dispatch, getState, {getFirebase, getFirestore}) => {
       
        const firestore = getFirestore();
        firestore.collection("recipes").doc(recipeId).update({
            ...recipe
        }).then(() => {
            dispatch({ type: "UPDATE_RECIPE", recipe: recipe}) 
        }).catch((error)=>{
            dispatch({ type: "UPDATE_RECIPE_ERROR", error})
        })
    }
};
