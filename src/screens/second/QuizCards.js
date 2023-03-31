/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {ScrollView} from 'react-native';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import ANGULAR from '../../assets/images/webpimg/ANGULAR.webp';
import NODEJS from '../../assets/images/webpimg/NODEJS.webp';
import REACT from '../../assets/images/webpimg/REACT.webp';
import {View, Dimensions, Pressable, Image} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
const {width} = Dimensions.get('screen');
import QuizData from '../Quizscreen/QuizData';
// const imgarray = [ANGULAR, NODEJS, REACT];
const imgarray = [
  {img: ANGULAR, data: QuizData.ANGULAR},
  {img: NODEJS, data: QuizData.NODEJS},
  {img: REACT, data: QuizData.REACT},
];
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.8;
const Second = ({navigation, colorlist}) => {
  // let PC = colorlist.Primarycolor;
  // let SC = colorlist.Secondarycolor;
  // let TC = colorlist.Ternarycolor;
  return (
    <Animatable.View
      animation="fadeInUp"
      duration={400}
      useNativeDriver={true}
      style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            paddingBottom: 10,
          }}>
          {imgarray.map((item, index) => (
            <Pressable
              key={index}
              style={{
                marginTop: 10,
                elevation: 4,
                borderRadius: 5,
              }}
              onPress={() =>
                navigation.navigate('Quiz', {
                  item,
                  index,
                })
              }>
              <SharedElement id={`item.${index}.image_url`}>
                <Image
                  style={{
                    borderRadius: 5,
                    width: ITEM_WIDTH,
                    maxWidth: 400,
                    height: ITEM_HEIGHT,
                  }}
                  source={item.img}
                  resizeMode="cover"
                />
              </SharedElement>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </Animatable.View>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Second.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(Second);
