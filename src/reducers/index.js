import {combineReducers} from 'redux';
import auth from './auth';
import addpackage from './addpackage';
import colorreducer from './colorreducer';
import shutterreducer from './shutterreducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer} from 'redux-persist';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: 'colours',
};

export default combineReducers({
  auth,
  colorreducer: persistReducer(persistConfig, colorreducer),
  addpackage,
  shutterreducer,
});
