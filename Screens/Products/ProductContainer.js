import React, { useState, useCallback } from 'react'
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  StatusBar,
  ScrollView,
  Dimensions,
} from 'react-native'
import {
  Container,
  HStack,
  Box,
  Icon,
  Input,
  Text,
  NativeBaseProvider,
  Center,
  IconButton,
  VStack,
} from 'native-base'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import baseURL from '../../assets/common/baseUrl'
import axios from 'axios'
import ProductList from './ProductList'
import SearchedProducts from './SearchedProducts'
import Banner from '../../Shared/Banner'
import CategoryFilter from './CategoryFilter'

var { height } = Dimensions.get('window')

const ProductContainer = (props) => {
  const [products, setProducts] = useState([])
  const [productsFiltered, setProductsFiltered] = useState([])
  const [focus, setFocus] = useState()
  const [categories, setCategories] = useState([])
  const [productsCtg, setProductsCtg] = useState([])
  const [active, setActive] = useState()
  const [initialState, setInitialState] = useState([])
  const [loading, setLoading] = useState(true)

  useFocusEffect(
    useCallback(() => {
      setFocus(false)
      setActive(-1)

      // Products
      axios
        .get(`${baseURL}products`)
        .then((res) => {
          setProducts(res.data)
          setProductsFiltered(res.data)
          setProductsCtg(res.data)
          setInitialState(res.data)
          setLoading(false)
        })
        .catch((error) => console.log(error))

      // Categories
      axios
        .get(`${baseURL}categories`)
        .then((res) => {
          setCategories(res.data)
        })
        .catch((error) => console.log('API call error'))

      return () => {
        setProducts([])
        setProductsFiltered([])
        setFocus()
        setCategories([])
        setActive()
        setInitialState()
      }
    }, [])
  )

  // Product Methods

  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    )
  }

  const openList = () => {
    setFocus(true)
  }

  const onBlur = () => {
    setFocus(false)
  }

  // Category Methods
  const changeCtg = (ctg) => {
    {
      ctg === 'all'
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ]
    }
  }

  return (
    <NativeBaseProvider>
      {loading == false ? (
        <VStack h={'100%'}>
          <StatusBar bg='gray' barStyle='light-content' />
          <Box safeAreaTop bg='gray' />
          <HStack
            bg='white'
            px='5'
            py='3'
            alignItems='center'
            w='100%'>
            <HStack alignItems='center'>
              <View style={{ flex: 2, width: '100%' }}>
                <Input
                  bg='#d3d3d3'
                  onFocus={openList}
                  onChangeText={(text) => searchProduct(text)}
                  placeholder='Search by product name'
                  width='100%'
                  borderRadius='10'
                  py='1'
                  px='2'
                  borderWidth='0'
                  _focus={{
                    bg: '#a0e1eb',
                  }}
                  InputLeftElement={
                    <IconButton
                      style='flex-1'
                      icon={
                        <Icon
                          ml='2'
                          size='4'
                          color='gray.400'
                          as={FontAwesome}
                          name='search'
                        />
                      }
                      onPress={openList}
                    />
                  }
                  InputRightElement={
                    <View>
                      {focus == true ? (
                        <IconButton
                          style='flex-1'
                          icon={
                            <Icon
                              ml='2'
                              size='4'
                              color='gray.400'
                              as={FontAwesome}
                              name='close'
                            />
                          }
                          onPress={onBlur}
                        />
                      ) : null}
                    </View>
                  }
                />
              </View>
            </HStack>
          </HStack>
          {focus == true ? (
            <SearchedProducts
              navigation={props.navigation}
              productsFiltered={productsFiltered}
            />
          ) : (
            <ScrollView>
              <View style={{ height: '100%' }}>
                <View>
                  <Banner />
                </View>
                <View>
                  <CategoryFilter
                    categories={categories}
                    categoryFilter={changeCtg}
                    productsCtg={productsCtg}
                    active={active}
                    setActive={setActive}
                  />
                </View>
                {productsCtg.length > 0 ? (
                  <View style={styles.listContainer}>
                    {productsCtg.map((item) => {
                      return (
                        <ProductList
                          navigation={props.nagivation}
                          key={item._id}
                          item={item}
                        />
                      )
                    })}
                  </View>
                ) : (
                  <View style={[styles.center, { height: height / 2 }]}>
                    <Text>No products found!</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </VStack>
      ) : (
        // Loading
        <View style={{ height: '100%' }}>
          <Center style={{ height: '100%' }}>
            <Center>
              <ActivityIndicator size='large' color='red' />
            </Center>
          </Center>
        </View>
      )}
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
  },
  listContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: 'gainsboro',
    flex: 1,
    height: '100%',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ProductContainer
