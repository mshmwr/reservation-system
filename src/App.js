import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Switch>
          <Route exact path="/" component={Home}></Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
