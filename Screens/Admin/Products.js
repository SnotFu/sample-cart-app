import React, { useState, useCallback } from 'react'
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native'
import {
  Header,
  Item,
  Input,
  Icon,
  NativeBaseProvider,
  HStack,
  Box,
  StatusBar,
  IconButton,
  Center,
} from 'native-base'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import ListItem from './ListItem'
import axios from 'axios'
import baseURL from '../../assets/common/baseUrl'
import AsyncStorage from '@react-native-async-storage/async-storage'
import EasyButton from '../../Shared/StyledComponents/EasyButton'

var { height, width } = Dimensions.get('window')

const ListHeader = () => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={[styles.headerItem, { flex: 1 }]}></View>
      <View style={[styles.headerItem, { flex: 2 }]}>
        <Text
          style={{ fontWeight: 'bold' }}
          numberOfLines={1}
          ellipsizeMode='tail'>
          Brand
        </Text>
      </View>
      <View style={[styles.headerItem, { flex: 2 }]}>
        <Text
          style={{ fontWeight: 'bold' }}
          numberOfLines={1}
          ellipsizeMode='tail'>
          Name
        </Text>
      </View>
      <View style={[styles.headerItem, { flex: 2 }]}>
        <Text
          style={{ fontWeight: 'bold' }}
          numberOfLines={1}
          ellipsizeMode='tail'>
          Category
        </Text>
      </View>
      <View style={[styles.headerItem, { flex: 2 }]}>
        <Text
          style={{ fontWeight: 'bold' }}
          numberOfLines={1}
          ellipsizeMode='tail'>
          Price
        </Text>
      </View>
    </View>
  )
}

const Products = (props) => {
  const [productList, setProductList] = useState()
  const [productFilter, setProductFilter] = useState()
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState()

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem('jwt')
        .then((res) => {
          setToken(res)
        })
        .catch((error) => console.log(error))

      axios.get(`${baseURL}products`).then((res) => {
        setProductList(res.data)
        setProductFilter(res.data)
        setLoading(false)
      })
      return () => {
        setProductList()
        setProductFilter()
        setLoading(true)
      }
    }, [])
  )

  const searchProduct = (text) => {
    if (text == '') {
      setProductFilter(productList)
    }
    setProductFilter(
      productList.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      )
    )
  }

  const deleteProduct = (id) => {
    axios
      .delete(`${baseURL}products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const products = productFilter.filter((item) => item.id !== id)
        setProductFilter(products)
      })
      .catch((error) => console.log(error))
  }

  return (
    <NativeBaseProvider>
      <View style={{ height: '100%' }}>
        <View>
          <Center>
            <HStack>
              <EasyButton
                secondary
                medium
                onPress={() => props.navigation.navigate('Orders')}>
                <Icon
                  size={4}
                  as={FontAwesome}
                  name='shopping-bag'
                  color='white'
                />
                <Text style={styles.buttonText}>Orders</Text>
              </EasyButton>
              <EasyButton
                secondary
                medium
                onPress={() => props.navigation.navigate('ProductForm')}>
                <Icon size={4} as={FontAwesome} name='plus' color='white' />
                <Text style={styles.buttonText}>Products</Text>
              </EasyButton>
              <EasyButton
                secondary
                medium
                onPress={() => props.navigation.navigate('Categories')}>
                <Icon size={4} as={FontAwesome} name='plus' color='white' />
                <Text style={styles.buttonText}>Categories</Text>
              </EasyButton>
            </HStack>
          </Center>
        </View>
        <View>
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
                  onChangeText={(text) => searchProduct(text)}
                  placeholder='Search...'
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
                      onPress={(text) => searchProduct(text)}
                    />
                  }
                />
              </View>
            </HStack>
          </HStack>
        </View>
        {loading ? (
          <View style={styles.spinner}>
            <ActivityIndicator size='large' color='red' />
          </View>
        ) : (
          <FlatList
            data={productFilter}
            ListHeaderComponent={ListHeader}
            renderItem={({ item, index }) => (
              <ListItem
                {...item}
                navigation={props.navigation}
                index={index}
                delete={deleteProduct}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: 'row',
    padding: 0,
    backgroundColor: 'gainsboro',
  },
  headerItem: {
    margin: 5,
    width: width,
  },
  spinner: {
    height: height / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 10,
    marginLeft: 4,
    color: 'white',
  },
})

export default Products
