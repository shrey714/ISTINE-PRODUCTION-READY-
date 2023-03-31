import React, {useEffect} from 'react';
import {Text} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

const Sample = () => {
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({fade: true});
      console.log('Bootsplash has been hidden successfully');
    });
  }, []);

  return <Text>My awesome app</Text>;
};

export default Sample;
