import React, {Component} from 'react'
import RecipeList from "../RecipeList/RecipeList"
import {connect} from "react-redux"
import {firestoreConnect} from "react-redux-firebase"
import {compose} from "redux"
import {Redirect} from 'react-router-dom'
import "./Dashboard.css"

class Dashboard extends Component {
    static defaultProps = {
        recipes: []
    }
    render(){
        const {recipes, auth} = this.props;
        const userRecipes = recipes.filter( recipe => 
            recipe.authorId === auth.uid
        ) 
        console.log(userRecipes);
        if(!auth.uid) return <Redirect to="/signin"/> 
        return (
            <article className="recipe_dashboard">
                <RecipeList userRecipes={userRecipes}/>
            </article>
        )    
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    
    return {
        recipes: state.firestore.ordered.recipes,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: "recipes"}
    ])
)(Dashboard);

