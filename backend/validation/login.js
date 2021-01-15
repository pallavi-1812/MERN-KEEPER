import Validator from 'validator';
import isEmpty from 'is-empty';

const validateLoginInput = (data) => {
    let errors = {};

    //converting empty fields to empty strings to use validator func
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

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
    return {
        errors,
        isValid: isEmpty(errors)
    };
}

export default validateLoginInput;