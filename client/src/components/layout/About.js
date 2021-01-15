import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Container, Button } from "reactstrap";
import UserContext from '../../context/UserContext';
import Keeper from '../keeper/keeper';

const About = () => {
  const { userData, setUserData } = useContext(UserContext);
  let history = useHistory();

  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined
    });
    localStorage.setItem("auth-token", "");
  }

  return (
    <Container>
      {userData.user ? (
        <div className="keeper">
          <Button color="warning" onClick={logout}>Logout</Button>
          <Keeper />
        </div>) : (
          <div className="row about">
            <div className="col-sm-12 col-md-6 my-auto mx-auto aboutImg"></div>
            <div className="col-sm-12 col-md-6 my-auto mx-auto aboutContent">
              <p className="aboutLine">
                Keep track of your ideas by noting them here!
          </p>
              <p>
                <Button color="warning" className="btn-login m-2" onClick={login}>
                  Login
            </Button>
              </p>
            </div>
          </div>
        )}
    </Container>
  );
};

export default About;
