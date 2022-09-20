import firestore from '@react-native-firebase/firestore';

const postsCollection = firestore().collection('posts');

export function createPost({user, photoURL, description}) {
  return postsCollection.add({
    user,
    photoURL,
    description,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
}

export const PAGE_SIZE = 12;

export async function getPosts(userId) {
  let query = postsCollection.orderBy('creatdAt', 'desc').limit(PAGE_SIZE);
  if (userId) {
    query = query.where('user.id', '==', userId);
  }
  const snapshot = await query.get();
  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  return posts;
}

export async function getOlderPosts(id, userId) {
  const cursorDoc = await postsCollection.doc(id).get();
  let query = postsCollection
    .orderBy('creatdAt', 'desc')
    .startAfter(cursorDoc)
    .limit(PAGE_SIZE);
  if (userId) {
    query = query.where('user.id', '==', userId);
  }
  const snapshot = await query.get();
  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  return posts;
}

export async function getNewerPosts(id, userId) {
  const cursorDoc = await postsCollection.doc(id).get();
  let query = postsCollection
    .orderBy('creatdAt', 'desc')
    .endBefore(cursorDoc)
    .limit(PAGE_SIZE);
  if (userId) {
    query = query.where('user.id', '==', userId);
  }
  const snapshot = await query.get();

  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  return posts;
}

// 포스트 삭제
export function removePost(id) {
  return postsCollection.doc(id).delete();
}

// 포스트 수정
export function updatePost({id, description}) {
  return postsCollection.doc(id).update({
    description,
  });
}
