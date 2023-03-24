import { toast } from "react-hot-toast";

// validate loginpage username

export async function usernameValidate(values){
    const errors = usernameVerify({},values);

    return errors
}

    

//validate password
export async function passwordValidate(values){
    const errors = passwordVerify({},values)
    return errors
}


//validate password
function passwordVerify(error={},values){

    if(!values.password){
        error.password = toast.error('Password Required...!')
    }else if(values.password.includes(" ")){
        error.password = toast.error('Wrong Password...!')
    }else if(values.password.length < 4){
        error.password = toast.error('Password must contain more than 4 characters')
    }
    return error
}


// Validate username
function usernameVerify(error={}, values){
    if(!values.username){
        error.username = toast.error('Username Required...!')
    }else if(values.username.includes(" ")){
        error.username = toast.error('Invalid Username...!')
    }
    return error
}

//validate reset password

export async function resetPasswordValidation(values){
    const errors = passwordVerify({},values)

    if(values.password!=values.confirmpassword){
        errors.exist = toast.error("Password didn't match...!")
    }
}

//validate register form

export async function registerValidation(values){
    const errors= usernameVerify({},values);
    passwordVerify(errors,values);
    emailVerify(errors,values)
    return errors

}

//validate email

function emailVerify(error={},values){
    if (!values.email){
        error.email=toast.error('Email Required...!')
    }else if(values.email.includes(" ")){
        error.email = toast.error('Wrong email format')
    }else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(values.email)){
        error.email = toast.error("Invalid email address...!")
    }
    return error
}

export async function profileValidation(values){
    const error = emailVerify({},values)
    return error
}