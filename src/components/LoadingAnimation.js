import React, {useRef, useEffect} from 'react';
import {Animated, Easing, Dimensions, StyleSheet, View} from 'react-native';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
const LoadingAnimation = props => {
  let PC = props.colorlist.Primarycolor;
  let SC = props.colorlist.Secondarycolor;
  // let TC = props.colorlist.Ternarycolor;
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  const anima = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(anima, {
        toValue: 2,
        duration: 2000,
        easing: Easing.elastic(2.5),
        useNativeDriver: true,
      }),
    ).start();
  }, [anima]);
  const spin = anima.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['0deg', '180deg', '360deg'],
  });
  const sizespin = anima.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 1.5, 1],
  });

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: PC,
            width: windowWidth,
            height: windowHeight,
          },
        ]}>
        <Animated.View // Special animatable View
          style={[
            styles.box,
            {
              transform: [{rotate: spin}, {scale: sizespin}],
              borderColor:
                PC === '#ffffff' || PC === '#F9F9F9'
                  ? SC === '#ffffff'
                    ? '#000'
                    : SC
                  : SC,
            },
          ]}>
          <View
            style={[
              styles.innerbox,
              {
                borderColor:
                  PC === '#ffffff' || PC === '#F9F9F9'
                    ? SC === '#ffffff'
                      ? '#000'
                      : SC
                    : SC,
              },
            ]}
          />
        </Animated.View>
      </View>
    </>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

LoadingAnimation.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(LoadingAnimation);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    borderWidth: 3,
    borderRadius: 150,
    borderTopColor: 'rgba(0,0,0,0)',
    borderBottomColor: 'rgba(0,0,0,0)',
  },
  innerbox: {
    width: 32,
    height: 32,
    borderWidth: 3.4,
    borderRadius: 150,
  },
});
