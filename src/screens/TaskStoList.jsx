// import {useFocusEffect} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import {useIsFocused} from '@react-navigation/native';

const TaskStoList = ({navigation}) => {
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const fetchData = async () => {
    // console.log('hello');
    try {
      const response = await fetch(
        'https://shwapnooperation.onrender.com/api/sto-tracking/in-dn?filterBy=&value=&pageSize=10&currentPage=1&sortBy=&sortOrder=',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVmdHlraGFyQGFjaWxvZ2lzdGljcy5uZXQiLCJuYW1lIjoiRWZ0eWtoYXIgUmFobWFuIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDc2Mzg3ODcsImV4cCI6MTcwODI0MzU4N30._iHGGBfc8lZ5YqGDZgpTYJltlLi_rqih5zoJlx3YeLw'}`,
          },
        },
      );
      const json = await response.json();
      //   console.log(json);
      setData(json.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const renderItem = ({item}) => (
    <View className="flex flex-row justify-around p-3 border-b border-slate-300">
      <TouchableOpacity
        className=""
        onPress={() =>
          navigation.push('TaskAssign', {
            sto: item.sto,
            site: item.receivingPlant,
          })
        }>
        <Text className="text-base font-medium">{item.sto}</Text>
      </TouchableOpacity>
      <Text className="text-base font-medium ">{item.status}</Text>
    </View>
  );
  return (
    <View className="w-11/12 mx-auto my-4 border border-slate-300">
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

export default TaskStoList;
