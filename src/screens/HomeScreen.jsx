import {View, Text, TouchableOpacity, Button} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

const HomeScreen = ({navigation}) => {
  const {logout, user, token} = useContext(AuthContext);


  console.log(token);
  const handLogout = async () => {
    logout();
  };
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-medium mb-4">HomeScreen</Text>
      <Text className="text-2xl font-medium mb-4">{user.email}</Text>
      <Button className="mb-4" title="Go to Token" onPress={() => navigation.push('Token')} />
      <TouchableOpacity
        className="bg-teal-500 py-1 rounded px-3 mt-4"
        onPress={handLogout}>
        <Text className="text-white text-center text-lg font-semibold">
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
