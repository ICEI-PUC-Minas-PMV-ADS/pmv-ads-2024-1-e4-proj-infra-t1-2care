import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Homepage from '../screens/Unsigned/Login';


const stack = createNativeStackNavigator();

const MainNav = () => {
    return (
        <stack.Navigator initialRouteName="Login">
            <stack.Screen
                name="Login"
                component={Homepage}
                options={{
                    header: () => null,
                }}
            />

        </stack.Navigator>
    );
};

export default MainNav;