import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Homepage from '../screens/Unsigned/Login';

import Home from '../screens/Main/Home';
import Search from '../screens/Main/Search';
import Profile from '../screens/Main/Profile';

import SendRequest from '../screens/Unsigned/SendRequest';
import RequestsCaregiver from '../screens/Unsigned/RequestsCaregiver';
import RequestsCareReceiver from '../screens/Unsigned/RequestsCareReceiver';

const Tab = createBottomTabNavigator();
const Stack1 = createNativeStackNavigator();
const Stack2 = createNativeStackNavigator();
const Stack3 = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack1.Navigator initialRouteName="Login">
      <Stack1.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          header: () => null,
        }}
      />
      {/* <Stack1.Screen
              name="Login"
              component={Homepage}
              options={{
                  header: () => null,
              }}
          /> */}
    </Stack1.Navigator>
  );
};

const RequestStack = () => {
  return (
    <Stack2.Navigator initialRouteName="RequestsCaregiver">
      <Stack2.Screen
        name="RequestsCaregiver"
        component={RequestsCaregiver}
        options={{
          headerShown: false,
          header: () => null,
        }}
      />
      <Stack2.Screen
        name="RequestsCareReceiver"
        component={RequestsCareReceiver}
        options={{
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

const SearchStack = () => {
  return (
    <Stack3.Navigator initialRouteName="Search">
      <Stack3.Screen
        name="Search"
        component={Search}
        options={{
          header: () => null,
        }}
      />
    </Stack3.Navigator>
  );
};

const MainNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: '#799275',
        tabBarActiveTintColor: '#ED8733',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'início',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Requests"
        component={RequestStack}
        options={{
          tabBarLabel: 'Propostas',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="mail-outline" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          tabBarLabel: 'Buscar',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileCareGiver"
        component={ProfileCareGiver}
        options={{
           header: () => null,
            }}
            />
      <Tab.Screen
         name="ProfileCareReceiver"
         component={ProfileCareReceiver}
         options={{
           header: () => null,
            }}
            />       
    </Tab.Navigator>
  );
}


export default MainNav;