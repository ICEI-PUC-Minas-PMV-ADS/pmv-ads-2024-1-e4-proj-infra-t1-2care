import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Homepage from '../screens/Main/Home';


const stack = createNativeStackNavigator();

const MainNav = () => {
    return (
        <stack.Navigator initialRouteName="Home">
            <stack.Screen
                name="Home"
                component={Homepage}
                options={{
                    header: () => null,
                }}
            />
        </stack.Navigator>
    );
};

export default MainNav;