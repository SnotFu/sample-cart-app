import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Button,
} from 'react-native'
import {
  VStack,
  Image,
  HStack,
  NativeBaseProvider,
  Box,
  Avatar,
  Spacer,
  Center,
} from 'native-base'
import { connect } from 'react-redux'
import * as actions from '../../../Redux/Actions/cartActions'
import moment from 'moment'
import Toast from 'react-native-toast-message'
import axios from 'axios'
import baseUrl from '../../../assets/common/baseUrl'
import { SITE_URL, UPLOAD_URL } from '../../../Shared/variables'

var { height, width } = Dimensions.get('window')

const Confirm = (props) => {
  const finalOrder = props.route.params

  const confirmOrder = () => {
    const order = finalOrder.order.order

    axios
    .post(`${baseUrl}orders`, order)
    .then((res) => {
      if (res.status == 200 || res.status == 201) {
        Toast.show({
          topOffset: 60,
          type: 'success',
          text1: 'Order completed.',
          text2: ' '
        })
        setTimeout(() => {
          props.clearCart()
          props.navigation.navigate('Cart')
        }, 500)
      }
    })
    .catch((error) => {
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Something went wrong. :(',
        text2: 'Please try again.',
      })
    })

    

  }

  const confirm = props.route.params

  var total = 0
  if (confirm !== undefined) {
    props.route.params.order.order.orderItems.forEach((cart) => {
      return (total += cart.product.price)
    })
  }

  return (
    <NativeBaseProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleContainer}>
          <VStack style={{ margin: 0, width: '100%', height: '100%' }}>
            <View style={{ width: '100%' }}>
              <Center style={{ width: '100%' }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                  Confirm Order
                </Text>
              </Center>
            </View>
            {props.route.params ? (
              <View style={{ width: '100%', height: '100%' }}>
                <Box
                  style={{
                    borderWidth: 1,
                    borderColor: 'orange',
                    width: '100%',
                    height: '100%',
                  }}
                  space='2'>
                  <VStack alignItems='center' justifyContent={'center'}>
                    <Text style={styles.title}>Shipping to:</Text>
                    <View style={{ padding: 20, width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                      <HStack>
                        <Text style={{ fontWeight: 'bold' }}>Address: </Text>
                        <Text numberOfLines={1} ellipsizeMode='tail'>
                          {finalOrder.order.order.shippingAddress1}
                        </Text>
                      </HStack>
                      {finalOrder.order.order.shippingAddress2 !== '' ? (
                        <HStack>
                          <Text style={{ fontWeight: 'bold' }}>
                            Address 2:{' '}
                          </Text>
                          <Text numberOfLines={1} ellipsizeMode='tail'>
                            {finalOrder.order.order.shippingAddress2}
                          </Text>
                        </HStack>
                      ) : null}
                      <HStack>
                        <Text style={{ fontWeight: 'bold' }}>City: </Text>
                        <Text numberOfLines={1} ellipsizeMode='tail'>
                          {finalOrder.order.order.city}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text style={{ fontWeight: 'bold' }}>State: </Text>
                        <Text numberOfLines={1} ellipsizeMode='tail'>
                          {finalOrder.order.order.usstate.title}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text style={{ fontWeight: 'bold' }}>Zip Code: </Text>
                        <Text numberOfLines={1} ellipsizeMode='tail'>
                          {finalOrder.order.order.zip}
                        </Text>
                      </HStack>
                      <HStack>
                        <Text style={{ fontWeight: 'bold' }}>Country: </Text>
                        <Text numberOfLines={1} ellipsizeMode='tail'>
                          {finalOrder.order.order.country.title}
                        </Text>
                      </HStack>
                    </View>
                    <Text style={styles.title}>
                      Total: $ {total.toFixed(2)}
                    </Text>
                    <Text style={styles.title}>Items:</Text>
                  </VStack>
                  <VStack style={{ width: '100%' }}>
                    {finalOrder.order.order.orderItems.map((x) => {
                      return (
                        <View style={{ width: '100%' }}>
                          <Box
                            borderBottomWidth='1'
                            _dark={{
                              borderColor: 'gray.600',
                            }}
                            borderColor='coolGray.200'
                            pl='4'
                            pr='5'
                            py='2'>
                            <Box style={{ width: '60%' }}>
                              <HStack space={3} justifyContent='space-between'>
                                <Avatar
                                  backgroundColor={'white'}
                                  borderWidth={1}
                                  size='48px'
                                  source={{
                                    uri: x.product.image
                                      ? x.product.image
                                      : `${SITE_URL}${UPLOAD_URL}medium_product-placeholder.png`,
                                  }}
                                />
                                <VStack w={100}>
                                  <Text
                                    _dark={{
                                      color: 'warmGray.50',
                                    }}
                                    color='coolGray.800'
                                    bold
                                    numberOfLines={1}
                                    ellipsizeMode='tail'>
                                    {x.product.name}
                                  </Text>
                                  <Text
                                    color='coolGray.600'
                                    _dark={{
                                      color: 'warmGray.200',
                                    }}
                                    numberOfLines={1}
                                    ellipsizeMode='tail'>
                                    {x.product.description}
                                  </Text>
                                </VStack>
                                <Spacer />
                                <VStack alignItems={'flex-end'} w={100}>
                                  <Text
                                    fontSize='xs'
                                    _dark={{
                                      color: 'warmGray.50',
                                    }}
                                    color='coolGray.800'
                                    numberOfLines={1}
                                    ellipsizeMode='tail'>
                                    {moment(x.product.dateCreated).format(
                                      'MM-DD-YYYY'
                                    )}
                                  </Text>
                                  <Text
                                    color='coolGray.600'
                                    _dark={{
                                      color: 'warmGray.200',
                                    }}
                                    numberOfLines={1}
                                    ellipsizeMode='tail'>
                                    $ {x.product.price.toFixed(2)}
                                  </Text>
                                </VStack>
                              </HStack>
                            </Box>
                          </Box>
                        </View>
                      )
                    })}
                  </VStack>
                  <VStack>
                    <View style={{ alignItems: 'center', margin: 20 }}>
                      <Button title={'Place order'} onPress={confirmOrder} />
                    </View>
                  </VStack>
                </Box>
              </View>
            ) : null}
          </VStack>
        </View>
      </ScrollView>
    </NativeBaseProvider>
  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignContent: 'center',
    backgroundColor: 'white',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
  },
  title: {
    alignSelf: 'center',
    margin: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: width / 1.2,
  },
})

export default connect(null, mapDispatchToProps)(Confirm)
