import React, { Component } from 'react'
import {connect} from "react-redux"
import {firestoreConnect} from "react-redux-firebase"
import {compose} from "redux"
import AddIngredient from "../AddIngredient/AddIngredient"
import {updateRecipe} from "../../store/actions/recipeAction"
import "./UpdateRecipeSection.css"

class UpdateRecipe extends Component {
    constructor(props){
        super(props);
        const {recipe}= this.props;
        this.state= {
            title: recipe.title,
            preparation: recipe.preparation,
            preptime: recipe.preptime,
            cooktime: recipe.cooktime,
            servings: recipe.servings,
            ingredients: recipe.ingredients
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.id] : event.target.value
        })   
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const recipeId = this.props.match.params.id;
        this.props.updateRecipe(recipeId,this.state)
        this.props.history.push("/");
    } 
    addIngredientToList = (newIngredient) => {
        newIngredient.id = this.state.ingredients.length+1;
        this.setState({
          ingredients: this.state.ingredients.concat(newIngredient)
        }) 
    }
    deleteIngredient = (id) =>{
        let ingredients = this.state.ingredients.filter(item => {
            return item.id !== id
        });
        this.setState({
            ingredients: ingredients
        })
    }
    render() {
    const ingredients = this.state.ingredients
    const listOfIngredients = ingredients.map( item => {
        return (
            <div className="ingredient-chip" key={item.id} >
                <div className="ingredient">{item.ingredient}</div>
                <span className="closebtn" onClick={()=>{this.deleteIngredient(item.id)}}>&times;</span>
            </div>
        )
    })
        return (
        <article className="container">
            <form onSubmit={this.handleSubmit} className="white">
                <div>
                    <button className="save" id="update">save</button>
                </div>
                <h5>Update Recipe</h5>
                <br/>
                <div>
                    <input type="text" id="title" onChange={this.handleChange} value={this.state.title} aria-describedby="required field" required/>
                    <label htmlFor="title">Recipe Title</label>
                </div>
                <div>
                    <textarea id="preparation" onChange={this.handleChange} value={this.state.preparation} aria-describedby="required field" required/>
                    <label htmlFor="preparation">Preparation</label>
                </div>
                <div>
                    <input type="time" id="preptime" onChange={this.handleChange} value={this.state.preptime} aria-describedby="required field" required/>
                    <label htmlFor="preptime">Preparation Time (Hours:Minutes)</label>
                </div>
                <div>
                    <input type="time" id="cooktime" onChange={this.handleChange} value={this.state.cooktime} aria-describedby="requiredfield" required/>
                    <label htmlFor="cooktime">Cook Time (Hours:Minutes)</label>
                </div>
                <div>
                    <input type="number" min="1" id="servings" onChange={this.handleChange} value={this.state.servings} aria-describedby="value must be greater than or equal to 1" required/>
                    <label htmlFor="servings">Servings</label>
                </div>
            </form>
            <AddIngredient addIngredientToList={this.addIngredientToList.bind(this)}/>
            <div>{listOfIngredients}</div>
        </article>
        )
    }
}
const mapStateToProps = (state, ownProps) => {

    const id = ownProps.match.params.id;
    const recipes = state.firestore.data.recipes;
    const recipe = recipes ? recipes[id] : null
    return {
        recipe : recipe
    }
}
const mapDispatchToProps = (dispatch) => {
    
    return {
        updateRecipe: (recipeId, recipe) => dispatch(updateRecipe(recipeId, recipe))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
        { collection: "recipes"}
    ])
)(UpdateRecipe);

