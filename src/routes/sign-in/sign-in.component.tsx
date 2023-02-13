import {
  signInWithGooglePopup,
  createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user);
  }

  return (
    <div>
      <h2>Sign In component</h2>
      <button onClick={logGoogleUser}>
        Sign In with Google
      </button>
    </div>
  )
}

export default SignIn;