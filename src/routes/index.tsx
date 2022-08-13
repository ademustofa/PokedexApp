import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '~views/login';
import DetailPokemon from '~views/detailPokemon';
import App from './homeRoutes';

import {RootStackParamList} from '~types/index';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const RouteAapp = () => {
  const {isLogin} = useSelector((state: any) => state.auth);
  console.log({isLogin});
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLogin ? (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="App"
              component={App}
            />
            <Stack.Screen
              // options={{headerShown: false}}
              name="DetailPokemon"
              component={DetailPokemon}
            />
          </>
        ) : (
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={LoginScreen}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RouteAapp;
