import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import ChatNavigator from './ChatNavigator';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import Accdetails from '../components/Accdetails';
import {TransitionPresets} from '@react-navigation/stack';
import {Dimensions, useWindowDimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const Drawer = createDrawerNavigator();

const DrawerNavigator = ({colorlist}) => {
  let PC = colorlist.Primarycolor;
  // let SC = colorlist.Secondarycolor;
  // let TC = colorlist.Ternarycolor;

  const winwidth = useWindowDimensions();

  return (
    <>
      <Drawer.Navigator
        drawerContent={() => {
          return <Accdetails />;
        }}
        screenOptions={{
          drawerType: winwidth.width >= 810 ? 'permanent' : 'back',
          headerShown: false,
          swipeEnabled: true,
          swipeEdgeWidth: windowWidth / 3.5,
          overlayColor: PC,
          drawerStyle: {
            backgroundColor: PC,
          },
        }}>
        <Drawer.Screen
          name="Home"
          options={{
            drawerItemStyle: {display: 'none'},
          }}
          component={TabNavigator}
        />
        <Drawer.Screen
          name="Chat"
          options={{
            drawerItemStyle: {display: 'none'},
            ...TransitionPresets.ModalSlideFromBottomIOS,
            cardStyle: {backgroundColor: PC},
          }}
          component={ChatNavigator}
        />
      </Drawer.Navigator>
    </>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

DrawerNavigator.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(DrawerNavigator);
