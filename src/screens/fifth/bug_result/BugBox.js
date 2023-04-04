import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {Divider, Heading, Flex} from 'native-base';

const BugBox = ({
  bug,
  colorlist,
  visiblefunction,
  imageDatafunction,
  indexsetfunction,
}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;
  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);
  const [expanded, setexpanded] = useState(false);
  const toggleExpand = () => {
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
      <View
        style={[
          {
            backgroundColor: TC,
          },
          styles.firstbox,
        ]}>
        <Heading
          fontSize={'md'}
          numberOfLines={1}
          isTruncated
          fontWeight="normal"
          style={[styles.firsttext, {color: TC === SC ? '#000' : SC}]}>
          {bug?.bugtype}
        </Heading>
      </View>
      <View
        style={{
          width: '100%',
          marginTop: 12,
          borderBottomWidth: 0.2,
          borderBottomColor:
            PC === '#000' || PC === '#1F1B24'
              ? 'rgba(255,255,255,0.8)'
              : 'rgba(0,0,0,0.7)',
          borderTopWidth: 0.2,
          borderTopColor:
            PC === '#000' || PC === '#1F1B24'
              ? 'rgba(255,255,255,0.8)'
              : 'rgba(0,0,0,0.7)',
        }}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 5,
            paddingVertical: 8,
          }}>
          {bug?.images?.map((e, index) => (
            <TouchableOpacity
              key={index}
              onPress={async () => {
                await indexsetfunction(index);
                // await imageDatafunction(
                //   bug?.images?.map(link => ({
                //     props: {
                //       source: {
                //         uri: link,
                //       },
                //     },
                //     freeHeight: true,
                //     height: 300,
                //     width: 300,
                //   })),
                // );
                await imageDatafunction(
                  bug?.images?.map(link => ({
                    uri: link,
                  })),
                );
                visiblefunction(true);
              }}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  marginHorizontal: 5,
                  borderRadius: 10,
                  backgroundColor: TC,
                }}
                source={{
                  uri: e,
                }}
                alt="Alternate Text"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <Flex
        mx="3"
        direction="row"
        justify="space-evenly"
        alignItems="center"
        style={{marginTop: 8}}
        minH="10">
        <View style={styles.secondbox}>
          <Heading
            fontWeight="normal"
            style={[
              styles.secondtext,
              {
                color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
              },
            ]}>
            {bug?.desc}
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
              {
                color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
              },
            ]}>
            {bug?.response}
          </Text>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

BugBox.prototype = {
  colorlist: propTypes.object.isRequired,
};
export default connect(mapStateToProps)(BugBox);

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
