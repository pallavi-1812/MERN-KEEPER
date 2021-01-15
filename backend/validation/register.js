import Validator from 'validator';
import isEmpty from 'is-empty';

const validateRegisterInput = (data) => {
    let errors = {};

    //converting empty fields to empty strings to use validator func
    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";

    //name validation
    if (Validator.isEmpty(data.name)) {
        errors.name = "Please fill the name field.";
    }

    //email validation
    if (Validator.isEmpty(data.email)) {
        errors.email = "Please fill the email field.";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid.";
    }

    //password validation
    if (Validator.isEmpty(data.password)) {
        errors.password = "Please fill the password field.";
    }
    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Please fill the confirm password field.";
    }
    if (!Validator.isLength(data.password, { min: 6 })) {
        errors.password = "Password must be of atleast 6 characters."
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must match.";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
}

export default validateRegisterInput;