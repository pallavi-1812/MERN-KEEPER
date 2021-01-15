import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import validateLoginInput from '../validation/login.js';
import validateRegisterInput from '../validation/register.js';

export const registerUser = (req, res) => {
    //Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    //Checking Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        //checking if user exists
        if (user) {
            return res.status(400).json({ email: "Email already exists." });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            //Password hashing
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        console.log(err);
                    }
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                });
            });
        }
    });
}

export const loginUser = (req, res) => {
    //Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    //Checking Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const { email, password } = req.body;
    //finding user by email
    User.findOne({ email }).then(user => {
        //Checking if user exists
        if (!user) {
            return res.status(400).json({ email: "Email doesn't exist." });
        }
        //Checking Password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user._id,
                    name: user.name
                }
                //Sign Token
                jwt.sign(payload, process.env.JWT_SECRET, {
                    expiresIn: 31556926
                },
                    (err, token) => {
                        res.json({
                            token,
                            user: {
                                id: user._id,
                                displayName: user.name
                            }
                        });
                    }
                );
            } else {
                return res.status(400).json({ password: "Incorrect Password" });
            }
        });
    });
}

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.user);
        res.json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
}

export const isTokenValid = async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) {
            return res.json(false);
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.json(false);
        }
        const user = await User.findById(verified.id);
        if (!user) {
            return res.json(false);
        }
        return res.json(true);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getUser = async (req, res) => {
    const user = await User.findById(req.user);
    res.json({
        displayName: user.name,
        id: user._id
    });
}
