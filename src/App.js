import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Notice from "./pages/Notice";
import Reservation from "./pages/Reservation";
import BulletinBoard from "./pages/BulletinBoard";

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="container">
          <Header />
          <main>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route path="/notice" component={Notice}></Route>
              <Route path="/reservation" component={Reservation}></Route>
              <Route path="/bulletinBoard" component={BulletinBoard}></Route>
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}
