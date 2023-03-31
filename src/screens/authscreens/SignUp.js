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
import LOGOSVG from '../../assets/images/LOGOSVG.svg';
import Snackbar from 'react-native-snackbar';
import {Box, Center, FormControl, Input, Button} from 'native-base';
const screenwidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;
import ChartScreen from '../../components/ChartScreen';
import {signUp} from '../../action/auth';

const SignUp = ({signUp}) => {
  const doSignUp = async () => {
    if (email === '' || password === '') {
      Snackbar.show({
        text: 'Please enter your email and password',
        textColor: '#000',
        backgroundColor: 'rgba(255,255,255,1)',
      });
    } else {
      signUp({email, password});
    }
  };
  const margin = {
    marginLeft: -screenwidth / 5.9,
    marginBottom: -screenheight / 11.733,
  };
  const datarray = [0, 40, 10, 60, 30, 60, 50, 80, 40, 100];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
                Welcome
              </Text>
              <Text size="lg" style={styles.heading2}>
                SignUp to explore your packages
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
            <Button
              regular
              shadow={1}
              _pressed={{
                bg: '#ADADAD',
              }}
              block
              onPress={doSignUp}
              bg={'#fff'}
              style={[styles.button]}>
              <Text
                style={[
                  styles.buttontxt,
                  {
                    color: '#000',
                  },
                ]}>
                SignUp
              </Text>
            </Button>
          </FormControl>
        </ScrollView>
      </Box>
    </ScrollView>
  );
};

const mapDispatchToProps = {
  signUp: data => signUp(data),
};

SignUp.propTypes = {
  signUp: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SignUp);
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  signbox: {
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
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
    paddingRight: screenwidth / (16 * 1.18),
    alignItems: 'flex-end',
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
    marginBottom: screenheight / 25,
  },
  buttontxt: {
    fontSize: 24,
    fontFamily: 'Quicksand-Bold',
    alignSelf: 'center',
  },
});
