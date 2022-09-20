import React from 'react';
import {Image} from 'react-native';

function Avatar({source, size, style}) {
  return (
    <Image
      source={source || require('../assets/user.png')}
      resizeMode="cover"
    />
  );
}

Avatar.defaultProps = {
  size: 32,
};

export default Avatar;
