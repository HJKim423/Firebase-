import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import {getUser} from '../lib/users';
import Avatar from './Avatar';
import PostGridItem from './PostGridItem';
// import {getNewerPosts, getOlderPosts, getPosts, PAGE_SIZE} from '../lib/posts';
import usePosts from '../hooks/usePosts';

function Profile({userId}) {
  const [user, setUser] = useState(null);

  const {posts, noMorePost, refreshing, onLoadMore, onRefresh} =
    usePosts(userId);

  // const [posts, setPosts] = useState(null);

  // const [noMorePost, setNoMorePost] = useState(false);
  // const [refreshing, setRefreshing] = useState(false);

  // const onLoadMore = async () => {
  //   if (noMorePost || !posts || posts.length < PAGE_SIZE) {
  //     return;
  //   }

  //   const lastPost = posts[posts.length - 1];
  //   const olderPosts = await getOlderPosts(lastPost.id, userId);

  //   if (olderPosts.length < PAGE_SIZE) {
  //     setNoMorePost(true);
  //   }
  //   setPosts(posts.concat(olderPosts));
  // };

  // const onRefresh = async () => {
  //   if (!posts || posts.length === 0 || refreshing) {
  //     return;
  //   }
  //   const firestPost = posts[0];
  //   setRefreshing(true);
  //   const newerPosts = await getNewerPosts(firestPost.id, userId);
  //   setRefreshing(false);
  //   if (newerPosts.length === 0) {
  //     return;
  //   }
  //   setPosts(newerPosts.concat(posts));
  // };

  useEffect(() => {
    getUser(userId).then(setUser);
    // getPosts({userId}).then(setPosts);
  }, [userId]);

  if (!user || !posts) {
    return (
      <ActivityIndicator style={styles.spinner} size={32} color="#6200ee" />
    );
  }

  return (
    <FlatList
      style={styles.block}
      data={posts}
      renderItem={renderItem}
      numColumns={3}
      keyExtractor={item => item.id}
      ListHeaderComponent={
        <View style={styles.userInfo}>
          <Avatar source={user.photoURL && {uri: user.photoURL}} size={128} />
          <Text styles={styles.username}>{user.displayName}</Text>
        </View>
      }
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.25}
      ListFooterComponent={
        !noMorePost && (
          <ActivityIndicator
            style={styles.bottomSpinner}
            size={32}
            color="#6200ee"
          />
        )
      }
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    />
  );
}

const renderItem = ({item}) => <PostGridItem post={item} />;

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
  },
  block: {
    flex: 1,
  },
  userInfo: {
    paddingTop: 80,
    paddingBottom: 64,
    alignItems: 'center',
  },
  username: {
    matginTop: 8,
    fontSize: 24,
    color: '#424242',
  },
  bottomSpineer: {
    height: 128,
  },
});

export default Profile;
