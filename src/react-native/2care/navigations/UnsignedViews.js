import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Unsigned/Home';

const stack = createNativeStackNavigator();

const UnsignedViews = () => {
    return (
        <stack.Navigator initialRouteName="Home">
            <stack.Screen
                name="Home"
                component={Home}
                options={{
                    header: () => null,
                }}
            />
        </stack.Navigator>
    );
};

export default UnsignedViews;