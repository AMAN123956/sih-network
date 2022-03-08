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
// import Handsfree from "handsfree";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BlindLogin from "./components/BlindLogin";
import DeafLogin from "./components/DeafLogin";
import { InvestorProfile } from "./components/InvestorProfile";
import { StartupProfile } from "./components/StartupProfile";
import NavbarComponent from "./components/sidebar";
import { Redirect } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  // const handsfree = new Handsfree({weboji: true})
  // handsfree.enablePlugins('browser')
  // handsfree.start()
  useEffect(() => {
     setUser(localStorage.getItem("startupUserInfo"))
  }, []);
  console.log(localStorage.getItem("startupUserInfo"));
  return (
    <Router>
      {
        <>
          {user===null ? (
            <Switch>
              <Route exact path="/register">
                <Register />
              </Route>
              <Route exact path="/register-blind">
                <BlindRegister />
              </Route>
              <Route exact path="/register-deaf">
                <DeafRegister />
              </Route>
              <Route exact path="/login">
                <Login></Login>
              </Route>
              <Route exact path="/login-blind">
                <BlindLogin />
              </Route>
              <Route exact path="/login-deaf">
                <DeafLogin />
              </Route>
              {/* <Redirect to="/register" /> */}
            </Switch>
          ) : (
            <>
              <NavbarComponent />
              <div className="App">
                <Router>
                  <Switch>
                    <Route path="/" exact>
                      <Home />
                    </Route>

                    <Route path="/myprofile">
                      <Profile />
                    </Route>
                    <Route path="/investor/profile">
                      <InvestorProfile />
                    </Route>
                    <Route path="/startup/profile/:id">
                      <StartupProfile />
                    </Route>
                  </Switch>
                  <Redirect to="/" />
                </Router>
              </div>
            </>
          )}
        </>
      }
    </Router>
  );
}

export default App;
