import {useNavigation, useRoute} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  View,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {signOut} from '../lib/auth';
import {createUser} from '../lib/users';
import BorderedInput from './BorderedInput';
import CustomButton from './CustomButton';
import {useUserContext} from '../contexts/UserContext';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Avatar from './Avatar';

function SetupProfile() {
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation();
  const {setUser} = useUserContext();

  const {params} = useRoute();
  const {uid} = params || {};

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    let photoURL = null;

    if (response) {
      const asset = response.assets[0];
      const extension = asset.fileName.split('.').pop(); // 확장자 추출 jpg
      const reference = storage().ref(`/profile/${uid}.${extension}`);

      if (Platform.OS === 'android') {
        try {
          await reference.putString(asset.base64, 'base64', {
            contentType: asset.type,
          });
        } catch (error) {
          console.log(error);
        }
      }
      // photoURL = response ? await reference.getDownloadURL() : null;
      if (response) {
        try {
          photoURL = await reference.getDownloadURL();
        } catch (error) {
          console.log(error);
        }
      } else {
        photoURL = null;
      }
    }

    const user = {
      id: uid,
      displayName,
      photoURL,
    };
    createUser(user);
    setUser(user);
  };

  const onCancel = () => {
    signOut();
    navigation.goBack();
  };

  const onSelectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 512,
        maxHeight: 512,
        // android의 경우 uri에서 직접 파일을 읽는 과정에서 권한 오류가 발생 할 수 있기 때문에 설정
        includeBase64: Platform.OS === 'android',
      },
      res => {
        if (res.didCancel) {
          //취소했을 경우
          return;
        }
        setResponse(res);
      },
    );
  };

  return (
    <View style={styles.block}>
      <Pressable onPress={onSelectImage}>
        <Avatar source={response && {uri: response.photoURL}} size={128} />
      </Pressable>
      <View style={styles.form}>
        <BorderedInput
          placeholder="닉네임"
          value={displayName}
          onChangeText={setDisplayName}
          onSubmitEditing={onSubmit}
          returnKeyType="next"
        />
        {loading ? (
          <ActivityIndicator size={32} color="#6200ee" style={styles.spinner} />
        ) : (
          <View style={styles.buttons}>
            <CustomButton title="다음" onPress={onSubmit} hasMarginbottom />
            <CustomButton title="취소" onPress={onCancel} theme="secondary" />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    width: '100%',
  },

  form: {
    marginTop: 16,
    width: '100%',
  },
  buttons: {
    marginTop: 48,
  },
});

export default SetupProfile;
