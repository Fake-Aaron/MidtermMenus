import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="restaurant-menu" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="staffLogin"
        options={{
          title: "Staff Login",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="email" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="staffPanel"
        options={{
          title: "Staff Actions",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="book" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
