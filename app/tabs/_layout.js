import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Slot, Tabs } from 'expo-router';
import { inicializeDatabase } from '../../database/inicializeDatabase';
//import { StyleSheet } from 'react-native';

export default function TabLayout() {
  return (

    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Início', headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="consultas"
        options={{
          title: 'Consultas',   headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="pesquisa"
        options={{
          title: 'Pesquisa', headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil', headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
