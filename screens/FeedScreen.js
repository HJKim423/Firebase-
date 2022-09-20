import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshContol,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import PostCard from '../components/PostCard';
import {getNewerPosts, getOlderPosts, getPosts, PAGE_SIZE} from '../lib/posts';
import usePosts from '../hooks/usePosts';

function FeedScreen() {
  // const [posts, setPosts] = useState(null);
  // // 마지막 포스트까지 조회했음을 명시하는 상태
  // const [noMorePost, setNoMorePost] = useState(false);
  // // refreshing 이 true 일때만 새로고침 표시
  // const [refreshing, setRefreshing] = useState(false);

  // useEffect(() => {
  //   // 컴포넌트가 처음 마운트될 때 포스트 목록을 조회한 후 'posts' 상태에 담기
  //   getPosts().then(setPosts);
  //   // 동일한 표현
  //   // getPosts().then(res => {
  //   //   setPosts(res);
  //   // });
  // }, []);

  // const onLoadMore = async () => {
  //   if (noMorePost || !posts || posts.length < PAGE_SIZE) {
  //     return;
  //   }
  //   const lastPost = posts[posts.length - 1];
  //   const olderPosts = await getOlderPosts(lastPost.id);
  //   if (olderPosts.length < PAGE_SIZE) {
  //     setNoMorePost(true);
  //   }
  //   setPosts(posts.concat(olderPosts));
  // };

  // const onRefresh = async () => {
  //   if (!posts || posts.length === 0 || refreshing) {
  //     return;
  //   }
  //   const firstPost = posts[0];
  //   setRefreshing(true);
  //   const newerPosts = await getNewerPosts(firstPost.id);
  //   setRefreshing(false);
  //   if (newerPosts.length === 0) {
  //     return;
  //   }
  //   setPosts(newerPosts.concat(posts));
  // };

  const {posts, noMorePost, refreshing, onLoadMore, onRefresh} = usePosts();

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.75} // 출발지(0) ~ 끝지점(1), 설정값에 도달 시 onEndReached 실행
      ListFooterComponent={
        // 모든 항목의 맨 아래 구현할 값
        !noMorePost && (
          <ActivityIndicator style={styles.spinner} size={32} color="6200ee" />
        )
      }
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
      }
    />
  );
}

const renderItem = ({item}) => (
  <PostCard
    createdAt={item.createdAt}
    description={item.description}
    id={item.id}
    user={item.user}
    photoURL={item.photoURL}
  />
);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 48,
  },
  spinner: {
    height: 64,
  },
});

export default FeedScreen;
