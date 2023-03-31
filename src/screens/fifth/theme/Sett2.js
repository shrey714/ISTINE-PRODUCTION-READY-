import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Colorpick from './Colorpick';
import ColorTheme from './ColorThemes';
const Sett2 = () => {
  return (
    <>
      <ScrollView contentContainerStyle={[styles.container]}>
        <Colorpick ColorTheme={ColorTheme.colour1} type={'Primary'} />
        <Colorpick ColorTheme={ColorTheme.colour2} type={'Secondary'} />
        <Colorpick ColorTheme={ColorTheme.colour3} type={'Ternary'} />
      </ScrollView>
    </>
  );
};

export default Sett2;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'green',
    paddingBottom: 5,
    flexGrow: 1,
  },
});
