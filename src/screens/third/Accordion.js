import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
  TouchableOpacity,
} from 'react-native';
import {Divider, Heading, Flex} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

const Accordion = props => {
  let PC = props.colorlist.Primarycolor;
  let SC = props.colorlist.Secondarycolor;
  let TC = props.colorlist.Ternarycolor;

  const [expanded, setexpanded] = useState(false);
  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);
  const toggleExpand = () => {
    // Vibration.vibrate(5);
    if (expanded === false) {
      setexpanded(true);
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          100,
          LayoutAnimation.Types.easeInEaseOut,
          LayoutAnimation.Properties.opacity,
        ),
      );
    } else {
      setexpanded(false);
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          100,
          LayoutAnimation.Types.easeInEaseOut,
          LayoutAnimation.Properties.opacity,
        ),
      );
    }
  };

  return (
    <View
      style={[
        styles.box,
        {
          borderColor:
            PC === '#000' || PC === '#1F1B24'
              ? 'rgba(255,255,255,0.6)'
              : 'rgba(0,0,0,0.6)',
        },
      ]}>
      <TouchableOpacity
        style={[
          {
            backgroundColor: TC,
          },
          styles.firstbox,
        ]}
        onPress={() =>
          props.navigation.navigate('Infopage', {
            packagename: props.item.package.name,
            packageversion: props.item.package.version,
          })
        }>
        <Heading
          isTruncated
          fontWeight="normal"
          style={[styles.firsttext, {color: TC === SC ? '#000' : SC}]}>
          {props.item.package.name}
        </Heading>
      </TouchableOpacity>
      <Divider
        my="2"
        bg={
          PC === '#000' || PC === '#1F1B24'
            ? 'rgba(255,255,255,0.4)'
            : 'rgba(0,0,0,0.4)'
        }
      />
      <Flex
        mx="3"
        direction="row"
        justify="space-evenly"
        alignItems="center"
        h="60">
        <View style={styles.secondbox}>
          <Heading
            isTruncated
            fontWeight="normal"
            style={[
              styles.secondtext,
              {color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
            ]}>
            Latest Version : {props.item.package.version}
          </Heading>
          <Heading
            isTruncated
            fontWeight="normal"
            style={[
              styles.secondtext,
              {color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
            ]}>
            Released Date :{' '}
            {props.item.package.date
              .slice(0, 10)
              .split('-')
              .reverse()
              .join('-')}
          </Heading>
        </View>
        <Divider
          orientation="vertical"
          mx="3"
          bg={
            PC === '#000' || PC === '#1F1B24'
              ? 'rgba(255,255,255,0.4)'
              : 'rgba(0,0,0,0.4)'
          }
        />
        <Pressable onPress={() => toggleExpand()}>
          <Icon
            name={expanded ? 'arrow-circle-up' : 'arrow-circle-down'}
            size={30}
            color={
              PC === '#ffffff' || PC === '#F9F9F9'
                ? SC === '#ffffff'
                  ? '#000'
                  : SC
                : SC
            }
          />
        </Pressable>
      </Flex>
      {expanded && (
        <View
          style={[
            styles.expandbox,
            {
              borderTopColor:
                PC === '#000' || PC === '#1F1B24'
                  ? 'rgba(255,255,255,0.4)'
                  : 'rgba(0,0,0,0.4)',
            },
          ]}>
          <Text
            style={[
              styles.expandtext,
              {color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
            ]}>
            {props.item.package.description}
          </Text>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Accordion.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(Accordion);

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
  firstbox: {
    width: '100%',
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  firsttext: {
    fontSize: 28,
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
