// import 'react-native-gesture-handler';
import React from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';


// navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';

const AuthStack = () => {
    const Stack = createNativeStackNavigator();

  return (
      <Stack.Navigator initialRouteName="Login" id="auth">
          <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
  );
};

export default AuthStack;
