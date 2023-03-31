/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Dimensions, StyleSheet, FlatList, TextInput} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import LoadingAnimation from '../../components/LoadingAnimation';
import axios from 'axios';
import Accordion from './Accordion';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const shortid = require('shortid');
// const CARD_HEIGHT = 140;
const {height: wHeight} = Dimensions.get('window');
// const height = wHeight - 58 - getStatusBarHeight();
const Third = ({navigation, colorlist}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;
  // const y = new Animated.Value(0);
  // const onScroll = Animated.event([{nativeEvent: {contentOffset: {y}}}], {
  //   useNativeDriver: true,
  // });

  const [inputSearch, setInputSearch] = useState('');
  const [details, setdetails] = useState(null);
  const [loading, setloading] = useState(false);
  const fetchdetails = async () => {
    try {
      setloading(true);
      const {data} = await axios.get(
        'https://registry.npmjs.org/-/v1/search?text=' + inputSearch,
      );
      setdetails(data.objects);
    } catch (error) {
      console.log('error');
    }
    setloading(false);
  };
  // useEffect(() => {
  //   fetchdetails();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [startsearch]);

  const renderaccordian = (item, index) => {
    // const position = Animated.subtract(index * CARD_HEIGHT, y);
    // const isDisappearing = -CARD_HEIGHT;
    // const isTop = 0;
    // const isBottom = height - CARD_HEIGHT;
    // const isAppearing = height;
    // const translateY = Animated.add(
    //   Animated.add(
    //     y,
    //     y.interpolate({
    //       inputRange: [0, 0.00001 + index * CARD_HEIGHT],
    //       outputRange: [0, -index * CARD_HEIGHT],
    //       // extrapolateRight: 'clamp',
    //     }),
    //   ),
    //   position.interpolate({
    //     inputRange: [isBottom, isAppearing],
    //     outputRange: [0, -CARD_HEIGHT / 4],
    //     extrapolate: 'clamp',
    //   }),
    // );
    // const scale = position.interpolate({
    //   inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    //   outputRange: [0.5, 1, 1, 0.5],
    //   // extrapolate: 'clamp',
    // });
    // const opacity = position.interpolate({
    //   inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    //   outputRange: [0.5, 1, 1, 0.5],
    // });
    return (
      // <Animated.View
      // key={index}
      // style={{
      // opacity,
      // transform: [{translateY}, {scale}],
      // }}
      // >
      <Accordion index={index} navigation={navigation} item={item} />
      // </Animated.View>
    );
  };

  return (
    <>
      {loading ? (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
          <LoadingAnimation />
        </View>
      ) : (
        <FlatList
          // {...{onScroll}}
          initialScrollIndex={0}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: getStatusBarHeight() + 5,
            marginTop: getStatusBarHeight(),
          }}
          ListEmptyComponent={
            <View
              style={{
                position: 'absolute',
                marginTop: wHeight / 2 - 50,
                width: '100%',
                alignItems: 'center',
              }}>
              <Icon
                name="cloud-search-outline"
                size={100}
                color={
                  PC === '#ffffff' || PC === '#F9F9F9'
                    ? SC === '#ffffff'
                      ? '#000'
                      : SC
                    : SC
                }
              />
            </View>
          }
          ListHeaderComponent={
            <View
              style={[
                styles.heading,
                {
                  backgroundColor: PC,
                  borderColor:
                    PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
                },
              ]}>
              <TextInput
                placeholderTextColor={TC === '#000' ? '#ADADAD' : 'gray'}
                style={[
                  styles.searchbox,
                  {
                    fontWeight: '500',
                    fontSize: 18,
                    backgroundColor: TC,
                    color: TC === '#000' ? '#fff' : '#000',
                  },
                ]}
                value={inputSearch}
                onChangeText={setInputSearch}
                onSubmitEditing={() => {
                  fetchdetails();
                }}
                placeholder="Search"
              />
            </View>
          }
          data={details}
          renderItem={({item, index}) => renderaccordian(item, index)}
          stickyHeaderIndices={[0]}
          keyExtractor={() => shortid.generate()}
          showsVerticalScrollIndicator={false}
          stickyHeaderHiddenOnScroll={true}
          // onEndReached={() => Vibration.vibrate(5)}
        />
      )}
    </>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Third.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(Third);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
  },
  searchbox: {
    fontFamily: 'Quicksand-Bold',
    width: '94%',
    paddingVertical: 6,
    paddingLeft: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
});
