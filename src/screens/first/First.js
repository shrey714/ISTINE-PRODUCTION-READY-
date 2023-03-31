/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  TouchableOpacity,
  View,
  StyleSheet,
  StatusBar,
  Linking,
  Text,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
} from 'react-native-reanimated';
import GreetingText from './GreetingText';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import Notify from './Notify';
import PackagesApi from './PackagesApi';
import Icon from 'react-native-vector-icons/Entypo';
import shutter from '../../action/shutter';
import ChatButton from '../../components/ChatButton';
import {useIsFocused} from '@react-navigation/native';
const First = ({navigation, shutter, colorlist, onPress, initialState}) => {
  const greettext = GreetingText();
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  // let TC = colorlist.Ternarycolor;

  function FocusAwareStatusBar(props) {
    const isFocused = useIsFocused();

    return isFocused ? <StatusBar {...props} /> : null;
  }
  useEffect(() => {
    navigation.setOptions({
      title: greettext,
      headerRight: () => (
        <>
          <View style={styles.rings}>
            <View style={{position: 'absolute'}}>
              <ChatButton />
            </View>
            <TouchableOpacity
              style={styles.buttonarea}
              onPress={() => {
                shutter(true);
              }}>
              <Icon name="chat" size={23} color={SC} />
            </TouchableOpacity>
          </View>
        </>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SC]);
  //==========parallax scroll=============
  let a = [];
  for (var i = 10; i < 30; i++) {
    a.push({
      item: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."',
    });
  }
  const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
  const scrollPosition = useSharedValue(0);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollPosition.value = event.contentOffset.y;
    },
  });
  //============parallax function===========
  const {height, width} = useWindowDimensions();
  // const height = 360;
  const Shrey = ({index, data}) => {
    const textTranslate = useAnimatedStyle(() => {
      const translateY = interpolate(
        scrollPosition.value,
        [
          ((index - 1) * height) / 2,
          (index * height) / 2,
          ((index + 1) * height) / 2,
        ],
        [0, 50, 100],
      );
      return {
        transform: [{translateY}],
      };
    }, []);
    return (
      <View key={index} style={styles.scrollContent}>
        <Animated.Image
          style={[
            {
              position: 'absolute',
              height: height,
              width: width,
              resizeMode: 'center',
            },
            textTranslate,
          ]}
          source={data.image}
        />
        <View
          style={{
            borderTopLeftRadius: 13,
            borderTopRightRadius: 13,
            bottom: 0,
            position: 'absolute',
            width: '100%',
            padding: 15,
            backgroundColor:
              PC === '#000'
                ? 'rgba(0,0,0,0.7)'
                : PC === '#1F1B24'
                ? 'rgba(31, 27, 36, 0.7)'
                : PC === '#949398'
                ? 'rgba(148, 147, 152, 0.7)'
                : PC === '#F9F9F9'
                ? 'rgba(249, 249, 249, 0.7)'
                : 'rgba(255, 255, 255, 0.7)',
          }}>
          <View style={{width: '100%'}}>
            <Text
              numberOfLines={5}
              style={{
                lineHeight: 20,
                fontSize: 15,
                fontFamily: 'Quicksand-Bold',
                color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
              }}>
              {data.data}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(data.url);
            }}
            style={{
              alignSelf: 'flex-end',
              width: 40,
              height: 40,
              backgroundColor: '#000',
              borderRadius: 150,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 5,
            }}>
            <Icon name="link" size={23} color={SC} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  //=======================
  return (
    <>
      <FocusAwareStatusBar backgroundColor="transparent" />
      <AnimatedFlatList
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
        data={PackagesApi}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 0,
              borderTopWidth: 0.2,
              width: '100%',
              backgroundColor: '#ADADAD',
            }}
          />
        )}
        scrollEventThrottle={16}
        renderItem={({index}) => {
          return (
            <Shrey
              scrollPosition={scrollPosition}
              index={index}
              data={PackagesApi[index]}
            />
          );
        }}
      />
      <Notify />
    </>
  );
};

const mapDispatchToProps = {
  shutter: data => shutter(data),
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

First.prototype = {
  colorlist: propTypes.object.isRequired,
  shutter: propTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(First);

const styles = StyleSheet.create({
  rings: {
    elevation: 2,
    zIndex: 1,
    marginRight: 8,
    backgroundColor: '#000',
    width: 40,
    height: 40,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    height: 320,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
