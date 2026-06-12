import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Goals from '../pages/goals';
import CriarMetaScreen from '../pages/goals/indexCreateGoals';
import Main_screen from '../pages/main_screen';
import Initial from '../pages/initial';
import Login from '../pages/login';
import Register from '../pages/register';
import ResetPassword from '../pages/resetPassword';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="main_screen" component={Main_screen} />
      <Stack.Screen name="goals" component={Goals} />
      <Stack.Screen
        name="indexCreateGoals"
        component={CriarMetaScreen}
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
        }}
      />
      <Stack.Screen name="Initial" component={Initial} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
}