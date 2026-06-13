import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Initial from '../pages/initial'; 
import Login from '../pages/login';
import Register from '../pages/register';
import Resetpassoword from '../pages/resetPassword';


const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Initial" component={Initial} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="ResetPassword" component={Resetpassoword} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}