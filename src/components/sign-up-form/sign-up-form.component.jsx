import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";


const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: ""
}

const SignUpForm = () => {
  const [ formFields, setFormFields ] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    if( password !== confirmPassword ) {
      alert("password and the confirmed password does not match try again");
      return;
    }
    try{
      const { user } = await createAuthUserWithEmailAndPassword(
        email, 
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch(error){
      if(error.code === "auth/email-already-in-use"){
        alert("Cannot create user, that email is already being used!!!");
      }else{
        console.log("user creation encountered an error", error);
      }      
    }
    // check if we authenticated user and password
    // create user document from what createAuthUserWithEmailAndPassword returns
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({...formFields, [name]: value});
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your Email and Password</span>
      <form onSubmit={handleSubmit}>
        
        <FormInput 
          label="Display Name"
          type="text" 
          required 
          onChange={handleChange} 
          name="displayName"
          value={displayName} 
        />

        <FormInput
          label="Email" 
          type="email" 
          required 
          onChange={handleChange} 
          name="email"
          value={email}
        />

        <FormInput 
          label="Password"
          type="password" 
          required 
          onChange={handleChange} 
          name="password"
          value={password}          
        />

        <FormInput 
          label="Confirm Password"
          type="password" 
          required 
          onChange={handleChange} 
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Be Blessed!!!</Button>
      </form>
    </div>
  )
}
export default SignUpForm