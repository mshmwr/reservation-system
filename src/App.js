import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/HomePage/Home";
import Notice from "./pages/NoticePage/Notice";
import Reservation from "./pages/ReservationPage/Reservation";
import Thankyou from "./pages/ThankyouPage/Thankyou";
import Management from "./pages/ManagementPage/Management";
import MemberSystem from "./pages/MemberSystemPage/MemberSystem";
import AlertDialog from "./components/ui/AlertDialog";
import OrderWindow from "./components/features/OrderWindow";

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <OrderWindow />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/notice" component={Notice} />
            <Route path="/reservation" component={Reservation} />
            <Route path="/thankyou" component={Thankyou} />
            <Route path="/management" component={Management} />
            <Route path="/memberSystem" component={MemberSystem} />
          </Switch>
        </main>
        <Footer />
        <AlertDialog />
      </div>
    </Router>
  );
}
export default App;
