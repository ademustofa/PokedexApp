import React, {useEffect} from 'react';

import {
  Avatar,
  Button,
  Center,
  HStack,
  Text,
  VStack,
  Icon,
  Box,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setLogout} from '~redux/reducer/authRtk';

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
        <Text
          fontSize="lg"
          style={{
            paddingTop: '3%',
            fontWeight: 'bold',
            color: '#fff',
            textTransform: 'uppercase',
          }}>
          #21
        </Text>
      </Center>
      <View style={{padding: 20, marginTop: '5%'}}>
        <VStack space={3}>
          <HStack
            style={
              {
                // borderBottomColor: '#e6e6e6',
                // paddingBottom: 10,
                // borderStyle: 'solid',
                // borderBottomWidth: 1,
              }
            }
            space={3}
            justifyContent="space-evenly">
            <Center
              // px={10}
              // py={5}
              // shadow={2}
              borderRadius={7}
              bg="#fff"
              // _text={{
              //   color: 'white',
              //   fontWeight: 'bold',
              // }}
            >
              <Icon
                // my={3}
                as={<MaterialCommunityIcons name="pokeball" />}
                size="lg"
                color="#393185"
              />
              <Text pt={3} bold color="muted.600">
                {dataPokemon.length}
              </Text>
            </Center>
            <Center
              // px={10}
              // py={5}
              // shadow={2}
              borderRadius={7}
              bg="#fff"
              // _text={{
              //   color: 'white',
              //   fontWeight: 'bold',
              // }}
            >
              <Icon
                // my={3}
                as={<MaterialCommunityIcons name="sword" />}
                size="lg"
                color="red.500"
              />
              <Text pt={3} bold color="muted.600">
                {userInfo?.combatpower}
              </Text>
            </Center>
            <Center
              // px={10}
              // py={5}
              // shadow={2}
              borderRadius={7}
              bg="#fff"
              // _text={{
              //   color: 'white',
              //   fontWeight: 'bold',
              // }}
            >
              <Icon
                // my={3}
                as={<MaterialCommunityIcons name="shield-cross-outline" />}
                size="lg"
                color="green.600"
              />
              <Text pt={3} bold color="muted.500">
                {userInfo?.defense}
              </Text>
            </Center>
          </HStack>

          <Box
            mx={2}
            py={3}
            mt={3}
            height={Dimensions.get('screen').height / 5}
            shadow={2}
            px="2"
            borderRadius={7}
            bg="#fff"
            justifyContent="space-between">
            <HStack space={3} px={2} justifyContent="space-between">
              <Icon
                // my={3}
                as={<MaterialCommunityIcons name="sword-cross" />}
                size={5}
                color="green.600"
              />
              <Text bold fontSize={11} color="muted.500">
                {`${userInfo?.winstreak} win streak`}
              </Text>
            </HStack>
            <HStack space={3} justifyContent="space-evenly">
              <Center>
                <Text fontSize={32} bold color="muted.500">
                  {userInfo?.duelwon}
                </Text>
                <Text bold fontSize={12} color="muted.500">
                  DUEL WON
                </Text>
              </Center>

              <Center>
                <Text fontSize={32} bold color="muted.500">
                  {userInfo?.duellose}
                </Text>
                <Text bold fontSize={12} color="muted.500">
                  DUEL LOSE
                </Text>
              </Center>
            </HStack>
          </Box>
        </VStack>
      </View>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
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
    backgroundColor: '#fff',
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
