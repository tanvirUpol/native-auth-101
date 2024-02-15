import React, {useState, useEffect, useContext} from 'react';
import {View, Text, Button} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import {Picker} from '@react-native-picker/picker';

const TaskAssign = ({route}) => {
  const {sto, site} = route.params;

  const [users, setUsers] = useState([]);
  const [assignPicker, setAssignPicker] = useState('');
  const [assignPacker, setAssignPacker] = useState('');
  const {token} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://192.168.52.192:4001/api/user/pickerpacker',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          },
        );
        const data = await response.json();
        // console.log(site,data.users[0].site);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleAssign = async () => {
    const assignedPicker = users.find(item => item.name === assignPicker);
    const assignedPacker = users.find(item => item.name === assignPacker);
    console.log(assignedPacker);
    let data = {};
    if (assignedPicker && assignPacker) {
      console.log('Assigned Picker:', assignedPicker);
      console.log('Assigned Packer:', assignedPacker);
      data = {
        sto: sto,
        picker: assignedPicker.name,
        pickerId: assignedPicker._id,
        packer: assignedPacker.name,
        packerId: assignedPacker._id,
      };
    }
    // else if (assignedPicker) {
    //   data = {
    //     sto: sto,
    //     picker: assignedPicker.name,
    //     pickerId: assignedPicker._id,
    //   };
    // } else if (assignedPacker) {
    //     // console.log("only packer");
    //   data = {
    //     sto: sto,
    //     packer: assignedPacker.name,
    //     packerId: assignedPacker._id,
    //   };
    // }
    else {
      console.log('Please enter something');
      data = {};
      return;
    }

    // console.log(data);

    try {
      const res = await fetch(
        'https://shwapnooperation.onrender.com/api/sto-tracking/update',
        {
          method: 'PATCH',
          headers: {
            'Content-type': 'application/json',
            Authorization: `${'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVmdHlraGFyQGFjaWxvZ2lzdGljcy5uZXQiLCJuYW1lIjoiRWZ0eWtoYXIgUmFobWFuIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MDc2Mzg3ODcsImV4cCI6MTcwODI0MzU4N30._iHGGBfc8lZ5YqGDZgpTYJltlLi_rqih5zoJlx3YeLw'}`,
          },
          body: JSON.stringify(data),
        },
      );

      const json = await res.json();
      console.log(json);

      if (res.ok) {
        console.log('Updated!');
        // redirect to list
      } else {
        console.log('update failed');
      }
    } catch (error) {
      console.log('Login failed with:', error);
    }
  };

  return (
    <View className="w-[300px] mx-auto mt-10">
      <Text>Assign Picker:</Text>
      <Picker
        selectedValue={assignPicker}
        onValueChange={(itemValue, itemIndex) => setAssignPicker(itemValue)}>
        <Picker.Item label="Select Picker" value="" />
        {users
          .filter(item => item.role === 'picker' && item.site.includes(site))
          .map(item => (
            <Picker.Item key={item._id} label={item.name} value={item.name} />
          ))}
      </Picker>

      <Text>Assign Packer:</Text>
      <Picker
        selectedValue={assignPacker}
        onValueChange={(itemValue, itemIndex) => setAssignPacker(itemValue)}>
        <Picker.Item label="Select Packer" value="" />
        {users
          .filter(item => item.role === 'packer' && item.site.includes(site))
          .map(item => (
            <Picker.Item key={item._id} label={item.name} value={item.name} />
          ))}
      </Picker>

      <Button title="Assign" onPress={handleAssign} />
    </View>
  );
};

export default TaskAssign;
