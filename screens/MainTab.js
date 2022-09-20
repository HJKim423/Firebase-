import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
// import {Icon} from 'react-native-vector-icons/MaterialIcons';
import MyProfileStack from './MyProfileStack';
import CameraButton from '../components/CameraButton';

const Tab = createBottomTabNavigator();

function MainTab() {
  return (
    <>
      <View style={styles.block}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#6200ee',
          }}>
          <Tab.Screen
            name="HomeStack"
            component={HomeStack}
            options={
              {
                // tabBarIcon: ({color}) => (
                //   <Icon name="home" size={24} color={color} />
                // ),
              }
            }
          />
          <Tab.Screen
            name="MyProfileStack"
            component={MyProfileStack}
            // options={{
            //   tabBarIcon: ({color}) => (
            //     <Icon name="person" size={24} color={color} />
            //   ),
            // }}
          />
        </Tab.Navigator>
      </View>
      <CameraButton />
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    zIndex: 0,
  },
});

export default MainTab;
