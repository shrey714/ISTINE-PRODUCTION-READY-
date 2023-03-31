import React from 'react';
// import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import QuizCards from './QuizCards';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import Quiz from '../Quizscreen/Quiz';

const Stack = createSharedElementStackNavigator();

const Second = ({colorlist}) => {
  let PC = colorlist.Primarycolor;
  // let SC = colorlist.Secondarycolor;
  // let TC = colorlist.Ternarycolor;
  return (
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
          fontSize: 28,
        },
      }}>
      <Stack.Screen
        name="Home"
        component={QuizCards}
        options={{title: 'Quiz', cardStyle: {backgroundColor: PC}}}
      />
      <Stack.Screen
        name="Quiz"
        options={{headerShown: false, cardStyle: {backgroundColor: PC}}}
        component={Quiz}
      />
    </Stack.Navigator>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Second.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(Second);
