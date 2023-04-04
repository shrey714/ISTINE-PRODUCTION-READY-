/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from 'react-native';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Snackbar from 'react-native-snackbar';
import database from '@react-native-firebase/database';
import {firebase} from '@react-native-firebase/auth';
const windowWidth = Dimensions.get('screen').width;

const Favbox = ({details, index, navigation, colorlist}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;

  const deleteBox = async () => {
    try {
      let maile = await firebase.auth()._user.uid;
      await database()
        .ref(`/packages/${maile}/`)
        .child(`${details.id}`)
        .remove(() => {
          const dref = database().ref(`/counter/${details.packagename}`);
          dref.once('value', async snapshot => {
            if (snapshot.val() > 0) {
              let currentvalue = await snapshot.val();
              await database()
                .ref(`/counter/${details.packagename}`)
                .set(currentvalue - 1);
            } else {
              //do nothing
            }
          });
        });
      Snackbar.show({
        text: 'Package deleted',
        textColor:
          PC === '#000' || PC === '#1F1B24' || PC === '#949398'
            ? '#fff'
            : '#000',
        backgroundColor:
          PC === '#000' || PC === '#1F1B24' || PC === '#949398'
            ? '#000'
            : '#fff',
      });
    } catch (error) {
      console.log(error);
      Snackbar.show({
        text: 'Failed to delete the package',
        textColor:
          PC === '#000' || PC === '#1F1B24' || PC === '#949398'
            ? '#fff'
            : '#000',
        backgroundColor:
          PC === '#000' || PC === '#1F1B24' || PC === '#949398'
            ? '#000'
            : '#fff',
      });
    }
  };

  let Anim = useRef(new Animated.Value(0)).current;

  const [olele, setolele] = useState(false);
  const toggleHandle = () => {
    setolele(!olele);

    Animated.timing(Anim, {
      toValue: !olele ? 1 : 0,
      duration: 300,
      easing: Easing.elastic(0.7),
      delay: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      disabled={olele ? true : false}
      style={[
        styles.box,
        {
          borderWidth: PC === '#000' || PC === '#1F1B24' ? 1.2 : 0,
          borderColor: 'rgba(255,255,255,0.5)',
        },
      ]}
      onPress={() =>
        navigation.navigate('Infopage', {
          packagename: details.packagename,
          packageversion: details.packageversion,
        })
      }>
      <Animated.View
        style={[
          styles.manubox,
          {
            opacity: Anim,
          },
          {
            // transform: [{scale: Anim}],
          },
        ]}>
        <TouchableOpacity
          onPress={deleteBox}
          disabled={olele ? false : true}
          style={[styles.trashbtn, {borderColor: SC}]}>
          <Icon name="trash" size={35} color={SC} />
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        style={[
          styles.menubtn,
          {backgroundColor: !olele ? TC : '#000', borderColor: SC},
        ]}
        onPress={() => toggleHandle()}>
        <Icon name="ellipsis-v" size={22} color={SC} />
      </TouchableOpacity>

      <View style={[styles.packagebox, {backgroundColor: TC}]}>
        <Text numberOfLines={2} style={[styles.packagetext, {color: SC}]}>
          {details?.packagename}
        </Text>
      </View>

      <View style={[styles.versionbox, {backgroundColor: PC}]}>
        <Text
          numberOfLines={1}
          style={[
            styles.versiontext,
            {
              color:
                PC === '#ffffff' || PC === '#F9F9F9'
                  ? SC === '#ffffff'
                    ? '#000'
                    : SC
                  : SC,
            },
          ]}>
          {details?.packageversion}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Favbox.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(Favbox);

const styles = StyleSheet.create({
  box: {
    marginTop: 10,
    marginHorizontal: 5,
    elevation: 2,
    width: (windowWidth - 20) / 2,
    height: 210,
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
  },
  packagetext: {
    fontSize: 25,
    fontFamily: 'Quicksand-Bold',
  },
  versiontext: {
    fontSize: 28,
    fontFamily: 'Quicksand-Bold',
  },
  packagebox: {
    height: 150,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  versionbox: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },
  manubox: {
    position: 'absolute',
    width: '100%',
    height: 210,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  menubtn: {
    position: 'absolute',
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 150,
    borderWidth: 2,
    margin: 7,
    top: 0,
    right: 0,
    zIndex: 2,
  },
  trashbtn: {
    zIndex: -1,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 150,
    borderWidth: 2,
  },
});
