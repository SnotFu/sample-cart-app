import React from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native'
import {
  Content,
  Left,
  Body,
  Thumbnail,
  Text,
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Spacer,
  Center,
  ScrollView,
} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import ProductItem from '../../Shared/ProductItem'

var { width } = Dimensions.get('window')

const SearchedProducts = (props) => {
  const { productsFiltered } = props
  const navigation = useNavigation()
  return (
    <View
      style={{
        paddingBottom: 60,
        paddingRight: 5,
        height: '100%'
      }}>
      {productsFiltered.length > 0 ? (
        <Box style={{ height: '100%' }}>
          <Heading fontSize='xl' p='4' pb='3'>
            Products
          </Heading>
          <View style={{ height: '100%' }}>
            <FlatList
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 60
              }}
              data={productsFiltered}
              renderItem={({ item, index }) => (
                <ProductItem
                  {...item}
                  navigation={props.navigation}
                  index={index}
                  key={item._id.$oid}
                />
              )}
              keyExtractor={(item) => item._id.$oid}
            />
          </View>
        </Box>
      ) : (
        <View style={{ height: '100%' }}>
          <Center style={{ height: '100%' }}>
            <Center>
              <Text style={{ fontWeight: 'bold' }}>
                No products match the selected criteria.
              </Text>
            </Center>
          </Center>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width / 20,
    height: width / 20,
    backgroundColor: 'transparent',
  },
  list: {
    height: '100%'
  }
})

export default SearchedProducts
