import React, {useState, useRef, cloneElement} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import SetupProfile from '../components/SetupProfile';

function WelcomeScreen() {
  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
      <View style={styles.block}>
        <Text style={styles.title}>화녕ㅇ합니다</Text>
        <Text style={styles.description}>프로필을 설정하세요</Text>
        <SetupProfile />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 48,
  },
  description: {
    marginTop: 16,
    fontSize: 21,
    color: '#757575',
  },
});

export default WelcomeScreen;
