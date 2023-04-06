/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';
import database from '@react-native-firebase/database';
import * as Animatable from 'react-native-animatable';
import shortid from 'shortid';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {firebase} from '@react-native-firebase/auth';
import Share from 'react-native-share';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const Addtofavbtn = ({
  packagename,
  packageState,
  link,
  colorlist,
  packageversion,
  pdfshareuri,
}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  // let TC = colorlist.Ternarycolor;
  const [Disable, setDisable] = useState(false);
  useEffect(() => {
    for (let i = 0; i < packageState.packages.length; i++) {
      if (
        packageState.packages[i].packagename === packagename &&
        packageState.packages[i].packageversion === packageversion
      ) {
        setDisable(true);
        break;
      } else {
        setDisable(false);
      }
    }
  }, [packagename, packageversion, packageState]);
  const onPDFShare = async () => {
    const options = {
      url: `file://${await pdfshareuri()}`,
      failOnCancel: false,
      showAppsToView: true,
    };
    Share.open(options).catch(err => {
      err && console.log(err);
      Snackbar.show({
        text: 'Failed to share',
        textColor:
          PC === '#000' || PC === '#1F1B24' || PC === '#949398'
            ? '#fff'
            : '#000',
        backgroundColor:
          PC === '#000' || PC === '#1F1B24' || PC === '#949398'
            ? '#000'
            : '#fff',
      });
    });
  };
  const onShare = async () => {
    Share.open({
      message: `ISTINE
${packagename}(${packageversion})

${link}
`,
      failOnCancel: false,
    }).catch(err => {
      err && console.log(err);
      Snackbar.show({
        text: 'Failed to share',
        textColor:
          PC === '#000' || PC === '#1F1B24' || PC === '#949398'
            ? '#fff'
            : '#000',
        backgroundColor:
          PC === '#000' || PC === '#1F1B24' || PC === '#949398'
            ? '#000'
            : '#fff',
      });
    });
  };
  const addpackage = async () => {
    try {
      const uidp = shortid.generate();
      let maile = await firebase.auth()._user.uid;
      await database()
        .ref(`/packages/${maile}/${uidp}`)
        .set({
          packagename,
          packageversion,
          id: uidp,
        })
        .then(async onfulfilled => {
          const dref = database().ref(`/counter/${packagename}`);
          dref.once('value', async snapshot => {
            if (snapshot.exists()) {
              let currentvalue = await snapshot.val();
              await database()
                .ref(`/counter/${packagename}`)
                .set(currentvalue + 1);
            } else {
              await database().ref(`/counter/${packagename}`).set(1);
            }
          });
        });
      Snackbar.show({
        text: 'Package added to favourite',
        textColor:
          PC === '#000' || PC === '#1F1B24' || PC === '#949398'
            ? '#fff'
            : '#000',
        backgroundColor:
          PC === '#000' || PC === '#1F1B24' || PC === '#949398'
            ? '#000'
            : '#fff',
      });
    } catch (error) {
      console.log(error);
      Snackbar.show({
        text: 'Package added to favourite failed',
        textColor:
          PC === '#000' || PC === '#1F1B24' || PC === '#949398'
            ? '#fff'
            : '#000',
        backgroundColor:
          PC === '#000' || PC === '#1F1B24' || PC === '#949398FF'
            ? '#000'
            : '#fff',
      });
    }
  };
  const Separator = () => (
    <View
      style={[
        {
          marginVertical: 10,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor:
            PC === '#000' || PC === '#1F1B24' ? '#fff' : '#737373',
        },
      ]}
    />
  );
  return (
    <Menu>
      <MenuTrigger
        children={
          <Animatable.View
            animation="fadeIn"
            duration={400}
            style={styles.buttonarea}
            useNativeDriver={true}>
            <Icon name="bars" size={23} color={SC} />
          </Animatable.View>
        }
      />
      <MenuOptions
        customStyles={{
          optionsWrapper: {
            backgroundColor: PC,
            padding: 10,
          },
        }}>
        <MenuOption
          disabled={Disable}
          customStyles={{
            optionWrapper: [
              Disable ? {opacity: 0.4} : {},
              {flexDirection: 'row'},
            ],
          }}
          onSelect={() => addpackage()}>
          <Icon style={{marginRight: 10}} name="flag-o" size={23} color={SC} />
          <Text
            style={{
              fontFamily: 'Quicksand-Bold',
              color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
            }}>
            Save
          </Text>
        </MenuOption>
        <Separator />
        <MenuOption
          customStyles={{
            optionWrapper: {
              flexDirection: 'row',
            },
          }}
          onSelect={onPDFShare}>
          <Icon
            style={{marginRight: 10}}
            name="file-pdf-o"
            size={23}
            color={SC}
          />
          <Text
            style={{
              fontFamily: 'Quicksand-Bold',
              color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
            }}>
            PDF Share
          </Text>
        </MenuOption>
        <Separator />
        <MenuOption
          customStyles={{
            optionWrapper: {
              flexDirection: 'row',
            },
          }}
          onSelect={onShare}>
          <Icon style={{marginRight: 10}} name="share" size={23} color={SC} />
          <Text
            style={{
              fontFamily: 'Quicksand-Bold',
              color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
            }}>
            Share
          </Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

const mapStateToProps = state => ({
  packageState: state.addpackage,
  colorlist: state.colorreducer.colours,
});

Addtofavbtn.prototype = {
  colorlist: propTypes.object.isRequired,
  packageState: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(Addtofavbtn);

const styles = StyleSheet.create({
  buttonarea: {
    marginRight: 8,
    backgroundColor: '#000',
    width: 40,
    height: 40,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
