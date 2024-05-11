import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Unsigned/Home';
import ProfileCareGiver from '../screens/Unsigned/ProfileCareGiver';

const stack = createNativeStackNavigator();

const UnsignedViews = () => {
    return (
        <stack.Navigator initialRouteName="ProfileCareGiver">
            <stack.Screen
                name="Home"
                component={Home}
                options={{
                    header: () => null,
                }}
            />
           <stack.Screen
           name="ProfileCareGiver"
           component={ProfileCareGiver}
           options={{
               header: () => null,
           }}
       />
       </stack.Navigator>
    );
};

export default UnsignedViews;