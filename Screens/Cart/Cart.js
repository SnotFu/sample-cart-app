import React, { useState, useContext } from 'react'
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native'
import {
  Text,
  Icon,
  Box,
  Heading,
  HStack,
  VStack,
  NativeBaseProvider,
  Center,
  Avatar,
  Spacer
} from 'native-base'
import moment from 'moment'
import { SwipeListView } from 'react-native-swipe-list-view'
import CartItem from './CartItem'
import EasyButton from '../../Shared/StyledComponents/EasyButton'
import { FontAwesome } from '@expo/vector-icons'
import { connect } from 'react-redux'
import * as actions from '../../Redux/Actions/cartActions'
import AuthGlobal from '../../Context/store/AuthGlobal'
import { SITE_URL, UPLOAD_URL } from '../../Shared/variables'

var { height, width } = Dimensions.get('window')

const Cart = (props) => {

  const context = useContext(AuthGlobal)

  var total = 0
  props.cartItems.forEach((cart) => {
    return (total += cart.product.price)
  })

  const [listData, setListData] = useState(
    props.cartItems.map((_, i) => ({ key: `${i}`, items: props.cartItems[i] }))
  )

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow()
    }
  }

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey)
    const newData = [...props.cartItems]
    const prevIndex = props.cartItems.findIndex((item) => item.key === rowKey)
    newData.splice(prevIndex, 1)
    setListData(newData)
  }

  const onRowDidOpen = (rowKey) => {
    console.log('TODO On Open Row', rowKey)
  }

  const renderItem = (data) => (
    <TouchableHighlight
      onPress={() => console.log('TODO On Click')}
      underlayColor={'#AAA'}
      style={[
        {
          backgroundColor: data.index % 2 == 0 ? 'white' : 'gainsboro',
        },
      ]}>
      <View style={{ width: '100%' }}>
        <Box
          w='100%'
          borderBottomWidth='1'
          _dark={{
            borderColor: 'gray.600',
          }}
          borderColor='coolGray.200'
          pl='4'
          pr='0'
          py='2'>
          <HStack
            space={3}
            justifyContent='center'
            alignItems='center'
            w={'100%'}>
            <Avatar
              backgroundColor={'white'}
              borderWidth={1}
              size='48px'
              source={{
                uri: data.item.product.image
                  ? data.item.product.image
                  : `${SITE_URL}${UPLOAD_URL}medium_product-placeholder.png`,
              }}
            />
            <VStack maxW={'100%'} style={{ paddingLeft: 5, flex: 2 }}>
              <Text
                _dark={{
                  color: 'warmGray.50',
                }}
                color='coolGray.800'
                bold
                numberOfLines={1}
                ellipsizeMode='tail'>
                {data.item.product.name}
              </Text>
              <Text
                color='coolGray.600'
                _dark={{
                  color: 'warmGray.200',
                }}
                numberOfLines={1}
                ellipsizeMode='tail'>
                {data.item.product.description}
              </Text>
            </VStack>
            {/* <Spacer /> */}
            <VStack style={{ flex: 1, paddingRight: 5 }}>
              <Text
                style={{ alignSelf: 'flex-end', width: '100%' }}
                fontSize='xs'
                _dark={{
                  color: 'warmGray.50',
                }}
                color='coolGray.800'
                numberOfLines={1}
                ellipsizeMode='tail'
                alignSelf={'flex-end'}>
                {moment(data.item.product.dateCreated).format('MM-DD-YYYY')}
              </Text>
              <Text
                style={{ alignSelf: 'flex-end' }}
                color='coolGray.600'
                _dark={{
                  color: 'warmGray.200',
                }}
                numberOfLines={1}
                ellipsizeMode='tail'>
                $ {data.item.product.price.toFixed(2)}
              </Text>
            </VStack>
          </HStack>
        </Box>
      </View>
    </TouchableHighlight>
  )

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      {/* <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => closeRow(rowMap, data.item.key)}>
        <Text style={styles.backTextWhite}>Close</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => [
          props.removeFromCart(data.item),
          deleteRow(rowMap, data.item.key),
        ]}>
        <Icon as={FontAwesome} name='trash' size={8} color={'white'} />
      </TouchableOpacity>
    </View>
  )

  return (
    <NativeBaseProvider>
      {props.cartItems.length ? (
        <Box h='100%'>
          <Heading fontSize='xl' p='4' pb='3' style={{ alignSelf: 'center' }}>
            Cart
          </Heading>
          <View style={styles.container}>
            <SwipeListView
              data={props.cartItems}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              leftOpenValue={75}
              rightOpenValue={-75}
              previewOpenValue={-40}
              previewOpenDelay={3000}
              onRowDidOpen={onRowDidOpen}
              disableRightSwipe
            />
          </View>
          <HStack
            space={[2, 3]}
            justifyContent='space-around'
            style={styles.bottomContainer}>
            <Center>
              <Text style={styles.price}>$ {total.toFixed(2)}</Text>
            </Center>
            <EasyButton danger medium onPress={() => props.clearCart()}>
              <Text style={{ color: 'white' }}>Clear</Text>
            </EasyButton>
            {context.stateUser.isAuthenticated ? (
              <EasyButton
                primary
                medium
                onPress={() => props.navigation.navigate('Checkout')}>
                <Text style={{ color: 'white' }}>Checkout</Text>
              </EasyButton>
            ) : (
              <EasyButton
                secondary
                medium
                onPress={() => props.navigation.navigate('Login')}>
                <Text style={{ color: 'white' }}>Login</Text>
              </EasyButton>
            )}
          </HStack>
        </Box>
      ) : (
        <Center>
          <Center height={'100%'} width={'100%'}>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>
              Looks like your cart is empty.
            </Text>
            <Text style={{ color: 'black', fontWeight: 'bold' }}>
              Add items to your cart to begin.
            </Text>
          </Center>
        </Center>
      )}
    </NativeBaseProvider>
  )
}

const mapStateToProps = (state) => {
  const { cartItems } = state
  return {
    cartItems: cartItems,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  trash: {
    height: 25,
    width: 25,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
