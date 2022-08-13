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
  Pressable,
} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Carousel from 'react-native-snap-carousel';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

const HomeScreen = ({navigation}: any) => {
  const {dataPokemon: pokemonData} = useSelector((state: any) => state.pokemon);
  const [dataPokemon, setDataPokemon] = useState<any[]>([]);

  useEffect(() => {
    console.log(pokemonData);
    setDataPokemon(pokemonData);
  }, [pokemonData]);

  return (
    <>
      <Box flex={1} bg="#fff">
        <Heading textAlign="center" fontSize="xl" p="4" pb="3">
          My Pokemon
        </Heading>
      </Box>

      {dataPokemon.length > 0 ? (
        <Box flex={10} bg="#fff">
          <FlatList
            pt={2}
            data={dataPokemon}
            renderItem={({item}) => (
              <Pressable
                onPress={() => navigation.navigate('DetailPokemon', {item})}>
                <Box
                  borderBottomWidth="1"
                  _dark={{
                    borderColor: 'gray.600',
                  }}
                  borderColor="coolGray.200"
                  pl="4"
                  pr="5"
                  py="2">
                  <HStack
                    space={3}
                    justifyContent="space-between"
                    alignItems="center">
                    <Avatar
                      // bg="green.500"
                      mr="1"
                      source={{
                        uri: item?.sprites?.front_default,
                      }}>
                      {item.name.charAt(0)}
                    </Avatar>
                    <VStack>
                      <Text
                        _dark={{
                          color: 'warmGray.50',
                        }}
                        color="coolGray.800"
                        bold>
                        {item.name}
                      </Text>
                    </VStack>
                    <Spacer />
                    <Text
                      fontSize="xs"
                      _dark={{
                        color: 'warmGray.50',
                      }}
                      color="coolGray.800">
                      #{item.order}
                    </Text>
                  </HStack>
                </Box>
              </Pressable>
            )}
            keyExtractor={item => item.name}
          />
        </Box>
      ) : (
        <Box
          flex={10}
          bg="#fff"
          p={3}
          justifyContent="center"
          alignItems="center">
          <Center
            borderRadius={7}
            bg="#fff"
            _text={{
              color: 'muted.500',
              fontWeight: 'bold',
            }}
            height={120}
            width={{
              base: 200,
              lg: 250,
            }}>
            <Icon
              my={3}
              as={<MaterialCommunityIcons name="pokeball" />}
              size="xl"
              color="muted.500"
            />
            <Text pt={2} bold color="muted.500">
              YOU HAVE NO POKEMON
            </Text>
          </Center>
        </Box>
      )}
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
  slide: {
    marginTop: 5,
    marginBottom: 5,
    // paddingRight: 20,
    backgroundColor: '#fff',
    width: viewportWidth - 50,
    height: viewportWidth / 2.7,
    borderRadius: 4,
    // borderWidth: 1,
    // borderColor: '#000',
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
