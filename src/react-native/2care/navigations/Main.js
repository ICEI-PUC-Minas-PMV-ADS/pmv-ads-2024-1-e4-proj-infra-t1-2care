import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Home from '../screens/Main/Home';
import Search from '../screens/Main/Search';
import SendRequest from '../screens/Unsigned/SendRequest';
import Requests from '../screens/Unsigned/Requests';
import { useAuth } from '../contexts/AuthContext';
import UnsignedViews from './UnsignedViews';
import ProfileCarereceiverMob from '../screens/Unsigned/ProfileCarereceiverMob';
import ProfileCaregiverMob from '../screens/Unsigned/ProfileCaregiverMob';
import Reviews from '../screens/Unsigned/Reviews';
import AgendaMob from '../screens/Unsigned/AgendaMob';
import EditProfileScreenCareGiver from '../screens/Unsigned/EditProfileCareGiver';
import EditProfileScreenCareReceiver from '../screens/Unsigned/EditProfileCareReceiver';
import Login from '../screens/Unsigned/Login';

const Tab = createBottomTabNavigator();
const Stack1 = createNativeStackNavigator();
const Stack2 = createNativeStackNavigator();
const Stack3 = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack1.Navigator initialRouteName="Home">
      <Stack1.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          header: () => null,
        }}
      />
    </Stack1.Navigator>
  );
};

const RequestStack = () => {
  return (
    <Stack2.Navigator initialRouteName="Requests">
      <Stack2.Screen
        name="Requests"
        component={Requests}
        options={{
          headerShown: false,
          header: () => null,
        }}
      />
      <Stack2.Screen
        name="SendRequest"
        component={SendRequest}
        options={{
          header: () => null,
        }}
      />
    </Stack2.Navigator>
  );
};

const ProfileStack = () => {
  const { user } = useAuth();
  return (
    <Stack3.Navigator initialRouteName="Profile">
      {user?.user_type === 'CareReceiver' ? (
        <Stack3.Screen
          name="Profile"
          component={ProfileCarereceiverMob}
          options={{
            headerShown: false,
            header: () => null,
          }}
        />
      ) : (
        <Stack3.Screen
          name="Profile"
          component={ProfileCaregiverMob}
          options={{
            headerShown: false,
            header: () => null,
          }}
        />
      )}
    
    <Stack3.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            header: () => null,
          }}
        />

      <Stack3.Screen
        name="Reviews"
        component={Reviews}
        options={{
          headerShown: false,
          header: () => null,
        }}
      />
      <Stack3.Screen
        name="AgendaMob"
        component={AgendaMob}
        options={{
          headerShown: false,
          header: () => null,
        }}
      />
      <Stack3.Screen
        name="EditProfileScreenCareGiver"
        component={EditProfileScreenCareGiver}
        options={{
          headerShown: false,
          header: () => null,
        }}
      />
      <Stack3.Screen
        name="SendRequest"
        component={SendRequest}
        options={{
          headerShown: false,
          header: () => null,
        }}
      />
      <Stack3.Screen
        name="EditProfileScreenCareReceiver"
        component={EditProfileScreenCareReceiver}
        options={{
          headerShown: false,
          header: () => null,
        }}
      />

    </Stack3.Navigator>
  );
};

const Main = () => {
  const { user } = useAuth();

  if (!user) {
    return <UnsignedViews />;
  }

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileCaregiverMob"
        component={ProfileCaregiverMob}
        options={{
           header: () => null,
            }}
            />
      <Tab.Screen
         name="ProfileCarereceiverMob"
         component={ProfileCarereceiverMob}
         options={{
           header: () => null,
            }}
            />       
    </Tab.Navigator>
  );
};

export default Main;
