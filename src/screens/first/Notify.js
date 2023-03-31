import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-7393727234144842/9919162282';

const Notify = () => {
  return (
    <View style={styles.adcontainer}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.BANNER}
        onAdFailedToLoad={error => {
          console.log(error);
        }}
      />
    </View>
  );
};

export default Notify;
const styles = StyleSheet.create({
  adcontainer: {
    position: 'absolute',
    bottom: 5,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
