import React from 'react';
import Third from '../screens/third/Third';
import Infopage from '../screens/infopage/Infopage';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {MenuProvider} from 'react-native-popup-menu';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
const Stack = createStackNavigator();

const Infoandsearch = ({navigation, colorlist}) => {
  let PC = colorlist.Primarycolor;
  // let SC = colorlist.Secondarycolor;
  // let TC = colorlist.Ternarycolor;

  return (
    <MenuProvider>
      <Stack.Navigator
        screenOptions={{
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
        initialRouteName="Third">
        <Stack.Screen
          name="Third"
          options={{headerShown: false, cardStyle: {backgroundColor: PC}}}
          component={Third}
        />
        <Stack.Screen
          name="Infopage"
          options={{
            ...TransitionPresets.ModalSlideFromBottomIOS,
            cardStyle: {backgroundColor: PC},
          }}
          component={Infopage}
        />
      </Stack.Navigator>
    </MenuProvider>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Infoandsearch.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(Infoandsearch);
