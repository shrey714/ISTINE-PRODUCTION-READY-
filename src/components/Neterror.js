/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

const Neterror = ({colorlist}) => {
  let PC = colorlist.Primarycolor;
  // let SC = colorlist.Secondarycolor;
  // let TC = colorlist.Ternarycolor;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      hardwareAccelerated={true}>
      <View
        style={[
          {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:
              PC === '#000' || PC === '#1F1B24' || PC === '#949398'
                ? 'rgba(0,0,0,0.6)'
                : 'rgba(255,255,255,0.4)',
          },
        ]}>
        <View
          style={{
            backgroundColor:
              PC === '#000' || PC === '#1F1B24' || PC === '#949398'
                ? '#000'
                : '#fff',
            width: '68%',
            maxWidth: 350,
            elevation: 2,
            flexDirection: 'column',
            borderRadius: 4,
            borderWidth:
              PC === '#000' || PC === '#1F1B24' || PC === '#949398' ? 0.2 : 0,
            borderColor: '#ADADAD',
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              paddingVertical: 15,
              borderBottomWidth: 0.2,
              borderBottomColor: '#adadad',
            }}>
            <Text
              style={{
                fontFamily: 'Quicksand-Bold',
                color:
                  PC === '#000' || PC === '#1F1B24' || PC === '#949398'
                    ? '#fff'
                    : '#000',
                fontSize: 20,
                fontWeight: '500',
              }}>
              Istine
            </Text>
            <Icon
              name="signal-wifi-off"
              size={23}
              color={
                PC === '#000' || PC === '#1F1B24' || PC === '#949398'
                  ? '#fff'
                  : '#000'
              }
            />
          </View>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 10,
              paddingVertical: 20,
            }}>
            <Text
              style={{
                fontFamily: 'Quicksand-Bold',
                color:
                  PC === '#000' || PC === '#1F1B24' || PC === '#949398'
                    ? '#fff'
                    : '#000',
                fontSize: 16,
                fontWeight: '500',
              }}>
              Make sure you are connected to internet...
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});
Neterror.prototypes = {
  signOut: propTypes.func.isRequired,
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(Neterror);
