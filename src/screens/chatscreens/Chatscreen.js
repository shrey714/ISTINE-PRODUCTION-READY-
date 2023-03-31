/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useCallback, useState} from 'react';
import {firebase} from '@react-native-firebase/auth';
import {
  GiftedChat,
  InputToolbar,
  Bubble,
  MessageText,
} from 'react-native-gifted-chat';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import {
  MenuProvider,
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {renderers} from 'react-native-popup-menu';
const {SlideInMenu} = renderers;
import Clipboard from '@react-native-community/clipboard';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const Chatscreen = ({colorlist, route, navigation}) => {
  const {packagename} = route.params;
  // ================
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  // let TC = colorlist.Ternarycolor;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    navigation.setOptions({
      title: packagename ? packagename : '',
    });
  });
  const [loader, setloader] = useState(false);
  const RenderLoading = () => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size="large" color={SC} />
      </View>
    );
  };
  const Separator = () => (
    <View
      style={[
        {
          marginVertical: 6,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor:
            PC === '#000' || PC === '#1F1B24' ? '#fff' : '#737373',
        },
      ]}
    />
  );
  // ==================
  const usersCollection = firestore().collection(packagename);
  const [messages, setmessages] = useState([]);
  const [actionmessage, setactionmessage] = useState();
  useEffect(() => {
    const subscriber = usersCollection.onSnapshot(documentSnapshot => {
      const messageFirestore = documentSnapshot
        .docChanges()
        .filter(({type}) => type === 'added')
        .map(({doc}) => {
          const message = doc.data();
          return {...message, createdAt: message.createdAt.toDate()};
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messageFirestore);
    });
    return () => subscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function handleSend(messages) {
    messages.map(m => usersCollection.add(m));
    // await Promise.all(writes);
  }
  const appendMessages = useCallback(
    messages => {
      setmessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [messages],
  );
  const deleteMessages = async () => {
    setloader(true);
    setmessages(messages.filter(message => message._id !== actionmessage._id));
    await usersCollection
      .where('_id', '==', actionmessage._id)
      .get()
      .then(snap => {
        snap.docs[0].ref.delete();
      });
    setloader(false);
  };
  // ==================
  return (
    <>
      {loader ? (
        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            position: 'absolute',
            alignItems: 'center',
            zIndex: 5,
            justifyContent: 'center',
            backgroundColor: PC,
          }}>
          <ActivityIndicator size="large" color={SC} />
        </View>
      ) : (
        <></>
      )}
      <MenuProvider>
        <GiftedChat
          renderMessageText={props => {
            return (
              <MessageText
                {...props}
                textStyle={{
                  left: {
                    fontFamily: 'Quicksand-SemiBold',
                  },
                  right: {
                    fontFamily: 'Quicksand-SemiBold',
                  },
                }}
              />
            );
          }}
          messagesContainerStyle={{
            // backgroundColor: 'green',
            paddingBottom: 10,
            top: -getStatusBarHeight(),
            height: '100%',
          }}
          multiline={true}
          messages={messages}
          user={{
            _id: firebase.auth()._user.uid,
            name:
              firebase.auth()._user.displayName === null
                ? firebase.auth()._user.email
                : firebase.auth()._user.displayName,
          }}
          onSend={handleSend}
          renderUsernameOnMessage={true}
          alignTop={false}
          onLongPress={() => {}}
          onPress={(context, message) => {
            setactionmessage(message);
            setOpen(true);
            // handlePresentModalPress();
          }}
          scrollToBottom={true}
          textInputStyle={{
            fontFamily: 'Quicksand-Bold',
            color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
          }}
          renderInputToolbar={props => {
            return (
              <InputToolbar {...props} containerStyle={{backgroundColor: PC}} />
            );
          }}
          renderChatEmpty={() => (
            <View
              style={{
                width: '75%',
                justifyContent: 'center',
                alignSelf: 'center',
                transform: [{scaleY: -1}],
                marginTop: 30,
              }}>
              <Text
                style={{
                  fontFamily: 'Quicksand-SemiBold',
                  color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
                }}>
                This chat is not initialised by anyone.Let's start with you.
              </Text>
            </View>
          )}
          scrollToBottomComponent={() => (
            <Animatable.View
              animation="zoomIn"
              duration={400}
              useNativeDriver={true}
              style={{
                backgroundColor: '#000',
                width: 40,
                height: 40,
                borderRadius: 150,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="arrow-circle-down" size={23} color={SC} />
            </Animatable.View>
          )}
          renderLoading={RenderLoading}
        />
        <Menu
          onBackdropPress={() => setOpen(false)}
          opened={open}
          name="numbers"
          renderer={SlideInMenu}>
          <MenuTrigger />
          <MenuOptions
            customStyles={{
              optionsWrapper: {
                backgroundColor: PC,
                padding: 10,
              },
            }}>
            <MenuOption
              onSelect={() => {
                Clipboard.setString(actionmessage.text);
                setOpen(false);
              }}>
              <View style={[styles.box]}>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.text,
                    {
                      color:
                        PC === '#000' || PC === '#1f1b24' ? '#fff' : '#000',
                    },
                  ]}>
                  copy
                </Text>
              </View>
            </MenuOption>
            {actionmessage?.user._id === firebase.auth()._user.uid ? (
              <>
                <Separator />
                <MenuOption
                  onSelect={() => {
                    deleteMessages();
                    setOpen(false);
                  }}>
                  <View style={[styles.box]}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.text,
                        {
                          color:
                            PC === '#000' || PC === '#1f1b24' ? '#fff' : '#000',
                        },
                      ]}>
                      delete
                    </Text>
                  </View>
                </MenuOption>
              </>
            ) : (
              <></>
            )}
          </MenuOptions>
        </Menu>
      </MenuProvider>
    </>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Chatscreen.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(Chatscreen);

const styles = StyleSheet.create({
  box: {
    width: '100%',
    paddingLeft: 10,
    alignSelf: 'center',
  },
  text: {
    fontSize: 18,
    fontFamily: 'Quicksand-Bold',
  },
});
