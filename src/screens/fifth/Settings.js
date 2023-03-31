/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {
  StyleSheet,
  Pressable,
  ScrollView,
  Text,
  View,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import Icon4 from 'react-native-vector-icons/AntDesign';
import {signOut} from '../../action/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import LOGOSVG from '../../assets/images/LOGOSVG.svg';

const Settings = ({signOut, navigation, colorlist}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '6484832530-fmjo4h8vt403sqn8lgj0se7tbve6dru5.apps.googleusercontent.com',
    });
  }, []);

  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <View style={[styles.container]}>
      <ScrollView
        contentContainerStyle={[
          styles.settingsbox,
          {
            flexGrow: 1,
            backgroundColor: TC,
          },
        ]}>
        <View style={styles.bottombox}>
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: PC,
              borderRadius: 150,
              overflow: 'hidden',
            }}>
            <LOGOSVG width={100} height={100} />
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <Text
              style={[
                {
                  color: '#900',
                  fontFamily: 'Quicksand-Bold',
                  fontSize: 70,
                },
              ]}>
              V
            </Text>
            <Text
              style={[
                {
                  color: '#900',
                  fontSize: 17,
                  fontFamily: 'Quicksand-Bold',
                },
              ]}>
              1.0
            </Text>
          </View>
        </View>
        <View>
          <Pressable
            onPress={() => navigation.navigate('Notifications')}
            style={({pressed}) => [
              styles.settings,
              {
                borderWidth: TC === '#000' ? 1 : 0,
                borderColor: 'rgba(255,255,255,0.6)',
                backgroundColor: pressed ? TC : PC,
              },
            ]}>
            <Icon
              style={styles.icon}
              name="bell"
              size={16}
              color={PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'}
            />
            <Text
              style={[
                styles.text,
                {color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
              ]}>
              Notifications
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Theme')}
            style={({pressed}) => [
              styles.settings,
              {
                borderWidth: TC === '#000' ? 1 : 0,
                borderColor: 'rgba(255,255,255,0.6)',
                backgroundColor: pressed ? TC : PC,
              },
            ]}>
            <Icon2
              style={styles.icon}
              name="palette"
              size={16}
              color={PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'}
            />
            <Text
              style={[
                styles.text,
                {color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
              ]}>
              Theme
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Bug Report')}
            style={({pressed}) => [
              styles.settings,
              {
                borderWidth: TC === '#000' ? 1 : 0,
                borderColor: 'rgba(255,255,255,0.6)',
                backgroundColor: pressed ? TC : PC,
              },
            ]}>
            <Icon3
              style={styles.icon}
              name="bug-report"
              size={16}
              color={PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'}
            />
            <Text
              style={[
                styles.text,
                {color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
              ]}>
              Bug Report
            </Text>
          </Pressable>
          <Pressable
            // onPress={() => signOut()}
            onPress={() => setIsOpen(!isOpen)}
            style={({pressed}) => [
              styles.settings,
              {
                borderWidth: TC === '#000' ? 1 : 0,
                borderColor: 'rgba(255,255,255,0.6)',
                backgroundColor: pressed ? TC : PC,
              },
            ]}>
            <Icon
              style={styles.icon}
              name="sign-out"
              size={16}
              color={PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'}
            />
            <Text
              style={[
                styles.text,
                {color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
              ]}>
              Sign Out
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        hardwareAccelerated={true}
        visible={isOpen}
        onRequestClose={() => {
          setIsOpen(!isOpen);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '68%',
              maxWidth: 350,
              elevation: 2,
              flexDirection: 'column',
              borderRadius: 8,
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
                  color: '#000',
                  fontSize: 17,
                }}>
                Confirm?
              </Text>
              <Pressable
                onPress={() => {
                  setIsOpen(!isOpen);
                }}>
                <Icon4 name="close" size={23} color="#000" />
              </Pressable>
            </View>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderBottomWidth: 0.2,
                borderBottomColor: '#ADADAD',
              }}>
              <Text
                style={{
                  fontFamily: 'Quicksand-SemiBold',
                  color: '#000',
                  fontSize: 14,
                }}>
                This will remove all settings related to Istine. This action
                cannot be reversed. Deleted data can not be recovered.
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderBottomWidth: 0.2,
                borderBottomColor: '#ADADAD',
                alignItems: 'flex-end',
              }}>
              <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor: pressed
                      ? TC
                      : PC === '#000' || PC === '#1F1B24'
                      ? '#fff'
                      : '#000',
                    borderRadius: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    elevation: 3,
                  },
                ]}
                onPress={async () => {
                  const isIn = await GoogleSignin.isSignedIn();
                  if (isIn) {
                    await GoogleSignin.revokeAccess();
                  }
                  await signOut();
                }}>
                <Text
                  style={{
                    fontFamily: 'Quicksand-Bold',
                    color: PC === '#000' || PC === '#1F1B24' ? '#000' : '#fff',
                    fontWeight: '500',
                    fontSize: 15,
                  }}>
                  Sign out
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

const mapDispatchToProps = {
  signOut,
};

Settings.prototypes = {
  signOut: propTypes.func.isRequired,
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  settingsbox: {
    width: '100%',
    borderRadius: 5,
    padding: 10,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  settings: {
    elevation: 2,
    paddingVertical: 12,
    width: '100%',
    borderRadius: 4,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 17,
  },
  icon: {
    marginHorizontal: 9,
  },
  bottombox: {
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
});
