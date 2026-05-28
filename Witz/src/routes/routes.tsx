import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Importado o MaterialCommunityIcons

// Importando a tela principal 
import Main_screen from './pages/main_screen/index'; 

const Tab = createBottomTabNavigator();
// COR DAS ICÓNES DA BARRA DE NAVEGAÇÃO
export default function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#888EEF', // Verde Witz
        tabBarInactiveTintColor: '#8A8A8A',
        tabBarStyle: {
          backgroundColor: '#FFF',
          height: 60,
          paddingBottom: 8,
          borderTopWidth: 0,
        }
      }}
    >
        {/*ABA DE HOME*/}
      <Tab.Screen 
        name="Home" 
        component={Main_screen} 
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "grid" : "grid-outline"} size={size} color={color} />
          )
        }}
      />
      {/*ABA DE TRANSAÇÕES*/}
      <Tab.Screen 
        name="Transações" 
        component={Main_screen} 
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "swap-horizontal" : "swap-horizontal-outline"} size={size} color={color} />
          )
        }}
      />
    {/* ABA DE METAS*/}
      <Tab.Screen 
        name="Metas" 
        component={Main_screen} 
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "disc" : "disc-outline"} size={size} color={color} />
          )
        }}
      />

      {/*ABA DE IA */}
      <Tab.Screen 
        name="IA" 
        component={Main_screen} 
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? "brain" : "brain"} 
              size={size} 
              color={color} 
            />
          )
        }}
      />
      {/*ABA DE ANÁLISES*/}
      <Tab.Screen 
        name="Análises" 
        component={Main_screen} 
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? "bar-chart" : "bar-chart-outline"} size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}