import React, {useContext} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { View } from 'react-native'
import { Icon, NativeBaseProvider, VStack } from 'native-base'
import { Ionicons, FontAwesome } from '@expo/vector-icons'

// Stacks
import HomeNavigator from './HomeNavigator'
import CartNavigator from './CartNavigator'
import UserNavigator from './UserNavigator'
import AdminNavigator from './AdminNavigator'
import CartIcon from '../Shared/CartIcon'
import AuthGlobal from '../Context/store/AuthGlobal'

const Tab = createBottomTabNavigator()

const Main = () => {
  const context = useContext(AuthGlobal)
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#13bddb',
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          let showCartBadge

          if (route.name === 'MainHome') {
            iconName = focused ? 'home' : 'home'
            showCartBadge = false
          } else if (route.name === 'MainCart') {
            iconName = focused ? 'shopping-cart' : 'shopping-cart'
            showCartBadge = true
          } else if (route.name === 'MainAdmin') {
            iconName = focused ? 'cog' : 'cog'
            showCartBadge = false
          } else if (route.name === 'MainUser') {
            iconName = focused ? 'user' : 'user'
            showCartBadge = false
          }

          return (
            <NativeBaseProvider>
              <VStack style={{ paddingTop: 10 }}>
                {showCartBadge === true ? <CartIcon /> : null}
                <Icon
                  as={FontAwesome}
                  name={iconName}
                  size={size}
                  color={color}
                />
              </VStack>
            </NativeBaseProvider>
          )
        },
        tabBarInactiveTintColor: '#5f5b5b',
      })}>
      <Tab.Screen name='MainHome' component={HomeNavigator} />
      <Tab.Screen name='MainCart' component={CartNavigator} />
      {context.stateUser.user.isAdmin == true ? (
        <Tab.Screen name='MainAdmin' component={AdminNavigator} />
      ) : null}
      <Tab.Screen name='MainUser' component={UserNavigator} />
    </Tab.Navigator>
  )
}

export default Main
