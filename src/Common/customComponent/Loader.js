
import React from 'react';
import {ActivityIndicator, Dimensions, View} from 'react-native';

const Loader = () => {
  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: '#0005',
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 100,
        }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    </View>
  );
};
const {height, width} = Dimensions.get('window');
export default Loader;
