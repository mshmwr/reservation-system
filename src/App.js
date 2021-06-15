import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Notice from "./pages/Notice";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/notice" component={Notice}></Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
