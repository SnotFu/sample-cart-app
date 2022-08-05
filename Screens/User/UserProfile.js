import React, { useCallback, useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { Box, NativeBaseProvider, VStack, ScrollView, Center } from 'native-base'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import baseURL from '../../assets/common/baseUrl'
import AuthGlobal from '../../Context/store/AuthGlobal'
import { logoutUser } from '../../Context/actions/Auth.actions'
import OrderCard from '../../Shared/OrderCard'

const UserProfile = (props) => {
  const context = useContext(AuthGlobal)
  const [userProfile, setUserProfile] = useState()
  const [orders, setOrders] = useState()

  useFocusEffect(
    useCallback(() => {
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate('Login')
      }
      AsyncStorage.getItem('jwt')
        .then((res) => {
          axios
            .get(`${baseURL}users/${context.stateUser.user.userId}`, {
              headers: { Authorization: `Bearer ${res}` },
            })
            .then((user) => setUserProfile(user.data))
        })
        .catch((error) => console.log(error))

      axios
        .get(`${baseURL}orders`)
        .then((x) => {
          const data = x.data
          const userOrders = data.filter(
            (order) => order.user._id === context.stateUser.user.userId
          )
          setOrders(userOrders)
        })
        .catch((error) => console.log(error))

      return () => {
        setUserProfile()
        setOrders()
      }
    }, [context.stateUser.isAuthenticated])
    
  )

  return (
    <NativeBaseProvider>
      <Box style={styles.container}>
        <ScrollView>
          <VStack style={styles.subContainer}>
            <Text style={{ fontSize: 30 }}>
              {userProfile ? userProfile.name : ''}
            </Text>
            <View style={{ marginTop: 20 }}>
              <Text style={{ margin: 10 }}>
                {userProfile ? `Email: ${userProfile.email}` : ''}
              </Text>
              <Text style={{ margin: 10 }}>
                {userProfile ? `Phone: ${userProfile.phone}` : ''}
              </Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Button
                title={'Logout'}
                onPress={() => [
                  AsyncStorage.removeItem('jwt'),
                  logoutUser(context.dispatch),
                ]}
              />
            </View>
            <View style={styles.order}>
              <View style={{width: '100%'}}>
                {(orders !== undefined && orders.length > 0) ? (
                  <Center>
                    <Text style={{ fontSize: 20 }}>My Orders:</Text>
                  </Center>
                ) : null}
                {(orders !== undefined && orders.length > 0) ? (
                  orders.map((x) => {
                    return <OrderCard key={x.id} {...x} />
                  })
                ) : (
                  <View style={styles.order}>
                    <Text>You have no orders.</Text>
                  </View>
                )}
              </View>
            </View>
          </VStack>
        </ScrollView>
      </Box>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  subContainer: {
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  order: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 60,
    width: '100%',
    padding: 10
  }
})

export default UserProfile
