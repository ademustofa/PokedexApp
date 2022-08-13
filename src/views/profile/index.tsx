import React, { useEffect } from 'react';

import { Avatar, Button, Center, HStack, Text, VStack } from 'native-base';
import {
  StyleSheet, View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '~redux/reducer/authRtk';

const ProfileScreen = () => {
  const {userInfo} = useSelector((state: any) => state.auth);
  const {dataPokemon} = useSelector((state: any) => state.pokemon);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setLogout());
  };

  useEffect(() => {
    console.log(userInfo);
  }, []);

  return (
    <View style={styles.container}>
      <Center
        style={styles.boxProfile}
        bg="#393185"
        _text={{
          color: 'white',
          fontWeight: 'bold',
        }}
        height="40%"
        width="100%">
        <Avatar
          bg="green.500"
          mr="1"
          size="xl"
          source={{
            uri: 'https://bit.ly/broken-link',
          }}>
          {userInfo?.fullname.charAt(0)}
          {/* {convertStringProfile()} */}
          {/* {`${userInfo?.first_name[0]?.toUpperCase()}${userInfo?.last_name[0]?.toUpperCase()}`} */}
        </Avatar>
        <Text
          style={{
            paddingTop: '5%',
            fontWeight: 'bold',
            color: '#fff',
            textTransform: 'uppercase',
          }}>
          {userInfo?.fullname}
        </Text>
      </Center>
      <View style={{padding: 20, marginTop: '5%'}}>
        <VStack space={3}>
          <HStack
            style={{
              borderBottomColor: '#e6e6e6',
              paddingBottom: 10,
              borderStyle: 'solid',
              borderBottomWidth: 1,
            }}
            space={3}
            justifyContent="space-between">
            <Text>Total pokemon</Text>
            <Text bold>{dataPokemon.length}</Text>
          </HStack>
        </VStack>
      </View>
      <View
        style={{
          padding: 20,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
        }}>
        <Button
          onPress={handleLogout}
          color="#fff"
          bgColor="#393185"
          // variant="subtle"
        >
          LOGOUT
        </Button>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    // padding: 20,
    flex: 1,
    // paddingTop: '8%',
    // justifyContent: 'center',
  },
  boxProfile: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
});
