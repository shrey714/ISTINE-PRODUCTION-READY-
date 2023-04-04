/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import LoadingAnimation from '../../../components/LoadingAnimation';
import database from '@react-native-firebase/database';
import {firebase} from '@react-native-firebase/auth';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import BugBox from './BugBox';
// import ImageViewer from 'react-native-image-zoom-viewer';
import ImageView from 'react-native-image-viewing';
const Sett4 = ({colorlist}) => {
  const [imageData, setimageData] = useState([]);
  const [visible, setvisible] = useState(false);
  const [imageindex, setimageindex] = useState(0);
  // =================
  const [BugData, setBugData] = useState(null);
  const [loading, setloading] = useState(true);
  // ==============
  const getresults = async () => {
    setloading(true);
    try {
      database()
        .ref(`/helps/${firebase.auth()._user.uid}`)
        .on('value', snapshot => {
          setBugData(Object.values(snapshot.val()));
          setloading(false);
        });
    } catch (error) {
      console.log(error);
      setloading(false);
    }
  };
  // ===============
  useEffect(() => {
    getresults();
  }, []);

  return (
    <>
      {loading && BugData ? (
        <View
          style={{
            backgroundColor: '#ADADAD',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <LoadingAnimation />
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentcontainer}>
            {BugData?.map((bug, i) => (
              <BugBox
                key={i}
                bug={bug}
                visiblefunction={setvisible}
                imageDatafunction={setimageData}
                indexsetfunction={setimageindex}
              />
            ))}
          </ScrollView>
          <ImageView
            imageIndex={imageindex}
            visible={visible}
            onRequestClose={() => setvisible(false)}
            swipeToCloseEnabled={true}
            backgroundColor={'rgba(0,0,0,0.8)'}
            images={imageData}
          />
        </>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Sett4.prototype = {
  colorlist: propTypes.object.isRequired,
};
export default connect(mapStateToProps)(Sett4);

const styles = StyleSheet.create({
  box: {
    width: '95.23%',
    minHeight: 110,
    borderRadius: 5,
    borderWidth: 1.4,
    alignSelf: 'center',
    marginTop: 5,
    padding: 8,
  },
  contentcontainer: {
    display: 'flex',
    paddingBottom: 10,
    flexDirection: 'column',
  },
  firstbox: {
    width: '100%',
    minHeight: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  firsttext: {
    fontFamily: 'Quicksand-Bold',
  },
  secondmainbox: {
    height: 54,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  secondbox: {
    flex: 1,
    justifyContent: 'center',
  },
  secondtext: {
    fontSize: 18,
    fontFamily: 'Quicksand-Bold',
  },
  expandbox: {
    marginTop: 8,
    width: '100%',
    borderTopWidth: 0.8,
    paddingTop: 8,
  },
  expandtext: {
    fontSize: 17,
    fontFamily: 'Quicksand-Medium',
  },
});
