import React, {useContext, useState} from 'react';
import {View, TextInput, TouchableOpacity, Text, Alert} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {login} = useContext(AuthContext);

  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please Enter both Email and password!');
    } else {
      login(email, password);
    }
  };
  return (
    <View className="flex-1 justify-center items-center ">
      <View className="w-4/5 bg-white p-5 rounded-lg shadow-lg">
        <Text className=" text-2xl text-teal-700 font-semibold text-left mb-5">
          Login
        </Text>
        <TextInput
          className="border-b border-gray-400  text-black mb-5 px-2 py-3 placeholder:text-black"
          placeholder="Enter email"
          placeholderTextColor="#333"
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          className="border-b border-gray-400 text-slate-700 mb-5 px-2 py-3"
          placeholder="Password"
          secureTextEntry
          onChangeText={text => setPassword(text)}
          placeholderTextColor="#333"
          value={password}
        />
        <TouchableOpacity
          className="bg-teal-500 py-3 rounded-lg"
          onPress={handleLogin}>
          <Text className="text-white text-center text-lg font-semibold">
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
