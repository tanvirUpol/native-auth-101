import { View, Text, TouchableOpacity } from 'react-native';
    import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const TokenScreen = () => {
    const { logout, token } = useContext(AuthContext);

    // const [userData, setUserData] = useState(null);

    useEffect(() => {

        const fetchUserData = async () => {
            try {
                const response = await fetch('users API', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${token}`,
                    },
                });
                const json = await response.json();
                if (response.ok) {
                    console.log(json);
                    // setUserData(json.users);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUserData();
    }, [token]);

    console.log(token);
    const handLogout = async () => {
        logout();
    };

    return (
        <View className="flex-1 items-center justify-center">
            <Text className="text-2xl font-medium mb-4">HomeScreen</Text>
            <Text className="text-2xl font-medium mb-4">{token}</Text>
            <TouchableOpacity
                className="bg-teal-500 py-1 rounded px-3"
                onPress={handLogout}>
                <Text className="text-white text-center text-lg font-semibold">
                    Logout
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default TokenScreen;
