import React from 'react'
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Button,
  Modal,
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
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import moment from 'moment'
import { SITE_URL, UPLOAD_URL } from './variables'

var { width } = Dimensions.get('window')

const ProductItem = (props) => {

  return (
    <TouchableHighlight
      onPress={() => {
        props.navigation.navigate('Product Detail', { item: props })
      }}
      underlayColor={'#AAA'}
      style={[
        {
          backgroundColor: props.index % 2 == 0 ? 'white' : 'gainsboro',
          flex: 1,
        },
      ]}>
      <View>
        <Box
          borderBottomWidth='1'
          _dark={{
            borderColor: 'gray.600',
          }}
          borderColor='coolGray.200'
          pl='4'
          pr='5'
          py='2'>
          <HStack space={3} justifyContent='space-between'>
            <Avatar
              backgroundColor={'white'}
              borderWidth={1}
              size='48px'
              source={{
                uri: props.image
                  ? props.image
                  : `${SITE_URL}${UPLOAD_URL}medium_product-placeholder.png`,
              }}
            />
            <VStack style={{ width: '50%' }}>
              <Text
                _dark={{
                  color: 'warmGray.50',
                }}
                color='coolGray.800'
                bold
                numberOfLines={1}
                ellipsizeMode='tail'>
                {props.name}
              </Text>
              <View>
                <Text
                  color='coolGray.600'
                  _dark={{
                    color: 'warmGray.200',
                  }}
                  numberOfLines={1}
                  ellipsizeMode='tail'>
                  {props.description}
                </Text>
              </View>
            </VStack>
            <Spacer />
            <VStack>
              <Text
                fontSize='xs'
                _dark={{
                  color: 'warmGray.50',
                }}
                color='coolGray.800'
                alignSelf='flex-start'
                numberOfLines={1}
                ellipsizeMode='tail'>
                {moment(props.dateCreated).format('MM-DD-YYYY, HH:mm')}
              </Text>
              <Text
                color='coolGray.600'
                _dark={{
                  color: 'warmGray.200',
                }}
                numberOfLines={1}
                ellipsizeMode='tail'>
                $ {props.price.toFixed(2)}
              </Text>
            </VStack>
          </HStack>
        </Box>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    width: width,
  },
  image: {
    borderRadius: 50,
    width: width / 8,
    height: 20,
    margin: 2,
  },
  item: {
    flexWrap: 'wrap',
    margin: 3,
    width: width / 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default ProductItem
