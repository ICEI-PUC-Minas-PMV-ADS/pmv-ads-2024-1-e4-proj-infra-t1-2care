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
const stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <stack.Navigator initialRouteName="Login">
      <stack.Screen
        name="Home"
        component={Home}
        options={{
          header: () => null,
        }}
      />
      {/* <stack.Screen
              name="Login"
              component={Homepage}
              options={{
                  header: () => null,
              }}
          /> */}
    </stack.Navigator>
  );
};

const RequestStack = () => {
  return (
    <stack.Navigator initialRouteName="RequestsCaregiver">
      <stack.Screen
        name="RequestsCaregiver"
        component={RequestsCaregiver}
        options={{
          header: () => null,
        }}
      />
      <stack.Screen
        name="RequestsCareReceiver"
        component={RequestsCareReceiver}
        options={{
          header: () => null,
        }}
      />
      <stack.Screen
        name="SendRequest"
        component={SendRequest}
        options={{
          header: () => null,
        }}
      />
    </stack.Navigator>
  )
}

const MainNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarInactiveTintColor: '#799275',
        tabBarActiveTintColor: '#ED8733',
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: 'início',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Propostas"
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
        name="Buscar"
        component={Search}
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
    </Tab.Navigator>
  );
}


export default MainNav;