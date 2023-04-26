import { useState, useContext } from "react";

import Button from "../button/button.component";
import { FormInput } from "../form-input/form-input.component";

import { UserContext } from "../../contexts/user.contex";

import {
  createUserDocumentFromAuth,
  auth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import './sign-in-form.styles.scss';

interface IDefaultFormFields {
  email: string,
  password: string,
};

const defaultFormFields: IDefaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
  const [ formFields, setFormFields ] = useState<IDefaultFormFields>(defaultFormFields);
  const [ isRequiring, setIsRequiring ] = useState(false);
  const { email, password } = formFields;

  const { setCurrentUser  } = useContext(UserContext);

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    await signInAuthUserWithEmailAndPassword(email, password)
      .then(response => {
        setIsRequiring(true);
      })
      .catch(error => {
        switch (error.code) {
          case 'auth/wring password':
            alert('Wrong password!');
            break;
          case 'auth/user-not-found' :
            alert('No user associated with this email');
            break;
          default:
            console.log(error);
        }
      })
      .finally(() => {
        setIsRequiring(false);
      })
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  }

  const handleChange = (event: {
    target: { name: any; value: any; };
  }) => {
    const { name, value } = event.target;

    setFormFields({...formFields, [name]: value});
  };

  const mustBeDisabled = (): boolean => {
    if(isRequiring || email == '' || password == '')
      return true;

    return false;
  }

  return (
    <div className="sign-in-container">
      <h2>Already have an account</h2>
      <span>Sign in with email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={'Email'}
          type='email'
          name={'email'}
          onChange={handleChange}
          value={email}
          required
        />

        <FormInput
          label={'Password'}
          type={'password'}
          name={'password'}
          onChange={handleChange}
          value={password}
          minLength={6}
          required
        />
        <div className="buttons-container">
          <Button type={'submit'} disabled={mustBeDisabled()}>Sign In</Button>
          <Button type={'button'} onClick={signInWithGoogle} buttonType={'google'}>
            Sign In with Google
          </Button>
        </div>
      </form>
    </div>
  )
};

export default SignInForm;