/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {
  StyleSheet,
  Easing,
  Animated,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Box, Center, FormControl, Link, Input, Button} from 'native-base';
const screenwidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;
import Snackbar from 'react-native-snackbar';
import ChartScreen from '../../components/ChartScreen';
import {signIn} from '../../action/auth';
import {forgotpass} from '../../action/auth';
import LOGOSVG from '../../assets/images/LOGOSVG.svg';
const SignIn = ({signIn, forgotpass}) => {
  const margin = {
    marginLeft: -screenwidth / 5.9,
    marginBottom: -screenheight / 11.733,
  };
  const datarray = [100, 40, 80, 50, 60, 30, 60, 10, 40, 0];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const doSignIn = () => {
    if (email === '' || password === '') {
      Snackbar.show({
        text: 'Please enter your email and password',
        textColor: '#000',
        backgroundColor: 'rgba(255,255,255,1)',
      });
    } else {
      signIn({email, password});
    }
  };
  // ===============
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '6484832530-fmjo4h8vt403sqn8lgj0se7tbve6dru5.apps.googleusercontent.com',
    });
  }, []);
  const signIngoogle = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancelled the login flow');
        Snackbar.show({
          text: 'user cancelled the login flow',
          textColor: '#000',
          backgroundColor: 'rgba(255,255,255,1)',
        });
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Snackbar.show({
          text: 'signin is in progress already',
          textColor: '#000',
          backgroundColor: 'rgba(255,255,255,1)',
        });
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Snackbar.show({
          text: 'play services not available or outdated',
          textColor: '#000',
          backgroundColor: 'rgba(255,255,255,1)',
        });
      } else {
        Snackbar.show({
          text: 'signing failed / try to SignUp using your email and password',
          textColor: '#fff',
          backgroundColor: 'rgba(0,0,0,0.5)',
        });
      }
    }
  };
  // ===============
  const doforgotpass = () => {
    if (email === '') {
      Snackbar.show({
        text: 'Please enter your email',
        textColor: '#000',
        backgroundColor: 'rgba(255,255,255,1)',
      });
    } else {
      forgotpass({email});
    }
  };
  const anima = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(anima, {
        toValue: 1,
        duration: 1000,
        easing: Easing.elastic(2.8),
        useNativeDriver: true,
      }),
    ).start();
  }, [anima]);
  const spin = anima.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container, {backgroundColor: '#fff'}]}
        showsVerticalScrollIndicator={false}>
        <Box
          shadow={2}
          style={[
            styles.signbox,
            {
              backgroundColor: '#fff',
              width: screenwidth / 1.18,
              height: screenheight / 1.3,
            },
          ]}>
          <Box style={[styles.chartbox, {width: '100%'}]}>
            <ChartScreen value={datarray} style={margin} />
          </Box>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <Center paddingY={5}>
              <Animated.View
                style={{
                  borderRadius: 150,
                  width: 100,
                  height: 100,
                  overflow: 'hidden',
                  backgroundColor: '#dedede',
                  transform: [{rotate: spin}],
                }}>
                <LOGOSVG width={100} height={100} />
              </Animated.View>
            </Center>
            <FormControl isRequired style={styles.signinbox}>
              <Box marginBottom={2}>
                <Text size="lg" style={styles.heading1}>
                  Welcome Back
                </Text>
                <Text size="lg" style={styles.heading2}>
                  SignIn to pick up exactly where you left off
                </Text>
              </Box>
              <Input
                fontSize="19"
                fontFamily="Quicksand-Bold"
                type="email"
                variant="underlined"
                marginVertical={5}
                width={screenwidth / 1.6}
                maxW={'320'}
                borderRadius={0}
                paddingLeft={1}
                paddingRight={2}
                borderWidth={1}
                isRequired={true}
                borderColor="#000"
                placeholder="Email"
                _focus={{borderColor: '#900'}}
                value={email}
                onChangeText={text => setEmail(text)}
              />
              <Input
                fontSize="19"
                fontFamily="Quicksand-Bold"
                type="password"
                variant="underlined"
                marginVertical={5}
                width={screenwidth / 1.6}
                maxW={'320'}
                paddingLeft={1}
                paddingRight={2}
                borderRadius={0}
                borderWidth={1}
                isRequired={true}
                borderColor="#000"
                placeholder="Password"
                _focus={{borderColor: '#900'}}
                value={password}
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
              />
              <Link
                _text={{
                  fontFamily: 'Quicksand-Bold',
                  color: '#900',
                  fontSize: 15,
                }}
                onPress={doforgotpass}
                isUnderlined={false}>
                Forgot password
              </Link>
              <Button
                regular
                shadow={1}
                _pressed={{
                  bg: '#ADADAD',
                }}
                block
                onPress={doSignIn}
                bg={'#fff'}
                style={[styles.button]}>
                <Text
                  style={[
                    styles.buttontxt,
                    {
                      color: '#000',
                    },
                  ]}>
                  SignIn
                </Text>
              </Button>
              <GoogleSigninButton
                style={{
                  marginBottom: screenheight / 25,
                }}
                size={GoogleSigninButton.Size.Standard}
                color={GoogleSigninButton.Color.Dark}
                onPress={signIngoogle}
              />
            </FormControl>
          </ScrollView>
        </Box>
      </ScrollView>
    </>
  );
};
const mapDispatchToProps = {
  signIn: data => signIn(data),
  forgotpass: data => forgotpass(data),
};

SignIn.propTypes = {
  signIn: propTypes.func.isRequired,
  forgotpass: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  signbox: {
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    overflow: 'hidden',
  },
  chartbox: {
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
  },
  signinbox: {
    flex: 1,
    width: '100%',
    paddingLeft: screenwidth / (16 * 1.18),
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  heading1: {
    color: '#000',
    fontSize: 27,
    fontFamily: 'Quicksand-Bold',
  },
  heading2: {
    color: '#ADADAD',
    fontFamily: 'Quicksand-SemiBold',
    fontSize: 18,
  },
  button: {
    marginTop: screenheight / 25,
    borderWidth: 1,
    marginBottom: 15,
  },
  buttontxt: {
    fontSize: 24,
    fontFamily: 'Quicksand-Bold',
    alignSelf: 'center',
  },
});
