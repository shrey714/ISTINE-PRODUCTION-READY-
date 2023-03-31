/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Image, Dimensions, Modal, View} from 'react-native';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import LOGOR from '../../assets/images/LOGOR.svg';
import LOGOL from '../../assets/images/LOGOL.svg';
import * as Animatable from 'react-native-animatable';
const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
import {useNavigation} from '@react-navigation/native';

const LRSlide = ({colorlist, navigation}) => {
  const chatnavigation = useNavigation();
  let PC = colorlist.Primarycolor;
  //   let SC = colorlist.Secondarycolor;
  //   let TC = colorlist.Ternarycolor;
  setTimeout(() => {
    chatnavigation.navigate('Chat');
  }, 700);

  const run = () => {
    setAnimationTypeL('fadeOutLeftBig');
    setAnimationTypeR('fadeOutRightBig');
  };
  setTimeout(() => {
    run();
  }, 1800);
  const [visi, setvisi] = useState(true);
  const [AnimationTypeL, setAnimationTypeL] = useState('fadeInLeftBig');
  const [AnimationTypeR, setAnimationTypeR] = useState('fadeInRightBig');
  return (
    <>
      <Modal
        statusBarTranslucent={true}
        visible={visi}
        animationType="fade"
        transparent={true}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          <Animatable.View
            animation={AnimationTypeL}
            duration={400}
            useNativeDriver={true}
            style={[styles.containerL, {backgroundColor: PC}]}>
            <View
              style={{
                backgroundColor:
                  PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
                width: 50,
                height: 100,
                borderTopLeftRadius: 150,
                borderBottomLeftRadius: 150,
                overflow: 'hidden',
              }}>
              <LOGOL width={50} height={100} />
            </View>
          </Animatable.View>
          <Animatable.View
            animation={AnimationTypeR}
            duration={400}
            useNativeDriver={true}
            style={[styles.containerR, {backgroundColor: PC}]}>
            <View
              style={{
                backgroundColor:
                  PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
                width: 50,
                height: 100,
                borderTopRightRadius: 150,
                borderBottomRightRadius: 150,
                overflow: 'hidden',
              }}>
              <LOGOR width={50} height={100} />
            </View>
          </Animatable.View>
        </View>
      </Modal>
    </>
  );
};

LRSlide.propTypes = {
  colorlist: propTypes.object.isRequired,
};
const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

export default connect(mapStateToProps)(LRSlide);

const styles = StyleSheet.create({
  containerL: {
    width: windowWidth / 2,
    height: windowHeight,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  containerR: {
    width: windowWidth / 2,
    height: windowHeight,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
