import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
const TabBarIcon = (focused, color, size, tabname) => {
  let iconName;
  if (focused) {
    size = size + 8;
  }
  if (tabname === 'First') {
    iconName = 'home';
  } else if (tabname === 'Second') {
    iconName = 'question';
  } else if (tabname === 'Third') {
    iconName = 'search';
  } else if (tabname === 'Forth') {
    iconName = 'star';
  } else if (tabname === 'Fifth') {
    iconName = 'gear';
  }
  return (
    <View style={styles.buttonarea}>
      <Icon name={iconName} size={size} color={color} />
    </View>
  );
};

export default TabBarIcon;
TabBarIcon;
const styles = StyleSheet.create({
  buttonarea: {
    backgroundColor: '#000',
    width: 45,
    height: 45,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 0,
    // shadowRadius: 0,
    elevation: 2,
  },
});
