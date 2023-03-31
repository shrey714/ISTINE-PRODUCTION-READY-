import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';

export const signUp = data => async dispatch => {
  const {email, password} = data;
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      Snackbar.show({
        text: 'account created',
        textColor: '#000',
        backgroundColor: 'rgba(255,255,255,1)',
      });
    })
    .catch(error => {
      console.error(error);
      Snackbar.show({
        text: 'signup failed',
        textColor: '#000',
        backgroundColor: 'rgba(255,255,255,1)',
      });
    });
};

export const signIn = data => async dispatch => {
  const {email, password} = data;
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('signin done');
      Snackbar.show({
        text: 'signin done',
        textColor: '#000',
        backgroundColor: 'rgba(255,255,255,1)',
      });
    })
    .catch(error => {
      console.error(error);
      Snackbar.show({
        text: 'signin failed',
        textColor: '#000',
        backgroundColor: 'rgba(255,255,255,1)',
      });
    });
};

export const signOut = () => async dispatch => {
  auth()
    .signOut()
    .then(() => {
      console.log('signout done');
      Snackbar.show({
        text: 'signout done',
        textColor: '#000',
        backgroundColor: 'rgba(255,255,255,1)',
      });
    })
    .catch(error => {
      console.error(error);
      Snackbar.show({
        text: 'signout failed',
        textColor: '#000',
        backgroundColor: 'rgba(255,255,255,1)',
      });
    });
};

export const forgotpass = data => async dispatch => {
  const {email} = data;
  auth()
    .sendPasswordResetEmail(email)
    .then(() => {
      Snackbar.show({
        text: 'Link sent',
        textColor: '#000',
        backgroundColor: 'rgba(255,255,255,1)',
      });
    })
    .catch(error => {
      console.error(error);
      Snackbar.show({
        text: 'Link sent failed',
        textColor: '#000',
        backgroundColor: 'rgba(255,255,255,1)',
      });
    });
};
