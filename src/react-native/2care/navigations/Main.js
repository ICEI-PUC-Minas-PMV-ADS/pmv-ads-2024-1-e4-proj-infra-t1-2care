import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Home from '../screens/Main/Home';
import Search from '../screens/Main/Search';
import SendRequest from '../screens/Main/SendRequest';
import Requests from '../screens/Main/Requests';
import { useAuth } from '../contexts/AuthContext';
// import UnsignedViews from './UnsignedViews';
import ProfileCarereceiverMob from '../screens/Unsigned/ProfileCarereceiverMob';
import ProfileCaregiverMob from '../screens/Unsigned/ProfileCaregiverMob';
import Reviews from '../screens/Unsigned/Reviews';
import AgendaMob from '../screens/Unsigned/AgendaMob';
import EditProfileScreenCareGiver from '../screens/Unsigned/EditProfileCareGiver';
import EditProfileScreenCareReceiver from '../screens/Unsigned/EditProfileCareReceiver';
import Login from '../screens/Unsigned/Login';
import ViewCaregiverInfo from '../screens/Main/ViewCaregiverInfo';

import Register from '../screens/Unsigned/Register';
import RegisterUsers from '../screens/Unsigned/RegisterUsers';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const UnsignedViews = ({ setVisitorMode }) => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        // component={Login}
        options={{
          header: () => null,
        }}
      >
        {(props) => <Login {...props} setVisitorMode={setVisitorMode} />}
      </Stack.Screen>
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="RegisterUsers"
        component={RegisterUsers}
        options={{
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Reviews"
        component={Reviews}
        options={{
          headerShown: false,
          header: () => null,
        }}
      />
    </Stack.Navigator>
  )
};

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          header: () => null,
        }}
      />
      <Stack.Screen
        name="ViewCaregiverInfo"
        component={ViewCaregiverInfo}
        options={{
          headerShown: false,
          header: () => null,
        }}
      />
      <Stack.Screen
        name="AgendaMob"
        component={AgendaMob}
        options={{
          headerShown: false,
          header: () => null,
        }}
      />
      <Stack.Screen
        name="Reviews"
        component={Reviews}
        options={{
          headerShown: false,
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

const RequestStack = () => {
  return (
    <Stack.Navigator initialRouteName="Requests">
      <Stack.Screen
        name="Requests"
        component={Requests}
        options={{
          headerShown: false,
          header: () => null,
        }}
      />
      <Stack.Screen
        name="SendRequest"
        component={SendRequest}
        options={{
          header: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  const { user } = useAuth();
  return (
    <Stack.Navigator initialRouteName="Profile">
      {user?.user_type === 'CareReceiver' ? (
        <Stack.Screen
          name="Profile"
          component={ProfileCarereceiverMob}
          options={{
            headerShown: false,
            header: () => null,
          }}
        />
      ) : (
        <Stack.Screen
          name="Profile"
          component={ProfileCaregiverMob}
          options={{
            headerShown: false,
            header: () => null,
          }}
        />
      )}

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          header: () => null,
        }}
      />

      <Stack.Screen
        name="Reviews"
        component={Reviews}
        options={{
          headerShown: false,
          header: () => null,
        }}
      />
      <Stack.Screen
        name="AgendaMob"
        component={AgendaMob}
        options={{
          headerShown: false,
          header: () => null,
        }}
      />
      <Stack.Screen
        name="EditProfileScreenCareGiver"
        component={EditProfileScreenCareGiver}
        options={{
          headerShown: false,
          header: () => null,
        }}
      />
      <Stack.Screen
        name="SendRequest"
        component={SendRequest}
        options={{
          headerShown: false,
          header: () => null,
        }}
      />
      <Stack.Screen
        name="EditProfileScreenCareReceiver"
        component={EditProfileScreenCareReceiver}
        options={{
          headerShown: false,
          header: () => null,
        }}
      />

    </Stack.Navigator>
  );
};

const MainNav = () => {
  const { user } = useAuth();  
  const [isVisitor, setIsVisitor] = useState(false);

  return (
    <Tab.Navigator
      initialRouteName={user || isVisitor ? "Home" : "UnsignedViews"}
      screenOptions={{
        tabBarActiveTintColor: '#ED8733',
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
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
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarLabel: 'Procurar',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="search" color={color} size={size} />
          ),
        }}
      />
      {
      user
        ?
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
        :
        <Tab.Screen
          name="UnsignedViews"
          // component={UnsignedViews}
          options={{
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
            tabBarStyle: {display: 'none'}
          }}
        >
            {(props) => <UnsignedViews {...props} setVisitorMode={() => setIsVisitor(true)} />}
        </Tab.Screen>
      }
    </Tab.Navigator>
  );
};

export default MainNav;
