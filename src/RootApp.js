import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
// import {getStatusBarHeight} from 'react-native-status-bar-height';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import DrawerNavigator from './navigation/DrawerNavigator';
import AuthNavigation from './navigation/AuthNavigation';
import Neterror from './components/Neterror';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import LoadingAnimation from './components/LoadingAnimation';
const Stack = createStackNavigator();
import {IS_AUTHENTICATED} from './action/action.types';
import {useDispatch, connect} from 'react-redux';
import propTypes from 'prop-types';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {useNetInfo} from '@react-native-community/netinfo';
// import {useNavigation} from '@react-navigation/native';
import LRSlide from './screens/LRSlide/LRSlide';
import shutter from './action/shutter';
const RootApp = ({authState, shutter, shutterstatus, colorlist}) => {
  const dispatch = useDispatch();
  const netinfo = useNetInfo();
  // const chatnavigation = useNavigation();
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;
  const onAuthStateChanged = user => {
    if (user) {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: true,
      });
    } else {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: false,
      });
    }
  };
  useEffect(() => {
    setTimeout(() => {
      if (shutterstatus === true) {
        // chatnavigation.navigate('Chat');
        setTimeout(() => {
          shutter(false);
        }, 1200);
      }
    }, 800);
  }, [shutter, shutterstatus]);
  useEffect(() => {
    changeNavigationBarColor(
      PC === '#000' || PC === '#1F1B24' || PC === '#949398' ? 'black' : 'white',
      true,
      true,
    );
  }, [PC]);

  useEffect(() => {
    StatusBar.setBarStyle(
      PC === '#000' || PC === '#1F1B24' ? 'light-content' : 'dark-content',
    );

    const susbcriber = auth().onAuthStateChanged(onAuthStateChanged);
    return susbcriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [connection, setconnection] = useState(false);

  if (authState.loading) {
    return <LoadingAnimation />;
  }

  return (
    <>
      <NavigationContainer
        onReady={async () => {
          StatusBar.setBarStyle(
            PC === '#000' || PC === '#1F1B24'
              ? 'light-content'
              : 'dark-content',
          );
          SplashScreen.hide();
          setconnection(true);
        }}>
        <StatusBar
          translucent={true}
          backgroundColor={PC}
          barStyle={
            PC === '#000' || PC === '#1F1B24' ? 'light-content' : 'dark-content'
          }
          // animated={true}
        />
        {connection && !netinfo.isConnected ? <Neterror /> : <></>}
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {/* !authState.isauthenticated */}
          {!authState.isauthenticated ? (
            <Stack.Screen
              name="authpage"
              component={AuthNavigation}
              options={{
                ...TransitionPresets.ScaleFromCenterAndroid,
              }}
            />
          ) : (
            // User is signed in
            <Stack.Screen name="mainpage" component={DrawerNavigator} />
          )}
        </Stack.Navigator>
        {shutterstatus ? <LRSlide /> : <></>}
      </NavigationContainer>
    </>
  );
};
const mapDispatchToProps = {
  shutter: data => shutter(data),
};
const mapStateToProps = state => ({
  authState: state.auth,
  shutterstatus: state.shutterreducer,
  colorlist: state.colorreducer.colours,
});

RootApp.prototype = {
  colorlist: propTypes.object.isRequired,
  shutter: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RootApp);
