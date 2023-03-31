/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState, useEffect, useRef, useMemo} from 'react';
import {StyleSheet, Dimensions, TouchableOpacity, Text} from 'react-native';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

const screenwidth = Dimensions.get('screen').width;
const BottomSheett = props => {
  let PC = props.colorlist.Primarycolor;
  let SC = props.colorlist.Secondarycolor;
  // let TC = props.colorlist.Ternarycolor;

  const sheetRef = useRef();
  const [packagedata, setpackagedata] = useState('');

  useEffect(() => {
    const loaddata = async () => {
      setpackagedata(await props.package);
    };
    loaddata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const data = useMemo(() => Object.keys(packagedata).reverse(), [packagedata]);
  const snapPoints = useMemo(() => [24, '90%'], []);

  const renderItem = useCallback(
    ({item}) => (
      <TouchableOpacity
        onPress={async () => {
          props.navigation.navigate({
            name: 'Infopage',
            params: {
              packagename: props.packagename,
              packageversion: item,
            },
            merge: true,
          });
          sheetRef.current?.snapToIndex(0);
        }}
        // key={shortid.generate()}
        style={[
          styles.box,
          {
            borderBottomColor:
              PC === '#000' || PC === '#1f1b24' ? '#a3a3a3' : '#000',
          },
        ]}>
        <Text
          numberOfLines={1}
          style={[
            styles.text,
            {color: PC === '#000' || PC === '#1f1b24' ? '#fff' : '#000'},
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <BottomSheet
      BottomSheetBackdrop={true}
      ref={sheetRef}
      backgroundStyle={{
        backgroundColor: PC,
        borderTopWidth: 1,
        borderEndWidth: 1,
        borderStartWidth: 1,
        borderColor: PC === '#000' || PC === '#1f1b24' ? '#a3a3a3' : '#000',
      }}
      handleIndicatorStyle={{backgroundColor: SC, width: 40}}
      snapPoints={snapPoints}>
      <BottomSheetFlatList
        data={data}
        keyExtractor={i => i}
        renderItem={renderItem}
        contentContainerStyle={[styles.contentContainer]}
      />
    </BottomSheet>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

BottomSheett.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(BottomSheett);

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 10,
  },
  box: {
    width: screenwidth / 1.05,
    minHeight: 30,
    borderBottomWidth: 0.5,
    alignSelf: 'center',
    marginTop: 5,
    padding: 8,
  },
  text: {
    fontSize: 24,
    fontFamily: 'Quicksand-Bold',
  },
});
