import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch('you api endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      });

      if (!response.ok) {
        setIsLoading(false);
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      //   console.log('Login response:', data.token);
      setUser(data.user);
      setToken(data.token);
      AsyncStorage.setItem('token', data.token);
      AsyncStorage.setItem('user', JSON.stringify(data.user));
      setIsLoading(false);
    } catch (error) {
      //   console.log(error);
      setIsLoading(false);
      Alert.alert('Error', 'Login failed');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    AsyncStorage.removeItem('user');
    AsyncStorage.removeItem('token');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let storedUser = await AsyncStorage.getItem('user');
      let storedToken = await AsyncStorage.getItem('token');

      storedUser = JSON.parse(storedUser);

      if (storedUser) {
        setUser(storedUser);
        setToken(storedToken);
      }
      //   console.log(storedUser);
      setIsLoading(false);
    } catch (error) {
      Alert.alert('Error', 'Login failed');
      console.log('Error:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{login, logout, isLoading, user, token}}>
      {children}
    </AuthContext.Provider>
  );
};
