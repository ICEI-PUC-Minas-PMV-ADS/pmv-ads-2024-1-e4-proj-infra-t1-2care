import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Unsigned/Login';
import Register from '../screens/Unsigned/Register';
import RegisterUsers from '../screens/Unsigned/RegisterUsers';
import HomeTest from '../screens/Unsigned/HomeTest';

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

        </stack.Navigator>
    );
};

export default UnsignedViews;