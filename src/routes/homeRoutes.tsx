import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {RootTabHomeList} from '~types/index';

import ProfileScreen from '~views/profile';
import HomeScreen from '~views/home';
import GetPokemon from '~views/getPokemon';
import PokemonLibrary from '~views/pokemonLibrary';

const Tab = createBottomTabNavigator<RootTabHomeList>();

// const options: BottomTabNavigationOptions

const RouteHome = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#393185',
        tabBarInactiveTintColor: '#475569',
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#f8fafc',
          height: 60,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="home"
                color={color}
                size={focused ? 25 : 23}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: focused ? 14 : 12,
                  // paddingTop: 2,
                  color: focused ? '#393185' : '#475569',
                }}>
                Home
              </Text>
            </View>
          ),
        }}
        name="Home"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="pokemon-go"
                color={color}
                size={focused ? 28 : 26}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: focused ? 14 : 12,
                  // paddingTop: 5,
                  color: focused ? '#393185' : '#475569',
                }}>
                Get Pokemon
              </Text>
            </View>
          ),
        }}
        name="GetPokemon"
        component={GetPokemon}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <MaterialCommunityIcons
                name="format-list-bulleted-square"
                color={color}
                size={focused ? 25 : 23}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: focused ? 14 : 12,
                  // paddingTop: 5,
                  color: focused ? '#393185' : '#475569',
                }}>
                Library
              </Text>
            </View>
          ),
        }}
        name="PokemonLibrary"
        component={PokemonLibrary}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome name="user" color={color} size={focused ? 25 : 23} />
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: focused ? 14 : 12,
                  // paddingTop: 5,
                  color: focused ? '#393185' : '#475569',
                }}>
                Profile
              </Text>
            </View>
          ),
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default RouteHome;
