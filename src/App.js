import React, { Component } from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import "./App.css";
import Intro from "./components/Intro";
import CrudDb from "./components/CrudDb";
import TayaraUsers from "./components/TayaraUsers";
import TayaraPass from "./components/TayaraPass";

import { CSSTransition, TransitionGroup } from "react-transition-group";

// class component
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="nav">
          <NavLink exact to="/" activeClassName="active">
            Intro
          </NavLink>
          <NavLink to="/CrudDb" activeClassName="active">
            Crud Operation
          </NavLink>
          <NavLink to="/TayaraUser" activeClassName="active">
            Tayara Users
          </NavLink>
          <NavLink to="/TayaraPass" activeClassName="active">
            Tayara Pass
          </NavLink>
        </div>
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition key={location.key} timeout={450} classNames="fade">
                <Switch location={location}>
                  <Route exact path="/" component={Intro} />
                  <Route path="/CrudDb" component={CrudDb} />
                  <Route path="/TayaraUser" component={TayaraUsers} />
                  <Route path="/TayaraPass" component={TayaraPass} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </div>
    );
    TayaraPass;
  }
}

export default App;
