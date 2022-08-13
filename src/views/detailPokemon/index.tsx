import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Input,
  VStack,
  Icon,
  HStack,
  Badge,
  Button,
  Heading,
  Center,
  Spacer,
  Box,
  FlatList,
  Avatar,
  Text,
  IconButton,
  Divider,
  ScrollView,
  Flex,
  Alert,
} from 'native-base';
import Carousel from 'react-native-snap-carousel';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';

import axios from 'axios';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.23;
const slideWidth = wp(88);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const value = 2;

const HomeScreen = ({navigation, route}: any) => {
  const {item, url} = route.params;
  const [dataPokemon, setDataPokemon] = useState<any>(null);

  const getDataPokemonByid = async () => {
    // setLoadingPokemon(true);
    // setTimeout(async () => {

    const result = await axios
      .get(url)
      .then(res => res)
      .catch(err => err.response);
    console.log(result);
    if (result.status == 200) {
      setDataPokemon(result.data);
      navigation.setOptions({title: result.data.name.toUpperCase()});
    } else {
      <Alert mb="3" w="100%" status="error">
        <VStack space={2} flexShrink={1} w="100%">
          <HStack flexShrink={1} space={2} justifyContent="space-between">
            <HStack space={2} flexShrink={1}>
              <Alert.Icon mt="1" />
              <Text fontSize="md" color="coolGray.800">
                Cannot get pokemon
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </Alert>;
    }
    // setLoadingPokemon(false);
    // }, 1000);
  };

  useEffect(() => {
    if (item) {
      console.log(item);
      navigation.setOptions({title: item.name.toUpperCase()});
      setDataPokemon(item);
    } else {
      getDataPokemonByid();
    }
  }, [item]);

  return (
    <>
      <Box flex={1} bg="#fff">
        {/* <View>
          <IconButton
            pt={10}
            onPress={() => navigation.goBack()}
            colorScheme="muted.50"
            variant="ghost"
            _icon={{
              as: AntDesign,
              size: 6,
              name: 'arrowleft',
            }}
          />
        </View> */}
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
            {/* <Text
              style={{
                paddingTop: '5%',
                fontWeight: 'bold',
                color: '#000',
                textTransform: 'uppercase',
              }}>
              {dataPokemon?.name}
            </Text> */}

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
      <Box flex={1.1} bg="#fff">
        <ScrollView>
          <Box p={2}>
            <Box shadow={2} px="2" borderRadius={7} bg="#fff">
              <Heading fontSize="sm" p="4" pb="3">
                STATS
              </Heading>
              <VStack px={5} pb={2} space={1}>
                {dataPokemon &&
                  dataPokemon.stats.map((res: any) => (
                    <Box>
                      <HStack px={1} py={2} justifyContent="space-between">
                        <Text
                          style={{
                            // paddingTop: '5%',
                            // fontWeight: 'bold',
                            color: '#000',
                            // textTransform: 'uppercase',
                          }}>
                          {res.stat.name}
                        </Text>
                        <Text
                          style={{
                            // paddingTop: '5%',
                            // fontWeight: 'bold',
                            color: '#000',
                            textTransform: 'uppercase',
                          }}>
                          {res.base_stat}
                        </Text>
                      </HStack>
                      <Divider />
                    </Box>
                  ))}
              </VStack>
            </Box>
          </Box>
          <Box p={2}>
            <Box shadow={2} px="2" borderRadius={7} bg="#fff">
              <Heading fontSize="sm" p="4" pb="3">
                ABILITY
              </Heading>
              <VStack px={5} pb={2} space={1}>
                {dataPokemon &&
                  dataPokemon.abilities.map((res: any) => (
                    <Box>
                      <HStack
                        px={1}
                        py={2}
                        justifyContent="flex-start"
                        space={3}>
                        <Text
                          style={{
                            // paddingTop: '5%',
                            // fontWeight: 'bold',
                            color: '#000',
                            // textTransform: 'uppercase',
                          }}>
                          {'>'}
                        </Text>
                        <Text
                          style={{
                            // paddingTop: '5%',
                            // fontWeight: 'bold',
                            color: '#000',
                            textTransform: 'uppercase',
                          }}>
                          {res.ability.name}
                        </Text>
                      </HStack>
                      <Divider />
                    </Box>
                  ))}
              </VStack>
            </Box>
          </Box>
        </ScrollView>
      </Box>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    backgroundColor: '#fff',
  },
  buttonScan: {
    width: '100%',
    paddingVertical: '15%',
    backgroundColor: '#3D4094',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  boxShadow: {
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  title: {},
  header: {
    padding: 20,
    backgroundColor: '#73C6F5',
    // height: viewportHeight / 6,
    // backgroundColor: '#0099FF',
    // borderBottomLeftRadius: 40,
    // borderBottomRightRadius: 10
  },
});
