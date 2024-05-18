import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Unsigned/Login';
import Register from '../screens/Unsigned/Register';
import RegisterUsers from '../screens/Unsigned/RegisterUsers';
import HomeTest from '../screens/Unsigned/HomeTest';

import SendRequest from '../screens/Unsigned/SendRequest';
import RequestsCaregiver from '../screens/Unsigned/RequestsCaregiver';
import RequestsCareReceiver from '../screens/Unsigned/RequestsCareReceiver';
import AgendaMob from '../screens/Unsigned/AgendaMob';
import ProfileCaregiverMob from '../screens/Unsigned/ProfileCaregiverMob';

const stack = createNativeStackNavigator();

const UnsignedViews = () => {
    return (
        <stack.Navigator initialRouteName="Login">
            <stack.Screen
                name="Login"
                component={Login}
                options={{
                    header: () => null,
                }}
            />
            <stack.Screen
                name="Register"
                component={Register}
                options={{
                    header: () => null,
                }}
            />
             <stack.Screen
                name="RegisterUsers"
                component={RegisterUsers}
                options={{
                    header: () => null,
                }}
            />
            <stack.Screen
                name="HomeTest"
                component={HomeTest}
                options={{
                    header: () => null,
                }}
            />
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
             <stack.Screen
                name="AgendaMob"
                component={AgendaMob}
                options={{
                    header: () => null,
                }}
            /><stack.Screen
            name="ProfileCaregiverMob"
            component={ProfileCaregiverMob}
            options={{
                header: () => null,
            }}
        />
        </stack.Navigator>
    );
};

export default UnsignedViews;