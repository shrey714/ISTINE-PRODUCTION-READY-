import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
const SettingsStack = createStackNavigator();
import Settings from './Settings';
import Sett1 from './notifications/Sett1';
import Sett2 from './theme/Sett2';
import Sett3 from './bug_report/Sett3';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
const Fifth = ({colorlist}) => {
  let PC = colorlist.Primarycolor;
  // let SC = colorlist.Secondarycolor;
  // let TC = colorlist.Ternarycolor;
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        ...TransitionPresets.ModalSlideFromBottomIOS,
        presentation: 'transparentModal',
        headerLeft: () => null,
        cardStyle: {backgroundColor: PC},
        headerStyle: {
          backgroundColor: PC,
          elevation: 0,
        },
        headerTintColor: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
        headerTitleStyle: {
          fontFamily: 'Quicksand-Bold',
          fontSize: 20,
        },
      }}>
      <SettingsStack.Screen
        name="Settings"
        options={{headerShown: false}}
        component={Settings}
      />
      <SettingsStack.Screen name="Notifications" component={Sett1} />
      <SettingsStack.Screen name="Theme" component={Sett2} />
      <SettingsStack.Screen name="Bug Report" component={Sett3} />
    </SettingsStack.Navigator>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Fifth.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(Fifth);
