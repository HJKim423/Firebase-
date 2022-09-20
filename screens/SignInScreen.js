import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SignButtons from '../components/SignButtons';
import SignForm from '../components/SignForm';
import {SignIn, SignUp} from '../lib/auth';
import {getUser} from '../lib/users';
import {useUserContext} from '../contexts/UserContext';

function SignInScreen({navigation, route}) {
  const {isSignUp} = route.params || {};
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState();
  const {setUser} = useUserContext();

  const createChangeTextHandler = name => value => {
    setForm({...form, [name]: value});
  };
  const onSubmit = async () => {
    Keyboard.dismiss();
    const {email, password, confirmPassword} = form;

    if (isSignUp && password !== confirmPassword) {
      Alert.alert('실패', '비밀번호가 일치놉');
      return;
    }

    setLoading(true);
    const info = {email, password};
    try {
      const {user} = isSignUp ? await SignUp(info) : await SignIn(info);
      const profile = await getUser(user.uid); // 여기가 안됨
      if (!profile) {
        navigation.navigate('Welcome', {uid: user.uid});
      } else {
        setUser(profile);
      }
    } catch (e) {
      const messages = {
        'auth/email-already-in-use': '이미 가입된 이메일 ',
        'auth/wrong-password': 'wrong pw',
        'auth/user-not-found': 'not foud',
        'auth/invalid-email': '유효하지않은 이메일주소',
      };
      const msg = messages[e.code] || `${isSignUp ? '가입' : '로그인'} 실패`;
      console.log(e.code);
      Alert.alert('실패', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
      <SafeAreaView style={styles.fullScreen}>
        <Text style={styles.text}>PublicGallery</Text>
        <View style={styles.form}>
          <SignForm
            isSignUp={isSignUp}
            onSubmit={onSubmit}
            form={form}
            createChangeTextHandler={createChangeTextHandler}
          />
          <SignButtons
            isSignUp={isSignUp}
            onSubmit={onSubmit}
            loading={loading}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  fullScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 64,
    width: '100%',
    paddingHorizontal: 16,
  },
});

export default SignInScreen;
