import React, { Component } from 'react'
import AddIngredient from "../AddIngredient/AddIngredient"
import {createRecipe} from "../../store/actions/recipeAction"
import {connect} from "react-redux"
import "./CreateRecipe.css"
import {Redirect} from 'react-router-dom'

class CreateRecipe extends Component {
    constructor(props){
        super(props);
        this.state = {
            title:"",
            preparation:"",
            preptime: "",
            cooktime: "",
            servings:"",
            ingredients:[]
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.id] : event.target.value
        })   
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.createRecipe(this.state)
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
        const {auth} = this.props;
        if(!auth.uid) return <Redirect to="/signin"/> 
        const ingredients = this.state.ingredients
        const listOfIngredients = ingredients.map( item => {
            return (
            <div className="ingredient-chip" key={item.id}>
                <div className="ingredient">{item.ingredient}</div>
                <span class="closebtn" onClick={()=>{this.deleteIngredient(item.id)}}>&times;</span>
            </div>
        )
    }) 
        return (
            <article className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <div>
                        <button className="save" id="save">save recipe</button>
                    </div>
                    <h5>New Recipe</h5>
                    <div>
                        <input type="text" id="title" onChange={this.handleChange} aria-describedby="required field" required/>
                        <label htmlFor="title">Recipe Title</label>
                    </div>
                    <div>
                        <textarea id="preparation" onChange={this.handleChange} aria-describedby="required field" required/>
                        <label htmlFor="preparation">Preparation</label>
                    </div>
                    <div>
                        <input type="time"  id="preptime" onChange={this.handleChange} aria-describedby="required field" required/>
                        <label htmlFor="preptime">Preparation Time (Hours:Minutes)</label>
                    </div>
                    <div>
                        <input type="time"  id="cooktime" onChange={this.handleChange} aria-describedby="required field" required/>
                        <label htmlFor="cooktime">Cook Time (Hours:Minutes)</label>
                    </div>
                    <div>
                        <input type="number" min="1" id="servings" onChange={this.handleChange} aria-describedby="value must be greater than or equal to 1" required/>
                        <label htmlFor="servings">Servings</label>
                    </div>
                </form>
                <AddIngredient addIngredientToList={this.addIngredientToList.bind(this)}/>
                <div>{listOfIngredients}</div>
            </article>
        )
  }
}
const mapStateToProps = (state) => {
   return {
    auth: state.firebase.auth
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createRecipe: (recipe) => dispatch(createRecipe(recipe))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipe);
