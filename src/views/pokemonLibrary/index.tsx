import {
  Avatar, Box,
  FlatList, Heading, HStack, Pressable, Spacer, Text, VStack
} from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator, Dimensions, StyleSheet, View
} from 'react-native';


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

const dataPerPage = 15;

const HomeScreen = ({navigation}: any) => {
  const [dataPokemon, setDataPokemon] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [allDataPokemon, setAllDataPokemon] = useState<number>(1154);
  const [loadingPokemon, setLoadingPokemon] = useState<boolean>(false);

  useEffect(() => {
    getDataPokemon();
  }, []);

  const getDataPokemon = async () => {
    if (allDataPokemon !== 0 && dataPokemon.length === allDataPokemon) {
      return false;
    }
    setLoadingPokemon(true);
    const offset = page * dataPerPage;
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${dataPerPage}`;
    const result = await axios
      .get(url)
      .then(res => res)
      .catch(err => err.response);
    console.log(result);
    if (result.status == 200) {
      const {results, count}: any = result.data;
      console.log({results, count});
      setPage(prev => prev + 1);
      // setAllDataPokemon(count);
      setDataPokemon(prev => [...prev, ...results]);
      // setDataPokemon(prev => results);
    }

    setLoadingPokemon(false);
  };

  return (
    <Box bg="#fff" flex={1}>
      <Heading textAlign="center" fontSize="xl" p="4" pb="3">
        Pokemon Library
      </Heading>
      <FlatList
        pt={2}
        // height={Dimensions.get('screen').height / 1.4}
        // style={{marginBottom: 60}}
        data={dataPokemon}
        onEndReached={getDataPokemon}
        onEndReachedThreshold={0.5}
        renderItem={({item}) => (
          <Pressable
            onPress={() =>
              navigation.navigate('DetailPokemon', {url: item.url})
            }>
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
                  bg="#3D4094"
                  mr="1"
                  source={{
                    uri: 'https://bit.ly/broken-link',
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
                  {/* <Text
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}>
                  {item.recentText}
                </Text> */}
                </VStack>
                <Spacer />
                {/* <Text
                fontSize="xs"
                _dark={{
                  color: 'warmGray.50',
                }}
                color="coolGray.800">
                {item.name}
              </Text> */}
              </HStack>
            </Box>
          </Pressable>
        )}
        keyExtractor={item => item.name}
      />
      {loadingPokemon && (
        <View style={{position: 'absolute', bottom: 10, left: '50%'}}>
          <ActivityIndicator size="small" color="#3D4094" />
        </View>
      )}
    </Box>
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
