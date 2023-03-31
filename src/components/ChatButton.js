/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

// let TC = colorlist.Ternarycolor;

const ChatButton = ({colorlist}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  const Ring = ({delay, sca}) => {
    const ring = useSharedValue(0);

    const ringStyle = useAnimatedStyle(() => {
      return {
        opacity: 1 - ring.value,
        transform: [
          {
            scale: interpolate(ring.value, [0, 1], [0, sca]),
          },
        ],
      };
    });
    useEffect(() => {
      ring.value = withDelay(
        delay,
        withRepeat(
          withTiming(1, {
            duration: 1000,
          }),
          -1,
          false,
        ),
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ring, delay]);
    return (
      <Animated.View
        style={[
          styles.ring,
          ringStyle,
          {
            borderColor:
              SC === '#ffffff'
                ? PC === '#ffffff' || PC === '#F9F9F9'
                  ? '#000'
                  : SC
                : SC,
          },
        ]}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <Ring delay={0} sca={1.2} />
      <Ring delay={0} sca={0.8} />
    </View>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});
ChatButton.prototypes = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(ChatButton);

const styles = StyleSheet.create({
  ring: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 150,
    borderWidth: 10,
  },
});
