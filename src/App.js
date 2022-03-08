/* Global Css */
import "./App.css";
/* Bootstrap */
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
/* Register */
import Register from "./components/Register/index";
/* Login */
import Login from "./components/Login/index";
/* Home Page */
import Home from "./components/Home/index";
/* Deaf Register */
import DeafRegister from "./components/DeafRegister";
/* Blind Register */
import BlindRegister from "./components/BlindRegister";
/* Profile */
import Profile from "./components/Profile/index";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BlindLogin from "./components/BlindLogin";
import DeafLogin from "./components/DeafLogin";
import { InvestorProfile } from "./components/InvestorProfile";
import { StartupProfile } from "./components/StartupProfile";
import NavbarComponent from "./components/sidebar";

function App() {
  return (
    <Router>
      <NavbarComponent />
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/register-blind">
              <BlindRegister />
            </Route>
            <Route path="/register-deaf">
              <DeafRegister />
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/login-blind">
              <BlindLogin />
            </Route>
            <Route path="/login-deaf">
              <DeafLogin />
            </Route>
            <Route path="/investor/profile">
              <InvestorProfile />
            </Route>
            <Route path="/startup/profile">
              <StartupProfile />
            </Route>
          </Switch>
        </Router>
      </div>
    </Router>
  );
}

export default App;
