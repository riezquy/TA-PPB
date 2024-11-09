import React from 'react';
import { View, Image, Platform, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Screens
import HomeScreen from './screens/HomeScreen';
import PokemonListScreen from './screens/PokemonListScreen';
import PokemonDetailScreen from './screens/PokemonDetailScreen';
import AboutScreen from './screens/AboutScreen';
import TypesScreen from './screens/TypesScreen';
import PokemonByTypeScreen from './screens/PokemonByTypeScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}
  >
    <LinearGradient
      colors={['#FF4D4D', '#F9CB28']}
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        padding: 5,
      }}
    >
      <View
        style={{
          flex: 1,
          borderRadius: 30,
          backgroundColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

const PokemonStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          color: '#fff',
          fontSize: 20,
          fontWeight: '600',
        },
        headerTintColor: '#fff',
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen 
        name="PokemonList" 
        component={PokemonListScreen} 
        options={{ title: 'Pokédex' }} 
      />
      <Stack.Screen 
        name="PokemonDetail" 
        component={PokemonDetailScreen} 
        options={{ headerTransparent: true, title: '' }} 
      />
      <Stack.Screen 
        name="Types" 
        component={TypesScreen} 
        options={{ title: 'Pokemon Types' }} 
      />
      <Stack.Screen 
        name="PokemonByType" 
        component={PokemonByTypeScreen} 
        options={({ route }) => ({ title: route.params?.type + ' Pokemon' })} 
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarShowLabel: true,
            tabBarStyle: {
              height: 65,
              backgroundColor: '#000',
              borderTopWidth: 0,
              position: 'absolute',
              elevation: 0,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              ...Platform.select({
                ios: {
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: -4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                },
                android: {
                  elevation: 10,
                },
              }),
              paddingBottom: Platform.OS === 'ios' ? 20 : 10,
            },
            tabBarActiveTintColor: '#FF4D4D',
            tabBarInactiveTintColor: '#666',
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '500',
              marginTop: -5,
            },
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'Home') {
                return (
                  <Image
                    source={require('./assets/pokeball.png')}
                    style={{
                      width: 60,
                      height: 60,
                      marginTop:5,
                    }}
                  />
                );
              } else {
                let iconName;
                if (route.name === 'Pokemon') {
                  iconName = focused ? 'list' : 'list-outline';
                } else if (route.name === 'About') {
                  iconName = focused ? 'information-circle' : 'information-circle-outline';
                }
                return <Ionicons name={iconName} size={26} color={color} />;
              }
            },
            tabBarIconStyle: {
              marginTop: 5,
            },
            headerStyle: {
              backgroundColor: '#000',
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitleStyle: {
              color: '#fff',
              fontSize: 20,
              fontWeight: '600',
            },
            headerTintColor: '#fff',
          })}
        >
          <Tab.Screen
            name="Pokemon"
            component={PokemonStack}
            options={{ 
              headerShown: false,
              tabBarLabel: 'Pokédex',
            }}
          />
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: '',
              headerShown: false,
              tabBarButton: (props) => (
                <CustomTabBarButton {...props} />
              ),
            }}
          />
          <Tab.Screen
            name="About"
            component={AboutScreen}
            options={{
              headerShown: true,
              headerTitle: 'About',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;