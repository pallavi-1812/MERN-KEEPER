import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  let history = useHistory();

  const { setUserData } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await axios.post("http://localhost:5000/users/login", loginUser);
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
      console.log(err.response);
      if (err.response.data) {
        const error = err.response.data;
        setErrors({
          email: error.email,
          password: error.password
        });
      }
    }
  }

  return (
    <Container>
      <Form className="form" onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <small className="red-text"> {errors.email} </small>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Enter your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <small className="red-text"> {errors.password} </small>
        </FormGroup>
        <Button color="warning" type="submit">Submit</Button>
        <p className="mt-2">
          New here? <Link to="/register">Register</Link>
        </p>
      </Form>
    </Container>
  );
};

export default Login;
