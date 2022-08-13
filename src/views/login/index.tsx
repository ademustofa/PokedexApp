import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Alert, Button, Center, Heading, HStack, Icon, IconButton,
  Image, Input, ScrollView, Text, useToast, VStack
} from 'native-base';
import React, { useState } from 'react';
import { Dimensions, KeyboardAvoidingView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import LOGO from '~assets/images/pokemon.png';
import { setLogin } from '~redux/reducer/authRtk';
import dataLogin from '~redux/reducer/login.json';
import dataUser from '~redux/reducer/user.json';

const LoginScreen = ({navigation, route}: any) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignIn = async () => {
    setLoading(true);
    setTimeout(async () => {
      console.log('data');
      console.log({username, password});
      let payload = {
        username,
        password,
      };

      console.log(dataLogin);
      if (username === dataLogin.username && password === dataLogin.password) {
        await AsyncStorage.setItem('user_id', dataUser.id.toString());
        dispatch(setLogin({data: dataUser}));
      } else {
        toast.show({
          placement: 'top',
          render: () => {
            return (
              <Alert mb="3" w="100%" status="error">
                <VStack space={2} flexShrink={1} w="100%">
                  <HStack
                    flexShrink={1}
                    space={2}
                    justifyContent="space-between">
                    <HStack space={2} flexShrink={1}>
                      <Alert.Icon mt="1" />
                      <Text fontSize="md" color="coolGray.800">
                        Username and Password does not match
                      </Text>
                    </HStack>
                  </HStack>
                </VStack>
              </Alert>
            );
          },
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <VStack bg="#fff" flex={1} justifyContent="space-between" py={8}>
      <Center flex={1}>
        <Image
          source={LOGO}
          resizeMode="contain"
          width={Dimensions.get('screen').width}
          height={Dimensions.get('screen').height / 7}
        />
        {/* <ToggleDarkMode /> */}
      </Center>
      <ScrollView flex={2}>
        <VStack px={10} space={5} alignItems="center">
          <KeyboardAvoidingView>
            <Input
              onChangeText={value => setUsername(value)}
              value={username}
              w={{
                base: '100%',
              }}
              bgColor="#ededf8"
              _focus={{
                borderColor: 'info.50',
              }}
              placeholder="Username"
              InputLeftElement={
                <Icon
                  as={<MaterialIcons name="person" />}
                  size={5}
                  ml="2"
                  color="muted.400"
                />
              }
            />
            <Input
              mt={5}
              InputRightElement={
                <IconButton
                  onPress={() => setShowPassword(!showPassword)}
                  // colorScheme="#fff"
                  bgColor="#ededf8"
                  size="sm"
                  variant="ghost"
                  icon={
                    <Icon
                      as={
                        <MaterialIcons
                          name={showPassword ? 'visibility' : 'visibility-off'}
                        />
                      }
                      size={5}
                      mr="2"
                      color="muted.400"
                    />
                  }
                />
              }
              onChangeText={value => setPassword(value)}
              value={password}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              bgColor="#ededf8"
              _focus={{
                borderColor: 'info.50',
              }}
            />
          </KeyboardAvoidingView>
          <Button
            isLoading={loading}
            mt={10}
            w={{
              base: '100%',
            }}
            bgColor="#3D4094"
            onPress={handleSignIn}>
            LOGIN
          </Button>
        </VStack>

        <VStack
          mt={10}
          justifyContent="center"
          alignItems="center"
          style={{
            bottom: 0,
          }}>
          <Heading size="sm">POKEDEX</Heading>
        </VStack>
      </ScrollView>
    </VStack>
  );
};
export default LoginScreen;
