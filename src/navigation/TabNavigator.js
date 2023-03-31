import React from 'react';
import First from '../screens/first/First';
import Second from '../screens/second/Second';
import Forth from '../screens/forth/Forth';
import Fifth from '../screens/fifth/Fifth';
import Infoandsearch from '../navigation/Infoandsearch';
import TabBarIcon from '../components/TabBarIcon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
const Tab = createBottomTabNavigator();
const TabNavigator = ({colorlist, navigation}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  // let TC = colorlist.Ternarycolor;

  return (
    <>
      <Tab.Navigator
        backBehavior="history"
        sceneContainerStyle={{backgroundColor: PC}}
        initialRouteName="First"
        screenOptions={({route}) => {
          let tabname = route.name;
          return {
            tabBarIcon: ({focused, color, size}) =>
              TabBarIcon(focused, color, size, tabname),
            tabBarActiveTintColor: SC,
            tabBarInactiveTintColor: 'gray',
            headerStyle: {
              backgroundColor: PC,
              borderBottomWidth: 0.5,
              borderBottomColor:
                PC === '#000' || PC === '#1F1B24' ? '#ADADAD' : '#000',
            },
            headerTintColor:
              PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
            headerTitleStyle: {
              fontFamily: 'Quicksand-Bold',
              fontSize: 28,
            },
            tabBarShowLabel: false,
            tabBarStyle: [
              {
                backgroundColor: PC,
                height: 58,
                marginBottom: 0,
                borderTopWidth: 0.5,
                borderTopColor:
                  PC === '#000' || PC === '#1F1B24' ? '#ADADAD' : '#000',
              },
              null,
            ],
          };
        }}>
        <Tab.Screen name="First" component={First} />
        <Tab.Screen
          name="Second"
          component={Second}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Infoandsearch"
          component={Infoandsearch}
          options={{headerShown: false}}
        />
        <Tab.Screen name="Forth" component={Forth} />
        <Tab.Screen
          name="Fifth"
          options={{title: 'Settings'}}
          component={Fifth}
        />
      </Tab.Navigator>
    </>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

TabNavigator.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(TabNavigator);
