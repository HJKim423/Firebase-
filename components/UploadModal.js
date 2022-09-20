import React from 'react';
import {StyleSheet, Modal, View, Pressable, Text} from 'react-native';

function UploadModal({visible, onClose, onLaunchCamera, onLaunchImageLibrary}) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable style={styles.background} onPress={onClose}>
        <View style={styles.whitebox}>
          <Pressable
            style={styles.actionButton}
            onPress={() => {
              onLaunchCamera();
              onClose();
            }}>
            <Text>카메라로 촬영하기</Text>
          </Pressable>
          <Pressable
            style={styles.actionButton}
            onPress={() => {
              onLaunchImageLibrary();
              onClose();
            }}>
            <Text>사진 선택하기</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whitebox: {
    width: 300,
    backgroundColor: 'white',
  },
  actionButton: {
    padding: 16,
  },
});

export default UploadModal;
