/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  TextInput,
  Modal,
  Text,
  Pressable,
  View,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary} from 'react-native-image-picker';
import Snackbar from 'react-native-snackbar';
import database from '@react-native-firebase/database';
import shortid from 'shortid';
import {firebase} from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
const Sett3 = ({colorlist, navigation}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;
  // =================
  const type1 = 'report spam or abuse';
  const type2 = 'send feedback';
  const type3 = 'report a problem';
  const [modalVisible, setModalVisible] = useState(false);
  const [bugtype, setbugtype] = useState('please select bug type');
  const [textAreaValue, setTextAreaValue] = useState(null);
  const [uploadedimg, setuploadedimg] = useState([]);
  const [waittext, setwaittext] = useState(false);
  const [countimages, setcountimages] = useState(0);
  // =================
  const Uploadhelp = async () => {
    setwaittext(true);
    try {
      const uidp = shortid.generate();
      let maile = await firebase.auth()._user.uid;
      for (let index = 0; index < uploadedimg.length; index++) {
        setcountimages(index + 1);
        var uri = uploadedimg[index];
        var filename = uri.substring(uri.lastIndexOf('/') + 1);
        var reference = storage().ref(`${maile}/${uidp}/${filename}`);
        await reference.putFile(uri);
        uploadedimg[index] = await reference.getDownloadURL();
      }
      await database().ref(`/helps/${maile}/${uidp}`).set({
        id: uidp,
        useremail: firebase.auth()._user.email,
        bugtype,
        desc: textAreaValue,
        images: uploadedimg,
        response: 'no response yet',
      });
      Snackbar.show({
        text: 'problem statement submited',
        textColor: '#fff',
        backgroundColor: 'rgba(0,0,0,0.5)',
      });
      setbugtype('please select bug type');
      setuploadedimg([]);
      setTextAreaValue(null);
    } catch (error) {
      console.log(error);
      Snackbar.show({
        text: 'please check your connection',
        textColor: '#fff',
        backgroundColor: 'rgba(0,0,0,0.5)',
      });
      setwaittext(false);
    }
    setwaittext(false);
  };
  // =================
  const chooseFile = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        // alert(response.customButton);
      } else {
        let source = response.assets[0].uri;
        setuploadedimg([...uploadedimg, source]);
      }
    });
  };
  // =============
  const Showmodal = () => {
    return (
      <>
        <Modal
          animationType="fade"
          transparent={true}
          statusBarTranslucent={true}
          hardwareAccelerated={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
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
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  borderBottomWidth: 0.2,
                  borderBottomColor: '#adadad',
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 17,
                    fontWeight: '500',
                    fontFamily: 'Quicksand-Bold',
                  }}>
                  Bug type?
                </Text>
                <Pressable
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Icon name="close" size={23} color="#000" />
                </Pressable>
              </View>

              <Pressable
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderBottomWidth: 0.2,
                  borderBottomColor: '#ADADAD',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setbugtype(type1);
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 17,
                    fontWeight: '400',
                    fontFamily: 'Quicksand-SemiBold',
                  }}>
                  {type1}
                </Text>
              </Pressable>
              <Pressable
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderBottomWidth: 0.2,
                  borderBottomColor: '#ADADAD',
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setbugtype(type2);
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 17,
                    fontWeight: '400',
                    fontFamily: 'Quicksand-SemiBold',
                  }}>
                  {type2}
                </Text>
              </Pressable>
              <Pressable
                style={{
                  width: '100%',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setbugtype(type3);
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 17,
                    fontWeight: '400',
                    fontFamily: 'Quicksand-SemiBold',
                  }}>
                  {type3}
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </>
    );
  };
  // ===============
  const Bugbutton = () => {
    return (
      <View style={{width: '100%'}} alignItems="center">
        <Pressable
          style={{
            borderRadius: 4,
            borderWidth: 1,
            borderColor:
              PC === '#000' || PC === '#1F1B24'
                ? 'rgba(255,255,255,0.8)'
                : 'rgba(0,0,0,0.7)',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 8,
            paddingVertical: 8,
          }}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}>
          <Text
            style={{
              fontFamily: 'Quicksand-Bold',
              color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
              fontWeight: '500',
              fontSize: 17,
            }}>
            {bugtype}
          </Text>
        </Pressable>
      </View>
    );
  };
  // ===============
  const Uploadimg = () => {
    return (
      <View
        style={{
          width: '100%',
          marginTop: 12,
          borderBottomWidth: 0.2,
          borderBottomColor:
            PC === '#000' || PC === '#1F1B24'
              ? 'rgba(255,255,255,0.8)'
              : 'rgba(0,0,0,0.7)',
          borderTopWidth: 0.2,
          borderTopColor:
            PC === '#000' || PC === '#1F1B24'
              ? 'rgba(255,255,255,0.8)'
              : 'rgba(0,0,0,0.7)',
        }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 5,
            paddingVertical: 8,
          }}>
          <Pressable
            onPress={chooseFile}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? 'rgba(0,0,0,0.7)' : TC,
                width: 50,
                height: 50,
                marginHorizontal: 5,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}>
            <Icon name="plus" size={30} color={SC} />
          </Pressable>
          {uploadedimg.map((e, index) => (
            <Image
              style={{
                width: 50,
                height: 50,
                marginHorizontal: 5,
                borderRadius: 10,
                backgroundColor: TC,
              }}
              key={index}
              source={{
                uri: e,
              }}
              alt="Alternate Text"
            />
          ))}
        </ScrollView>
      </View>
    );
  };
  // ==============
  const Waitmodal = () => {
    return (
      <>
        <Modal
          animationType="fade"
          transparent={true}
          statusBarTranslucent={true}
          hardwareAccelerated={true}
          visible={waittext}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.4)',
            }}>
            <Text
              style={{
                fontFamily: 'Quicksand-Bold',
                fontSize: 30,
                fontWeight: 'bold',
                color: '#fff',
              }}>
              {countimages}
            </Text>
            <Text
              style={{
                fontFamily: 'Quicksand-Bold',
                fontSize: 20,
                fontWeight: 'bold',
                color: '#ADADAD',
              }}>
              /{uploadedimg.length}
            </Text>
          </View>
        </Modal>
      </>
    );
  };
  //===============
  const Submitbtn = () => {
    return (
      <View style={{width: '100%', marginTop: 20, alignItems: 'center'}}>
        <Pressable
          style={({pressed}) => [
            {
              width: '40%',
              backgroundColor: pressed
                ? TC
                : PC === '#000' || PC === '#1F1B24'
                ? '#fff'
                : '#000',
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 8,
              paddingVertical: 6,
              elevation: 5,
            },
          ]}
          onPress={() => {
            if (bugtype === 'please select bug type') {
              Snackbar.show({
                text: 'please select bug type',
                textColor: '#fff',
                backgroundColor: 'rgba(0,0,0,0.5)',
              });
            } else if (textAreaValue === null) {
              Snackbar.show({
                text: 'please write what problems are you facing',
                textColor: '#fff',
                backgroundColor: 'rgba(0,0,0,0.5)',
              });
            } else {
              Uploadhelp();
            }
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontFamily: 'Quicksand-Bold',
              color: PC === '#000' || PC === '#1F1B24' ? '#000' : '#fff',
              fontWeight: '500',
              fontSize: 18,
            }}>
            Submit
          </Text>
        </Pressable>
      </View>
    );
  };
  // ==============
  return (
    <>
      <Showmodal />
      <Bugbutton />
      <View
        style={{
          alignItems: 'center',
          width: '100%',
          marginTop: 12,
          borderBottomWidth: 0.2,
          borderBottomColor:
            PC === '#000' || PC === '#1F1B24'
              ? 'rgba(255,255,255,0.8)'
              : 'rgba(0,0,0,0.7)',
          borderTopWidth: 0.2,
          borderTopColor:
            PC === '#000' || PC === '#1F1B24'
              ? 'rgba(255,255,255,0.8)'
              : 'rgba(0,0,0,0.7)',
        }}>
        <TextInput
          multiline
          value={textAreaValue}
          onChangeText={setTextAreaValue}
          placeholderTextColor={
            PC === '#000' || PC === '#1F1B24'
              ? 'rgba(255,255,255,0.8)'
              : 'rgba(0,0,0,0.7)'
          }
          placeholder="What would you like us to improve?"
          style={{
            fontFamily: 'Quicksand-Bold',
            color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
            fontWeight: '500',
            backgroundColor: 'transparent',
            width: '85%',
            maxWidth: 400,
            maxHeight: 150,
          }}
        />
      </View>
      <Uploadimg />
      <Submitbtn />
      <Waitmodal />
      <Pressable
        onPress={() => navigation.navigate('Bug Result')}
        style={({pressed}) => [
          styles.settings,
          {
            borderWidth: PC === '#000' || PC === '#1F1B24' ? 1 : 0,
            borderColor: 'rgba(255,255,255,0.6)',
            backgroundColor: pressed ? PC : TC,
          },
        ]}>
        <Icon3
          style={styles.icon}
          name="done-all"
          size={16}
          color={TC === '#000' ? '#fff' : '#000'}
        />
        <Text style={[styles.text, {color: TC === '#000' ? '#fff' : '#000'}]}>
          Bug History
        </Text>
      </Pressable>
    </>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Sett3.prototype = {
  colorlist: propTypes.object.isRequired,
};
export default connect(mapStateToProps)(Sett3);

const styles = StyleSheet.create({
  settings: {
    elevation: 2,
    position: 'absolute',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    bottom: 20,
  },
  text: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 17,
  },
  icon: {
    marginHorizontal: 9,
  },
});
