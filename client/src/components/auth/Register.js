import axios from "axios";
import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";
import UserContext from "../../context/UserContext";

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    });

    let history = useHistory();

    const { setUserData } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newUser = { name, email, password, password2 };
            await axios.post("http://localhost:5000/users/register", newUser);
            const loginRes = await axios.post("http://localhost:5000/users/login", { email, password });
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/");
        } catch (err) {
            if (err.response.data) {
                const error = err.response.data;
                setErrors({
                    name: error.name,
                    email: error.email,
                    password: error.password,
                    password2: error.password2
                });
            }
        }
    }

    return (
        <Container>
            <Form className="form" onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                        type="text"
                        name="name"
                        placeholder="Enter your Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <small className="red-text"> {errors.name} </small>
                </FormGroup>
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
                <FormGroup>
                    <Label for="password2">Confirm Password</Label>
                    <Input
                        type="password"
                        name="password2"
                        placeholder="Re-enter your Password"
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                    <small className="red-text"> {errors.password2} </small>
                </FormGroup>
                <Button color="warning" type="submit">Register</Button>
                <p className="mt-2">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </Form>
        </Container>
    );
};

export default Register;