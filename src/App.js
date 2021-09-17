import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/HomePage/Home";
import Notice from "./pages/NoticePage/Notice";
import Reservation from "./pages/ReservationPage/Reservation";
import Thankyou from "./pages/ThankyouPage/Thankyou";
import Management from "./pages/ManagementPage/Management";
import BulletinBoard from "./pages/ListPage/BulletinBoard";
import MemberSystem from "./pages/MemberSystemPage/MemberSystem";

export default class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      // <Router basename={process.env.PUBLIC_URL}>
      <Router>
        <div className="container">
          <Header />
          <main>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/notice" component={Notice} />
              <Route path="/reservation" component={Reservation} />
              <Route path="/thankyou" component={Thankyou} />
              <Route path="/bulletinBoard" component={BulletinBoard} />
              <Route path="/management" component={Management} />
              <Route path="/memberSystem" component={MemberSystem} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    );
  }
}
