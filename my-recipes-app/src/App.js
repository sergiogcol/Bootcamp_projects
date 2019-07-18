import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Navbar from "./components/stateless components/Navbar/Navbar";
import Dashboard from './components/stateless components/Dashboard/Dashboard';
import RecipeDetails from './components/stateless components/RecipeDetails/RecipeDetails';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import UpdateRecipe from './components/UpdateRecipe/UpdateRecipeSection';
import NoPageMatch from "./components/stateless components/404error/404error";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div id="app">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/recipe/:id" component={RecipeDetails}/>
            <Route path="/create" component={CreateRecipe}/>
            <Route path="/update/:id" component={UpdateRecipe}/>
            <Route path="/signin" component={SignIn}/>
            <Route path="/signup" component={SignUp}/>
            <Route component={NoPageMatch}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
