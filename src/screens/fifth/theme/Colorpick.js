import React, {useState, useEffect} from 'react';
import {
  View,
  Modal,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {ColorPicker} from 'react-native-btr';
import {connect} from 'react-redux';
import setPST from '../../../action/color';
import propTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
const {width, height} = Dimensions.get('screen');
function ColorPickerDemo({type, setPST, colorlist, ColorTheme}) {
  let PC = colorlist.colours.Primarycolor;
  let SC = colorlist.colours.Secondarycolor;
  let TC = colorlist.colours.Ternarycolor;
  const [btnback, setbtnback] = useState();
  const [selectedColor, setSelectedColor] = useState('');
  const [loading, setloading] = useState(false);
  function setColor(color) {
    setSelectedColor(color);
  }

  useEffect(() => {
    const setbtnbackground = () => {
      if (type === 'Primary') {
        setbtnback(PC);
      } else if (type === 'Secondary') {
        setbtnback(SC);
      } else if (type === 'Ternary') {
        setbtnback(TC);
      }
    };
    setbtnbackground();
  }, [PC, SC, TC, type]);

  const letsadd = async () => {
    setloading(true);
    setTimeout(async () => {
      if (type === 'Primary') {
        await setPST({
          Primarycolor: selectedColor,
          Secondarycolor: SC,
          Ternarycolor: TC,
        });
        // await setbtnbackground();
      } else if (type === 'Secondary') {
        await setPST({
          Primarycolor: PC,
          Secondarycolor: selectedColor,
          Ternarycolor: TC,
        });
      } else if (type === 'Ternary') {
        await setPST({
          Primarycolor: PC,
          Secondarycolor: SC,
          Ternarycolor: selectedColor,
        });
      }
      setTimeout(() => {
        setloading(false);
      }, 400);
    }, 400);
  };
  // ============
  const Waitmodal = () => {
    return (
      <>
        <Modal
          animationType="fade"
          transparent={true}
          statusBarTranslucent={true}
          hardwareAccelerated={true}
          visible={loading}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.4)',
            }}>
            <Text style={{fontSize: 25, fontWeight: 'bold', color: '#ADADAD'}}>
              Wait....
            </Text>
          </View>
        </Modal>
      </>
    );
  };
  // ============
  return (
    <View style={[styles.container]}>
      <Waitmodal />
      <View
        style={[
          styles.wrapper,
          {
            backgroundColor:
              PC === '#000' || PC === '#1F1B24'
                ? 'rgba(255,255,255,0.4)'
                : 'rgba(0,0,0,0.4)',
          },
        ]}>
        <ColorPicker
          colors={ColorTheme}
          selectedColor={selectedColor}
          onSelect={setColor}
        />
      </View>
      <TouchableOpacity
        style={[
          styles.setbox,
          {
            backgroundColor: btnback,
            borderColor:
              PC === '#000' || PC === '#1F1B24'
                ? 'rgba(255,255,255,0.4)'
                : 'rgba(0,0,0,0.4)',
          },
        ]}
        onPress={() => {
          if (selectedColor !== '') {
            letsadd();
          }
        }}>
        <Icon
          name="circle-o"
          size={30}
          color={type === 'Secondary' ? '#000' : SC}
        />
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = state => ({
  colorlist: state.colorreducer,
});

const mapDispatchToProps = {
  setPST: data => setPST(data),
};
ColorPickerDemo.propTypes = {
  setPST: propTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ColorPickerDemo);

const styles = StyleSheet.create({
  container: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  wrapper: {
    paddingHorizontal: 5,
    borderRadius: 8,
    overflow: 'hidden',
    width: width - 80,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  setbox: {
    elevation: 5,
    width: 55,
    height: 55,
    borderRadius: 8,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
