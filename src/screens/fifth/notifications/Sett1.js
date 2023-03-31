import React, {useState} from 'react';
import {StyleSheet, Text, View, Switch} from 'react-native';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

const Sett1 = ({colorlist}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;
  const Notificationswitch = name => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
      <View style={styles.box}>
        <Text
          numberOfLines={1}
          style={[
            styles.text,
            {color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
          ]}>
          {name}
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#767577'}}
          thumbColor={isEnabled ? SC : TC}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    );
  };
  return (
    <>
      {Notificationswitch('Pause All')}
      {Notificationswitch('New Package Release')}
      {Notificationswitch('New App Update')}
    </>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Sett1.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(Sett1);

const styles = StyleSheet.create({
  box: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'Quicksand-Bold',
    fontSize: 16,
  },
});
