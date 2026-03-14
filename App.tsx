import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// 导入页面组件
import HomeScreen from './src/screens/HomeScreen';
import ProjectsScreen from './src/screens/ProjectsScreen';
import UsersScreen from './src/screens/UsersScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import ProjectDetailScreen from './src/screens/ProjectDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 项目堆栈导航器
function ProjectsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ProjectsList" 
        component={ProjectsScreen} 
        options={{ title: '项目管理' }}
      />
      <Stack.Screen 
        name="ProjectDetail" 
        component={ProjectDetailScreen} 
        options={{ title: '项目详情' }}
      />
    </Stack.Navigator>
  );
}

// 主标签导航器
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === '首页') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === '项目') {
            iconName = focused ? 'folder' : 'folder-outline';
          } else if (route.name === '用户') {
            iconName = focused ? 'account' : 'account-outline';
          } else if (route.name === '设置') {
            iconName = focused ? 'cog' : 'cog-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#1976d2',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="首页" component={HomeScreen} />
      <Tab.Screen name="项目" component={ProjectsStack} />
      <Tab.Screen name="用户" component={UsersScreen} />
      <Tab.Screen name="设置" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <MainTabs />
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}