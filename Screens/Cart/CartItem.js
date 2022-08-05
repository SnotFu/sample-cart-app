import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import {
  Text,
  Image,
  Body,
  Icon,
  Box,
  Heading,
  HStack,
  VStack,
  NativeBaseProvider,
  Center,
  FlatList,
  Avatar,
  Spacer,
} from 'native-base'
import moment from 'moment'

const CartItem = (props) => {
  const data = props.item
  const [quantity, setQuantity] = useState(props.item.quantity)

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
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
                uri: item.product.image,
              }}
            />
            <VStack>
              <Text
                _dark={{
                  color: 'warmGray.50',
                }}
                color='coolGray.800'
                bold>
                {item.product.name}
              </Text>
              <Text
                color='coolGray.600'
                _dark={{
                  color: 'warmGray.200',
                }}>
                {item.product.description}
              </Text>
            </VStack>
            <Spacer />
            <Text
              fontSize='xs'
              _dark={{
                color: 'warmGray.50',
              }}
              color='coolGray.800'
              alignSelf='flex-start'>
              {moment(item.product.dateCreated).format('MM-DD-YYYY, HH:mm')}
            </Text>
          </HStack>
        </Box>
      )}
      keyExtractor={(item) => item.id}
    />
  )
}

const styles = StyleSheet.create({
  listItems: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  body: {
    margin: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
})

export default CartItem
