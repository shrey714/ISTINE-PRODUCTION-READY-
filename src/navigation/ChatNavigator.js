import React from 'react';
import Chatpackage from '../screens/chatscreens/Chatpackage';
import Chatscreen from '../screens/chatscreens/Chatscreen';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {Easing} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

const ChatNavigator = ({navigation, colorlist}) => {
  let PC = colorlist.Primarycolor;
  // let SC = colorlist.Secondarycolor;
  // let TC = colorlist.Ternarycolor;
  // ====================
  const config = {
    animation: 'timing',
    config: {
      duration: 100,
      easing: Easing.cubic,
    },
  };
  // ==================
  return (
    <Stack.Navigator
      screenOptions={{
        cardOverlay: () => (
          <View
            style={{
              flex: 1,
              backgroundColor: PC,
            }}
          />
        ),
        cardStyle: {backgroundColor: PC},
        // ...TransitionPresets.SlideFromRightIOS,
        // presentation: 'transparentModal',
        headerStyle: {
          backgroundColor: PC,
          borderBottomWidth: 0.5,
          borderBottomColor:
            PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
        },
        headerTintColor: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
        headerTitleStyle: {
          fontFamily: 'Quicksand-Bold',
          fontSize: 25,
        },
      }}
      initialRouteName="Chatpackage">
      <Stack.Screen
        name="Chatpackage"
        options={{headerTitle: 'Istine'}}
        component={Chatpackage}
      />
      <Stack.Screen
        name="Chatscreen"
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
        component={Chatscreen}
      />
    </Stack.Navigator>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

ChatNavigator.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(ChatNavigator);
