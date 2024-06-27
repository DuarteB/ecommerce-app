import { useContext, useState } from "react";

import Button from "../button/button.component";
import { FormInput } from "../form-input/form-input.component";


import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";


import { SignUpContainer } from './sign-up-form.styles';
import { UserContext } from "../../contexts/user.contex";

interface IDefaultFormFields {
  displayName?: string,
  email: string,
  password: string,
  confirmPassword?: string
};

const defaultFormFields: IDefaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [ formFields, setFormFields ] = useState<IDefaultFormFields>(defaultFormFields);
  const [ isRequiring, setIsRequiring ] = useState(false);
  const [ isPasswordsMatching, setIsPasswordMatching ] = useState(true);
  const { displayName, email, password, confirmPassword } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    setIsRequiring(true);

    if(password != confirmPassword){
      setIsPasswordMatching(false);
      return;
    }

    await createAuthUserWithEmailAndPassword(email, password)
      .then(response => {
        const { user } = response;
        createUserDocumentFromAuth(user, { displayName });
        resetFormFields();
      })
      .catch(error => {
        if(error.code === 'auth/email-already-in-use') {
          alert('Cannot create user, email already in use');
        } else {
          console.log('User creation encountered an error', error);
        }
      })
      .finally(() => {
        setIsRequiring(false);
      })
  }


  const handleChange = (event: {
    target: { name: any; value: any; };
  }) => {
    const { name, value } = event.target;

    setFormFields({...formFields, [name]: value});
  };

  const mustBeDisabled = (): boolean => {
    if(isRequiring || displayName == '' || email == '' || password == '' || confirmPassword == '')
      return true;

    return false;
  }

  return (
    <SignUpContainer>
      <h2>Don't have an account</h2>
      <span>Sign Up With Email and Password</span>
      <form onSubmit={handleSubmit}>
        {isPasswordsMatching ? <></> : <span>passwords do not match</span>}
        <FormInput
          label={'Display Name'}
          type={'text'}
          name={'displayName'}
          onChange={handleChange}
          value={displayName}
          required
        />

        <FormInput
          label={'Email'}
          type={'email'}
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

        <FormInput
          label={'Confirm Password'}
          type={'password'}
          name={'confirmPassword'}
          onChange={handleChange}
          value={confirmPassword}
          minLength={6}
          required
        />
        <Button type={'submit'} disabled={mustBeDisabled()}>Sign Up</Button>
      </form>
    </SignUpContainer>
  )
};

export default SignUpForm;