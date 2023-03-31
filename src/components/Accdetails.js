/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import getpackages from '../action/package';
import LOGOSVG from '../assets/images/LOGOSVG.svg';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {firebase} from '@react-native-firebase/auth';
import WideAd from './WideAd';

const Accdetails = ({getpackages, packageState, colorlist}) => {
  let PC = colorlist.Primarycolor;
  // let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;
  const [obj, setobj] = useState({visited: 0, added: 0});

  const letlet = async () => {
    setobj({
      visited: 0,
      added: packageState?.loading ? 0 : packageState?.packages?.length,
    });
  };

  useEffect(() => {
    getpackages();
    letlet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packageState?.packages?.length]);
  return (
    <>
      <View style={[styles.container, {backgroundColor: PC}]}>
        <View
          // showsVerticalScrollIndicator={false}
          style={[
            styles.settingsbox,
            {
              backgroundColor: TC,
            },
          ]}>
          <View style={[styles.bottombox, {backgroundColor: PC}]}>
            {firebase.auth()._user.photoURL === null ? (
              <LOGOSVG width={80} height={80} />
            ) : (
              <Image
                source={{uri: firebase.auth()._user.photoURL}}
                style={styles.image}
              />
            )}
          </View>
          <View
            style={[
              styles.settings,
              {
                borderWidth: TC === '#000' ? 1 : 0,
                borderColor: 'rgba(255,255,255,0.6)',
                backgroundColor: PC,
              },
            ]}>
            <Icon
              style={styles.icon}
              name="user-o"
              size={16}
              color={PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'}
            />
            <Text
              numberOfLines={1}
              style={[
                styles.text,
                {color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
              ]}>
              {firebase.auth()._user.displayName === null
                ? firebase.auth()._user.email
                : firebase.auth()._user.displayName}
            </Text>
          </View>
          <View
            style={[
              styles.settings,
              {
                backgroundColor: PC,
                borderWidth: TC === '#000' ? 1 : 0,
                borderColor: 'rgba(255,255,255,0.6)',
              },
            ]}>
            <Icon
              style={styles.icon}
              name="dot-circle-o"
              size={16}
              color={PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'}
            />
            <Text
              numberOfLines={1}
              style={[
                styles.text,
                {color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
              ]}>
              Favourite : {obj.added}
            </Text>
          </View>
          <WideAd />
        </View>
        <View style={[styles.bottomsettings]}>
          <Text
            numberOfLines={1}
            style={[
              styles.text,
              {
                fontSize: 15,
                fontFamily: 'Quicksand-Bold',
                color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
              },
            ]}>
            {firebase.auth()._user.uid}
          </Text>
        </View>
      </View>
    </>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
  packageState: state.addpackage,
});

Accdetails.prototype = {
  getpackages: propTypes.func.isRequired,
  packageState: propTypes.object.isRequired,
  colorlist: propTypes.object.isRequired,
};

const mapDispatchToProps = {
  getpackages,
};
export default connect(mapStateToProps, mapDispatchToProps)(Accdetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getStatusBarHeight(),
    padding: 10,
  },
  settingsbox: {
    flexGrow: 1,
    flex: 1,
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
  bottombox: {
    marginVertical: 10,
    alignSelf: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 150,
    overflow: 'hidden',
  },
  image: {
    opacity: 1,
    width: 80,
    height: 80,
  },
  settings: {
    width: '100%',
    paddingVertical: 12,
    elevation: 2,
    overflow: 'hidden',
    borderRadius: 4,
    marginVertical: 5,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 20,
    width: '80%',
  },
  icon: {
    marginHorizontal: 10,
  },
  bottomsettings: {
    alignSelf: 'center',
    bottom: 0,
  },
});
