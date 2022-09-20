import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  useWindowDimensions,
  Animated,
  Keyboard,
  Platform,
} from 'react-native';
import IconRightButton from '../components/IconRightButton';
import storage from '@react-native-firebase/storage';
import {useUserContext} from '../contexts/UserContext';
import {v4} from 'uuid';
import {createPost} from '../lib/posts';

function UploadScreen() {
  const route = useRoute();
  const {res} = route.params || {};
  const {width} = useWindowDimensions();
  const animation = useRef(new Animated.Value(width)).current;
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const navigation = useNavigation();
  const {user} = useUserContext();
  const [description, setDescription] = useState('');

  const onSubmit = useCallback(async () => {
    navigation.pop();
    const asset = res.assets[0];
    const extension = asset.fileName.split('.').pop();
    const reference = storage().ref(`/photo/${user.id}/${v4()}.${extension}`);
    // await reference.putString(asset.base64, 'base64', {
    //   contentType: asset.type,
    // });
    try {
      await reference.putFile(asset.uri);
    } catch (error) {
      console.log(error);
    }

    let photoURL = null;
    try {
      photoURL = await reference.getDownloadURL();
    } catch (error) {
      console.log(error);
    }

    try {
      await createPost({description, photoURL, user});
    } catch (error) {
      console.log(error);
    }
  }, [res, user, description, navigation]);

  useEffect(() => {
    const didShow = Keyboard.addListener('keyboardDidShow', () =>
      setIsKeyboardOpen(true),
    );
    const didHide = Keyboard.addListener('keyboardDidHide', () =>
      setIsKeyboardOpen(false),
    );

    return () => {
      didShow.remove();
      didHide.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isKeyboardOpen ? 0 : width,
      useNativeDriver: false,
      duration: 150,
      delay: 100,
    }).start();
  }, [isKeyboardOpen, width, animation]);

  //header 옵션 설정 (작성완료 버튼)
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconRightButton onPress={onSubmit} name="send" />,
    });
  }, [navigation, onSubmit]);

  return (
    <View style={styles.block}>
      <Animated.Image
        source={{uri: res?.assets[0]?.uri}}
        style={[styles.image, {height: animation}]}
        resizeMode="cover"
      />
      <TextInput
        style={styles.input}
        multiline={true}
        placeholder="이사진은?"
        textAlignVertical="top"
        value={description}
        onChangeText={setDescription}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  image: {width: '100%', height: '30%'},
  input: {
    paddingTop: 16,
    paddingHorizontal: 16,
    flex: 1,
  },
});

export default UploadScreen;
