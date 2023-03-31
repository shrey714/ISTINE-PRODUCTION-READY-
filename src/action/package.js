import database from '@react-native-firebase/database';
import {SET_PACKAGE, ERROR_PACKAGE} from './action.types';
import {firebase} from '@react-native-firebase/auth';

const getpackages = () => dispatch => {
  try {
    database()
      .ref(`/packages/${firebase.auth()._user.uid}`)
      .on('value', snapshot => {
        if (snapshot.val()) {
          dispatch({
            type: SET_PACKAGE,
            payload: Object.values(snapshot.val()),
          });
        } else {
          dispatch({
            type: SET_PACKAGE,
            payload: [],
          });
        }
      });
  } catch (error) {
    dispatch({
      type: ERROR_PACKAGE,
    });
  }
};

export default getpackages;
