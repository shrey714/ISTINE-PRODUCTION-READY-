/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Image,
} from 'react-native';
import getpackages from '../../action/package';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoadingAnimation from '../../components/LoadingAnimation';
import * as Animatable from 'react-native-animatable';
import propTypes from 'prop-types';
import TRALOGO from '../../assets/images/TRALOGO.png';
import {connect} from 'react-redux';
import database from '@react-native-firebase/database';

const Chatpackage = ({colorlist, packageState, navigation}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;
  const [Data, setData] = useState(0);
  useEffect(() => {
    getData();
    getpackages();
  }, []);
  const getData = () => {
    database()
      .ref('/counter/')
      .on('value', async snapshot => {
        setData(snapshot.val());
      });
  };
  const Counter = ({count}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 0.6,
          borderRadius: 3,
          marginLeft: 12,
          paddingHorizontal: 5,
          borderColor: TC === '#000' ? '#fff' : '#000',
          alignItems: 'center',
        }}>
        <Icon name="user" size={14} color={TC === '#000' ? '#fff' : '#000'} />
        <Text
          style={{
            marginLeft: 5,
            fontFamily: 'Quicksand-Bold',
            color: TC === '#000' ? '#fff' : '#000',
            fontSize: 14,
          }}>
          {Data[count]}
        </Text>
      </View>
    );
  };

  if (packageState.loading) {
    return <LoadingAnimation />;
  }

  return (
    <>
      {/* <SafeAreaView style={[styles.container]}> */}
      {packageState.packages.length === 0 ? (
        <View style={(styles.container, styles.flexbox)}>
          <Icon
            name="dropbox"
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
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentcontainer}>
          {[
            ...new Map(
              packageState.packages.map(item => [item['packagename'], item]),
            ).values(),
          ].map((item, index) => (
            <Animatable.View
              animation="fadeIn"
              duration={400}
              key={item.id}
              useNativeDriver={true}>
              <TouchableOpacity
                style={[
                  styles.settings,
                  {
                    borderWidth: PC === '#000' || PC === '#1F1B24' ? 1 : 0,
                    borderColor: 'rgba(255,255,255,0.6)',
                    backgroundColor: TC,
                  },
                ]}
                onPress={() => {
                  navigation.navigate('Chatscreen', {
                    packagename: item.packagename,
                  });
                }}>
                <Image source={TRALOGO} style={styles.image} />
                <Text
                  numberOfLines={1}
                  style={{
                    maxWidth: '70%',
                    fontFamily: 'Quicksand-Bold',
                    color: TC === '#000' ? '#fff' : '#000',
                    fontSize: 19,
                  }}>
                  {item.packagename}
                </Text>
                <Counter count={item.packagename} />
              </TouchableOpacity>
            </Animatable.View>
          ))}
        </ScrollView>
      )}
      {/* </SafeAreaView> */}
    </>
  );
};

const mapStateToProps = state => ({
  packageState: state.addpackage,
  colorlist: state.colorreducer.colours,
});

Chatpackage.prototype = {
  getpackages: propTypes.func.isRequired,
  packageState: propTypes.object.isRequired,
  colorlist: propTypes.object.isRequired,
};
const mapDispatchToProps = {
  getpackages,
};
export default connect(mapStateToProps, mapDispatchToProps)(Chatpackage);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexbox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentcontainer: {
    display: 'flex',
    flexGrow: 1,
    paddingBottom: 10,
    flexDirection: 'column',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 40,
  },
  settings: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 22,
    paddingRight: 100,
    elevation: 2,
    overflow: 'hidden',
    borderRadius: 4,
    marginTop: 10,
    // justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    position: 'absolute',
    alignSelf: 'center',
    right: 0,
    opacity: 1,
  },
});
