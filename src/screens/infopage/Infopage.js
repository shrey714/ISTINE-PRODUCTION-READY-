/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import BottomSheet from '../../components/BottomSheet';
import axios from 'axios';
import LoadingAnimation from '../../components/LoadingAnimation';
import NPMscreen from '../detailscreen/NPMscreen';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

const Infopage = ({route, navigation, colorlist}) => {
  // let PC = colorlist.Primarycolor;
  // let SC = colorlist.Secondarycolor;
  // let TC = colorlist.Ternarycolor;
  const {packagename, packageversion} = route.params;
  const [details, setdetails] = useState(null);
  const [readme, setreadme] = useState(null);
  const [loading, setloading] = useState(false);
  const [maindata, setmaindata] = useState(null);
  const [bool, setbool] = useState(false);

  const fetchdetails = async () => {
    try {
      setloading(true);
      const {data} = await axios.get(
        'https://registry.npmjs.org/' + packagename,
      );
      const loaddata = await data.versions;
      setreadme(await data?.readme);
      setmaindata(await loaddata[packageversion]);
      setdetails(await loaddata);
      setbool(true);
      setloading(false);
    } catch (error) {
      console.log('error');
    }
  };

  useEffect(() => {
    fetchdetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packagename]);

  useEffect(() => {
    navigation.setOptions({
      title: packagename + '(' + packageversion + ')',
    });
    if (bool) {
      async function wait() {
        setloading(true);
        setmaindata(await details[packageversion]);
        setloading(false);
      }
      wait();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packageversion]);
  return details && maindata && !loading ? (
    <>
      <NPMscreen
        detailsdata={maindata}
        navigation={navigation}
        readme={readme}
      />
      <BottomSheet
        packagename={packagename}
        navigation={navigation}
        package={details}
      />
    </>
  ) : (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <LoadingAnimation />
    </View>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Infopage.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(Infopage);
