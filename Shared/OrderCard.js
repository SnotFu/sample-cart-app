import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { HStack, Icon, Select } from 'native-base'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import TrafficLight from './StyledComponents/TrafficLight'
import EasyButton from './StyledComponents/EasyButton'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import baseURL from '../assets/common/baseUrl'

const codes = [
  { name: 'pending', code: '3' },
  { name: 'shipped', code: '2' },
  { name: 'delivered', code: '1' },
]

const OrderCard = (props) => {
  const [orderStatus, setOrderStatus] = useState()
  const [statusText, setStatusText] = useState()
  const [statusChange, setStatusChange] = useState()
  const [token, setToken] = useState()
  const [cardColor, setCardColor] = useState()

  useEffect(() => {
    if (props.editMode) {
      AsyncStorage.getItem('jwt')
        .then((res) => {
          setToken(res)
        })
        .catch((error) => console.log(error))
    }

    if (props.status == '3') {
      setOrderStatus(<TrafficLight unavailable></TrafficLight>)
      setStatusText('pending')
      setCardColor('#E74C3C')
    } else if (props.status == '2') {
      setOrderStatus(<TrafficLight limited></TrafficLight>)
      setStatusText('shipped')
      setCardColor('#F1C43C')
    } else {
      setOrderStatus(<TrafficLight available></TrafficLight>)
      setStatusText('delivered')
      setCardColor('#2ECC71')
    }
    return () => {
      setOrderStatus()
      setStatusText()
      setCardColor()
    }
  }, [])

  const updateOrder = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const order = {
      city: props.city,
      country: props.country,
      dateOrdered: props.dateOrdered,
      id: props.id,
      orderItems: props.orderItems,
      phone: props.phone,
      shippingAddress1: props.shippingAddress1,
      shippingAddress2: props.shippingAddress2,
      status: statusChange,
      totalPrice: props.totalPrice,
      user: props.user,
      zip: props.zip,
      usstate: props.usstate,
    }

    axios
      .put(`${baseURL}orders/${props.id}`, order, config)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: 'success',
            text1: 'Order updated.',
            text2: ' ',
          })
          setTimeout(() => {
            props.navigation.navigate('Products')
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

  return (
    <View style={[{ backgroundColor: cardColor }, styles.container]}>
      <View style={styles.title}>
        <Text>Order Number: #{props.id}</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <HStack>
          <Text>Status: {statusText}</Text>
          <View style={{ marginLeft: 5 }}>{orderStatus}</View>
        </HStack>
        <Text numberOfLines={1} ellipsizeMode='tail'>
          Address: {props.shippingAddress1} {props.shippingAddress2}
        </Text>
        <Text numberOfLines={1} ellipsizeMode='tail'>
          City: {props.city}
        </Text>
        <Text numberOfLines={1} ellipsizeMode='tail'>
          State: {props.usstate[0].title}
        </Text>
        <Text numberOfLines={1} ellipsizeMode='tail'>
          Country: {props.country[0].title}
        </Text>
        <Text numberOfLines={1} ellipsizeMode='tail'>
          Date Ordered: {props.dateOrdered.split('T')[0]}
        </Text>
        <View style={styles.priceContainer}>
          <Text>Price: </Text>
          <Text style={styles.price} numberOfLines={1} ellipsizeMode='tail'>
            $ {props.totalPrice.toFixed(2)}
          </Text>
        </View>

        {props.editMode ? (
          <View>
            <Select
              selectedValue={statusChange}
              minWidth='200'
              accessibilityLabel='Change Status'
              placeholder='Change Status'
              _selectedItem={{
                bg: 'gainsboro',
                endIcon: (
                  <Icon color={'#007aff'} name='arrow-down' as={FontAwesome} />
                ),
              }}
              mt={1}
              iosIcon={
                <Icon color={'#007aff'} name='arrow-down' as={FontAwesome} />
              }
              style={{ width: undefined }}
              placeholderStyle={{ color: '#007aff' }}
              placeholderIconColor='#007aff'
              onValueChange={(e) => setStatusChange(e)}>
              {codes.map((c) => {
                return (
                  <Select.Item key={c.code} label={c.name} value={c.code} />
                )
              })}
            </Select>

            <EasyButton secondary large onPress={() => updateOrder()}>
              <Text style={{ color: 'white' }}>Update</Text>
            </EasyButton>
          </View>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 20,
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 2,
    elevation: 10,
  },
  title: {
    backgroundColor: '#62B1F6',
    padding: 5,
  },
  priceContainer: {
    marginTop: 10,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  price: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default OrderCard
