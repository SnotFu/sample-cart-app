import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Cart from '../Screens/Cart/Cart'
import CheckoutNavigator from './CheckoutNavigator'
import Login from '../Screens/User/Login'
import Register from '../Screens/User/Register'
import UserProfile from '../Screens/User/UserProfile'

const Stack = createStackNavigator()

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Cart'
        component={Cart}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Checkout'
        component={CheckoutNavigator}
        options={{
          title: 'Checkout',
        }}
      />
      <Stack.Screen
        name='Login'
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Register'
        component={Register}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='User Profile'
        component={UserProfile}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}

export default function CartNavigator() {
  return <MyStack />
}
