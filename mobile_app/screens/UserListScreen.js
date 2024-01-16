import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const UserListScreen = () => {
  const [users, setUsers] = useState([]);
  const [showJson, setShowJson] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://159.223.94.246/users');
      const data = await response.json();
      setUsers(data);
      setShowJson(true);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <View>
      <Button title="Fetch Users" onPress={fetchUsers} />
      {showJson && (
        <View>
          {users.map((user) => (
            <Text key={user.id}>{user.name}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

export default UserListScreen;