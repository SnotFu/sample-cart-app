import React, { useState, useCallback } from 'react'
import { View, FlatList } from 'react-native'
import axios from 'axios'
import baseURL from '../../assets/common/baseUrl'
import { useFocusEffect } from '@react-navigation/native'
import { NativeBaseProvider, Text } from 'native-base'
import OrderCard from '../../Shared/OrderCard'

const Orders = (props) => {
  const [orderList, setOrderList] = useState()

  useFocusEffect(
    useCallback(() => {
      getOrders()
      return () => {
        setOrderList()
      }
    }, [])
  )

  const getOrders = () => {
    axios
      .get(`${baseURL}orders`)
      .then((x) => {
        setOrderList(x.data)
      })
      .catch((error) => console.log(error))
  }

  return (
    <View style={{ height: '100%' }}>
      <NativeBaseProvider>
        <View style={{padding: 10}}>
          <FlatList
            data={orderList}
            renderItem={({ item }) => (
              <OrderCard
                navigation={props.navigation}
                {...item}
                editMode={true}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </NativeBaseProvider>
    </View>
  )
}

export default Orders
