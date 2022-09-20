import React from 'react';
import {StyleSheet, Modal, View, Pressable, Text} from 'react-native';

function IconRightButton({name, color, onPress}) {
  return (
    <View style={styles.block}>
      <Pressable
        style={({pressed}) => [
          styles.circle,
          pressed && {
            opacity: 0.3,
          },
        ]}
        onPress={onPress}>
        <Text>완료</Text>
      </Pressable>
    </View>
  );
}

IconRightButton.defaultProps = {
  color: '#6200ee',
};

const styles = StyleSheet.create({
  block: {
    marginRight: -8,
    borderRadius: 24,
    overflow: 'hidden',
  },
  circle: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'purple',
  },
});

export default IconRightButton;
