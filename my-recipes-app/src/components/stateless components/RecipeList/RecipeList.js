import React from 'react'
import RecipeSummary from "../RecipeSummary/RecipeSummary"
import {NavLink}from "react-router-dom"
import "./RecipeList.css"


const RecipeList = ({userRecipes}) => {
   
    return(
        <article className="recipes">
            { userRecipes && userRecipes.map(renderRecipeSummary)}
        </article>
    )
}
const renderRecipeSummary = recipe => {
    return (
        <NavLink to={"/recipe/"+ recipe.id} className="recipeSummary" key={recipe.id}>
            <RecipeSummary recipe={recipe} />
        </NavLink>
    )
}

export default RecipeList;

