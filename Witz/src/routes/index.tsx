import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// @ts-ignore
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Telas
import Initial from '../pages/initial';
import Login from '../pages/login';
import Analysis from '../pages/Analysis';
import MainScreen from '../pages/main_screen';

// IMPORTANTE: Nome da variável de importação DEVE começar com letra Maiúscula
import PrincpTransitionScreen from '../pages/princp_transition_Screen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/* -----------------------------
   Wrapper para a Tela de Transações
   (Resolve o erro do TypeScript exigindo onTrocar)
------------------------------*/
function TransacoesWrapper(props: any) {
  return (
    // Agora o React sabe que isso é um componente customizado
    <PrincpTransitionScreen
      {...props}
      onTrocar={(tipo: string) => {
        // Se no futuro você quiser que o menu navegue para outras telas, 
        // substitua o console.log por: props.navigation.navigate('NomeDaSuaTela');
        console.log("O usuário escolheu a opção:", tipo);
      }}
    />
  );
}

/* -----------------------------
   Barra de navegação inferior
------------------------------*/
function BottomTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#888EEF',
        tabBarInactiveTintColor: '#8A8A8A',
        tabBarStyle: {
          backgroundColor: '#FFF',
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
          paddingTop: 5,
          borderTopWidth: 0,
          elevation: 10,
          shadowOpacity: 0.08,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={MainScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'grid' : 'grid-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      {/* Usamos o Wrapper aqui em vez da tela direta para passar as Props */}
      <Tab.Screen
        name="Transações"
        component={TransacoesWrapper}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'swap-horizontal' : 'swap-horizontal-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Metas"
        component={MainScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'disc' : 'disc-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="IA"
        component={MainScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="brain"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Análises"
        component={Analysis}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'bar-chart' : 'bar-chart-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/* -----------------------------
   Rotas principais
------------------------------*/
export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Initial" // <--- AQUI FOI ALTERADO DE "MainScreen" PARA "Initial"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="MainScreen"
          component={BottomTabs}
        />

        <Stack.Screen
          name="Initial"
          component={Initial}
        />

        <Stack.Screen
          name="Login"
          component={Login}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}