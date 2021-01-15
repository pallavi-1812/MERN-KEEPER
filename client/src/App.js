import './App.css';
import Header from "./components/layout/Header";
import About from "./components/layout/About";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserContext from "./context/UserContext";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post("http://localhost:5000/users/tokenIsValid/",
        null,
        { headers: { "x-auth-token": token } });
      if (tokenRes.data) {
        const userRes = await axios.get("http://localhost:5000/users/", { headers: { "x-auth-token": token } });
        setUserData({
          token,
          user: userRes.data
        });
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <div className="App">
        <Header />
        <Router>
          <Switch>
            <Route path="/" exact component={About} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
          </Switch>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
