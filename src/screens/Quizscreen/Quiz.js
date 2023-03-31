/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
  ScrollView,
  Animated,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useInterstitialAd, TestIds} from 'react-native-google-mobile-ads';
import * as Animatable from 'react-native-animatable';
import {SharedElement} from 'react-navigation-shared-element';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
const {height} = Dimensions.get('window');
//===============

//===============
const Quiz = ({route, colorlist, navigation}) => {
  const {item, index} = route.params;
  // console.log(item);
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;
  //=================
  const adUnitId = __DEV__
    ? TestIds.INTERSTITIAL
    : 'ca-app-pub-7393727234144842/1082813812';
  const {isLoaded, isClosed, load, show} = useInterstitialAd(adUnitId, {
    requestNonPersonalizedAdsOnly: false,
  });
  useEffect(() => {
    load();
  }, [load]);
  useEffect(() => {
    if (isClosed) {
      restartQuiz();
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isClosed]);
  //=================
  const allQuestions = item.data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const validateAnswer = selectedOption => {
    let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);
    if (selectedOption === correct_option) {
      // Set Score
      setScore(score + 1);
    }
    // Show Next Button
    setShowNextButton(true);
  };
  const handleNext = () => {
    if (currentQuestionIndex === allQuestions.length - 1) {
      // Last Question
      // Show Score Modal
      setShowScoreModal(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  const restartQuiz = () => {
    setShowScoreModal(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  const renderQuestion = () => {
    return (
      <View
        style={{
          marginBottom: 20,
          borderWidth: 3,
          padding: 10,
          borderRadius: 20,
          borderColor: TC + '40',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        {/* Question Counter */}
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignSelf: 'flex-start',
            justifyContent: 'space-between',
            marginVertical: 5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              backgroundColor: 'rgba(255,255,255,0.6)',
              alignSelf: 'flex-start',
              paddingVertical: 5,
              paddingHorizontal: 8,
              borderRadius: 8,
            }}>
            <Text
              style={{
                fontFamily: 'Quicksand-Bold',
                color: '#000',
                fontSize: 20,
                opacity: 0.6,
                marginRight: 2,
              }}>
              {currentQuestionIndex + 1}
            </Text>
            <Text
              style={{
                color: '#000',
                fontFamily: 'Quicksand-Bold',
                fontSize: 18,
                opacity: 0.6,
              }}>
              / {allQuestions.length}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setShowScoreModal(true);
            }}
            style={{
              backgroundColor: 'rgba(255,255,255,0.6)',
              paddingVertical: 5,
              paddingHorizontal: 8,
              borderRadius: 8,
            }}>
            <Icon name="sign-out" size={23} color={SC} />
          </TouchableOpacity>
        </View>
        {/* Question */}
        <Text
          style={{
            color: '#000',
            fontSize: 30,
            fontFamily: 'Quicksand-Bold',
            backgroundColor: 'rgba(255,255,255,0.6)',
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 10,
            marginVertical: 5,
          }}>
          {allQuestions[currentQuestionIndex]?.question}
        </Text>
      </View>
    );
  };
  const renderOptions = () => {
    return (
      <View
        style={{
          borderWidth: 3,
          padding: 10,
          borderRadius: 20,
          borderColor: TC + '40',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        {allQuestions[currentQuestionIndex]?.options.map(option => (
          <TouchableOpacity
            onPress={() => validateAnswer(option)}
            disabled={isOptionsDisabled}
            key={option}
            style={{
              borderRadius: 10,
              backgroundColor:
                option === correctOption
                  ? 'rgba(0,200,81,0.6)' + '20'
                  : option === currentOptionSelected
                  ? 'rgba(255,68,68,0.6)' + '20'
                  : 'rgba(255,255,255,0.6)',
              minHeight: 55,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontFamily: 'Quicksand-Bold',
                fontSize: 20,
                color: '#000',
              }}>
              {option}
            </Text>
            {/* Show Check Or Cross Icon based on correct answer*/}
            {option === correctOption ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: '#00C851',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="check" size={23} color={'#000'} />
              </View>
            ) : option === currentOptionSelected ? (
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 30 / 2,
                  backgroundColor: '#ff4444',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon name="times" size={23} color={'#000'} />
              </View>
            ) : null}
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <Animatable.View
          animation="fadeIn"
          duration={300}
          useNativeDriver={true}>
          <TouchableOpacity
            onPress={handleNext}
            style={{
              marginTop: 25,
              width: '50%',
              alignSelf: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
              padding: 9,
              borderRadius: 10,
              borderWidth: 3,
              borderColor: TC + '40',
            }}>
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.6)',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderRadius: 7,
              }}>
              <Text
                style={{
                  fontSize: 27,
                  color: '#000',
                  fontFamily: 'Quicksand-Bold',
                  textAlign: 'center',
                }}>
                Next
              </Text>
            </View>
          </TouchableOpacity>
        </Animatable.View>
      );
    } else {
      return null;
    }
  };
  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ['0%', '100%'],
  });
  const renderProgressBar = () => {
    return (
      <View
        style={{
          width: '100%',
          height: 26,
          borderRadius: 20,
          borderWidth: 3,
          borderColor: TC + 40,
          marginBottom: 20,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1,
        }}>
        <Animated.View
          style={[
            {
              height: 20,
              borderRadius: 20,
              backgroundColor: SC,
            },
            {
              width: progressAnim,
            },
          ]}></Animated.View>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
      }}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      {/* ================ */}
      <SharedElement id={`item.${index}.image_url`}>
        <Image
          source={item.img}
          style={{
            width: '100%',
            height: height,
            position: 'absolute',
          }}
          resizeMode="cover"
        />
      </SharedElement>
      {/* ================ */}
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingTop: getStatusBarHeight(),
          position: 'relative',
        }}>
        {/*main screen*/}
        <Animatable.View
          animation="slideInDown"
          duration={800}
          useNativeDriver={true}>
          {/* ProgressBar */}
          {renderProgressBar()}
        </Animatable.View>
        <Animatable.View
          animation="zoomIn"
          duration={800}
          useNativeDriver={true}>
          <ScrollView
            contentContainerStyle={{paddingBottom: 63}}
            showsVerticalScrollIndicator={false}>
            {/* Question */}
            {renderQuestion()}
            {/* Options */}
            {renderOptions()}
            {/* Next Button */}
            {renderNextButton()}
          </ScrollView>
        </Animatable.View>
        {/* Score Modal */}
        <Modal
          animationType="fade"
          statusBarTranslucent={true}
          transparent={true}
          visible={showScoreModal}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.6)',
              // hardwareAccelerated: true,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: PC,
                width: '90%',
                elevation: 8,
                borderRadius: 20,
                padding: 20,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontFamily: 'Quicksand-Bold',
                  color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
                }}>
                {score > allQuestions.length / 2 ? 'Congratulations!' : 'Oops!'}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginVertical: 20,
                }}>
                <Text
                  style={{
                    fontSize: 30,
                    fontFamily: 'Quicksand-Bold',
                    color:
                      score > allQuestions.length / 2 ? '#00C851' : '#ff4444',
                  }}>
                  {score}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Quicksand-Bold',
                    color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
                  }}>
                  / {allQuestions.length}
                </Text>
              </View>
              {/* Retry Quiz button */}
              <TouchableOpacity
                onPress={() => {
                  if (isLoaded) {
                    show();
                  } else {
                    restartQuiz();
                  }
                }}
                style={{
                  backgroundColor: SC,
                  padding: 20,
                  width: '100%',
                  borderRadius: 20,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Quicksand-Bold',
                    color: TC === '#000' ? '#fff' : '#000',
                    fontSize: 20,
                  }}>
                  Retry Quiz
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Quiz.prototype = {
  colorlist: propTypes.object.isRequired,
};

Quiz.sharedElements = route => {
  const {item, index} = route.params;
  return [
    {
      id: `item.${index}.image_url`,
      animation: 'move',
      resize: 'clip',
    },
  ];
};

export default connect(mapStateToProps)(Quiz);
