import React from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';

function CustomButton({onPress, title, hasMarginBottom, theme}) {
  const isPrimary = theme === 'primary';
  return (
    <View
      style={[styles.block, styles.overflow, hasMarginBottom && styles.margin]}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          styles.wrapper,
          isPrimary && styles.primaryWrapper,
        ]}
        android_ripple={{
          color: '#ffffff',
        }}>
        <Text
          style={[
            styles.text,
            isPrimary ? styles.primaryText : styles.secondaryText,
          ]}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
}

CustomButton.defaultProps = {
  theme: 'primary',
};

const styles = StyleSheet.create({
  overflow: {borderRadius: 4, overflow: 'hidden'},
  wrapper: {
    borderRadius: 4,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryWrapper: {
    backgroundColor: '#6200ee',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: '#6200ee',
  },
  margin: {marginBottom: 8},
});

export default CustomButton;
