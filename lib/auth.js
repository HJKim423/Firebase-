import auth from '@react-native-firebase/auth';

export function SignIn({email, password}) {
  return auth().signInWithEmailAndPassword(email, password);
}

export function SignUp({email, password}) {
  return auth().createUserWithEmailAndPassword(email, password);
}

export function subscribeAuth(callback) {
  return auth().onAuthStateChanged(callback);
}

export function signOut() {
  return auth().signOut();
}
