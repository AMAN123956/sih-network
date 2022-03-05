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

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StartupProfile } from "./components/StartupProfile";

function App() {
  return (
    <Router>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login></Login>
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
