import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/HomePage/Home";
import Notice from "./pages/NoticePage/Notice";
import Reservation from "./pages/ReservationPage/Reservation";
import Thankyou from "./pages/ThankyouPage/Thankyou";
import Management from "./pages/ManagementPage/Management";
import BulletinBoard from "./pages/ListPage/BulletinBoard";

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
              <Route path="/thankyou" component={Thankyou}></Route>
              <Route path="/bulletinBoard" component={BulletinBoard}></Route>
              <Route path="/management" component={Management}></Route>
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}
