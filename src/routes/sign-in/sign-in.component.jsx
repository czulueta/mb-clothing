import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
    console.log(user)
  };

  return (
    <div>
      <h1> Sign In Please before proceeding </h1>
      <button onClick={logGoogleUser}> Sign In with Google Popup </button>
    </div>
  )
}

export default SignIn