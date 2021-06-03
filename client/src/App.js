import TopBar from "./components/topbar/TopBar";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/resister/Register";
import Setting from "./pages/settings/Setting";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import React, { useContext } from "react";
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import { Context } from "./context/Context";



function App() {

  const {user} = useContext(Context);
  return (
    <Router>
      <TopBar/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">
            {user ? <Home /> : <Register/>}
        </Route>
        <Route path="/login">
            {user ? <Home /> : <Login/>}
        </Route>
        <Route path="/settings">
            {user ? <Setting /> : <Login/>}
        </Route>
        <Route path="/post/:postId">
             <Single /> 
        </Route>
        <Route path="/write">
            {user ? <Write /> : <Login/>}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
