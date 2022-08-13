import {
  Alert, Avatar, Box, Button, Center, Divider, Flex, Heading, HStack, Icon, Pressable,
  Skeleton, Text,
  useToast, VStack
} from 'native-base';
import React, { useState } from 'react';
import {
  StyleSheet, ToastAndroid
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setPokemonData } from '~redux/reducer/pokemonRtk';


const HomeScreen = ({navigation}: any) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [dataPokemon, setDataPokemon] = useState<any>(null);
  const [loadingPokemon, setLoadingPokemon] = useState<boolean>(false);

  // useEffect(() => {
  //   getDataPokemon();
  // }, []);

  const getDataPokemon = async () => {
    setLoadingPokemon(true);
    setTimeout(async () => {
      const random = Math.floor(Math.random() * 1000);
      const url = `https://pokeapi.co/api/v2/pokemon/${random}`;
      const result = await axios
        .get(url)
        .then(res => res)
        .catch(err => err.response);
      console.log(result);
      if (result.status == 200) {
        setDataPokemon(result.data);
      }

      if (result.status == 404) {
        console.log(result.status);
        ToastAndroid.show('Try Again', ToastAndroid.LONG);
      }
      setLoadingPokemon(false);
    }, 1000);
  };

  const handleSetDataPokemon = async () => {
    dispatch(setPokemonData({data: dataPokemon}));
    toast.show({
      placement: 'top',
      render: () => {
        return (
          <Alert mb="3" w="100%" status="success">
            <VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon mt="1" />
                  <Text fontSize="md" color="coolGray.800">
                    Pokemon has been claim
                  </Text>
                </HStack>
              </HStack>
            </VStack>
          </Alert>
        );
      },
    });
    setDataPokemon(null);
    navigation.navigate('Home');
  };

  const RenderPokemon = () => {
    return (
      <VStack>
        <Box>
          <VStack py={5}>
            <Center
              // style={styles.boxProfile}
              // bg="#393185"
              _text={{
                color: 'white',
                fontWeight: 'bold',
              }}
              // height="40%"
              width="100%">
              <Skeleton size="20" rounded="full" />
              <Skeleton.Text py={7} lines={2} alignItems="center" px="12" />
              <Skeleton mt={2} rounded="5" />
            </Center>
          </VStack>
        </Box>
        <HStack space={3} my={5} justifyContent="center">
          <Box width="45%">
            <Skeleton mt={2} rounded="5" />
          </Box>
          <Box width="45%">
            <Skeleton mt={2} rounded="5" />
          </Box>
        </HStack>
      </VStack>
    );
  };

  return (
    <>
      <Box bg="#fff" p={3} flex={1}>
        <Heading textAlign="center" fontSize="xl" p="4" pb="3">
          Get New Pokemon
        </Heading>
      </Box>
      <Box
        bg="#fff"
        p={3}
        flex={10}
        justifyContent="center"
        alignItems="center">
        {!dataPokemon && !loadingPokemon && (
          <Pressable onPress={getDataPokemon}>
            <Center
              borderRadius={7}
              bg="#393185"
              _text={{
                color: 'white',
                fontWeight: 'bold',
              }}
              height={120}
              width={{
                base: 200,
                lg: 250,
              }}>
              <Text pt={2} bold style={{color: '#fff'}}>
                OPEN POKEBALL
              </Text>
              <Icon
                my={3}
                as={<MaterialCommunityIcons name="pokeball" />}
                size="xl"
                color="#fff"
              />
            </Center>
          </Pressable>
        )}
        {!dataPokemon && loadingPokemon && <RenderPokemon />}

        {dataPokemon && (
          <VStack>
            <Box>
              <VStack py={5}>
                <Center
                  // style={styles.boxProfile}
                  // bg="#393185"
                  _text={{
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                  // height="40%"
                  width="100%">
                  <Avatar
                    // bg="green.500"
                    mr="1"
                    size="xl"
                    source={{
                      uri: dataPokemon?.sprites?.front_default,
                    }}
                  />

                  <Flex direction="row" h="58" p="4">
                    {dataPokemon?.types.map((res: any, idx: number) => (
                      <>
                        <Text bold>{res.type.name.toUpperCase()}</Text>
                        {idx !== dataPokemon.types.length - 1 && (
                          <Divider
                            bg="#3D4094"
                            thickness="2"
                            mx="2"
                            orientation="vertical"
                          />
                        )}
                      </>
                    ))}
                  </Flex>
                  <Text
                    pr={1.5}
                    style={{
                      // paddingTop: '2%',
                      // fontWeight: 'bold',
                      color: '#000',
                      textTransform: 'uppercase',
                    }}>
                    #{dataPokemon?.order}
                  </Text>
                </Center>
                <Box
                  mx={2}
                  py={3}
                  mt={3}
                  shadow={2}
                  px="2"
                  borderRadius={7}
                  bg="#3D4094">
                  <HStack space={3} justifyContent="space-evenly">
                    <Center>
                      <Text
                        fontSize={17}
                        style={{
                          // paddingTop: '5%',
                          fontWeight: 'bold',
                          color: '#fff',
                          textTransform: 'uppercase',
                        }}>
                        {dataPokemon?.base_experience}
                      </Text>
                      <Text
                        fontSize={12}
                        style={{
                          // paddingTop: '5%',
                          // fontWeight: 'bold',
                          color: '#fff',
                          // textTransform: 'uppercase',
                        }}>
                        Base EXP
                      </Text>
                    </Center>
                    <Center>
                      <Text
                        fontSize={17}
                        style={{
                          // paddingTop: '5%',
                          fontWeight: 'bold',
                          color: '#fff',
                          textTransform: 'uppercase',
                        }}>
                        {dataPokemon?.height}
                      </Text>
                      <Text
                        fontSize={12}
                        style={{
                          // paddingTop: '5%',
                          // fontWeight: 'bold',
                          color: '#fff',
                          // textTransform: 'uppercase',
                        }}>
                        Height
                      </Text>
                    </Center>
                    <Center>
                      <Text
                        fontSize={17}
                        style={{
                          // paddingTop: '5%',
                          fontWeight: 'bold',
                          color: '#fff',
                          textTransform: 'uppercase',
                        }}>
                        {dataPokemon?.weight}
                      </Text>
                      <Text
                        fontSize={12}
                        style={{
                          // paddingTop: '5%',
                          // fontWeight: 'bold',
                          color: '#fff',
                          // textTransform: 'uppercase',
                        }}>
                        Weight
                      </Text>
                    </Center>
                  </HStack>
                </Box>
              </VStack>
            </Box>
            <HStack space={3} my={5} justifyContent="center">
              <Box width="45%">
                <Button
                  color="#fff"
                  bgColor="red.600"
                  onPress={() => setDataPokemon(null)}>
                  SKIP
                </Button>
              </Box>
              <Box width="45%">
                <Button
                  color="#fff"
                  bgColor="green.600"
                  onPress={handleSetDataPokemon}>
                  CLAIM
                </Button>
              </Box>
            </HStack>
          </VStack>
        )}
        {/* <ActivityIndicator size="small" color="#3D4094" /> */}
      </Box>
    </>
  );
};

export default HomeScreen;