import React, { useState, useEffect, useContext } from 'react'
import { Text, View, Button } from 'react-native'
import {
  Icon,
  NativeBaseProvider,
  Select,
  CheckIcon,
  NativeBaseConfigProvider,
  Box
} from 'native-base'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import FormContainer from '../../../Shared/Form/FormContainer'
import Input from '../../../Shared/Form/Input'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'
import { add } from 'react-native-reanimated'
import AuthGlobal from '../../../Context/store/AuthGlobal'
import Error from '../../../Shared/Error'
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'

let countries = require('../../../assets/data/countries.json')
let usstates = require('../../../assets/data/usstates.json')
usstates = JSON.stringify(usstates)
countries = JSON.stringify(countries)

const Checkout = (props) => {
  const context = useContext(AuthGlobal)

  const [orderItems, setOrderItems] = useState()
  const [address, setAddress] = useState('')
  const [address2, setAddress2] = useState('')
  const [city, setCity] = useState('')
  const [usstate, setUsState] = useState('')
  const [zip, setZip] = useState('')
  const [country, setCountry] = useState('')
  const [phone, setPhone] = useState('')
  const [user, setUser] = useState()
  const [error, setError] = useState()
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    setOrderItems(props.cartItems)

    if (context.stateUser.isAuthenticated) {
      setUser(context.stateUser.user.userId)
    } else {
      props.navigation.navigate('Cart')
      Toast.show({
        topOffset: 60,
        type: 'error',
        text1: 'Please login to Checkout',
        text2: ' ',
      })
    }

    return () => {
      setOrderItems()
    }
  }, [])

  const checkOut = () => {
    let order = {
      usstate: selectedItem,
      city,
      country: selectedCountry,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      status: '3',
      user,
      zip,
    }
    if (
      phone === '' ||
      address === '' ||
      city === '' ||
      zip === '' ||
      selectedCountry === '' ||
      selectedCountry === null ||
      selectedItem === '' ||
      selectedItem === null
    ) {
      setError('Please fill in the form completely.')
    } else {
      props.navigation.navigate('Payment', { order: order })
    }
  }

  return (
    <NativeBaseProvider>
      <Box>
        <KeyboardAwareScrollView
          viewIsInsideTabBar={true}
          extraHeight={200}
          enableOnAndroid={true}>
          <FormContainer title={'Shipping Address'}>
            <Input
              placeholder={'Phone'}
              name={'Phone'}
              value={phone}
              keyboardType={'numeric'}
              onChangeText={(text) => setPhone(text)}
            />
            <Input
              placeholder={'Shipping Address 1'}
              name={'ShippingAddress1'}
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
            <Input
              placeholder={'Shipping Address 2'}
              name={'ShippingAddress2'}
              value={address2}
              onChangeText={(text) => setAddress2(text)}
            />
            <Input
              placeholder={'City'}
              name={'City'}
              value={city}
              onChangeText={(text) => setCity(text)}
            />
            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              closeOnSubmit={false}
              onSelectItem={setSelectedItem}
              dataSet={JSON.parse(usstates)}
              onChangeText={(text) => setUsState(text)}
              inputContainerStyle={{
                width: '80%',
                height: 60,
                backgroundColor: 'white',
                margin: 10,
                borderRadius: 20,
                padding: 10,
                borderWidth: 2,
                borderColor: 'orange',
              }}
              textInputProps={{
                placeholderTextColor: '#9b9a9a',
                placeholder: 'State',
                autoCorrect: false,
                autoCapitalize: 'none',
                style: {
                  color: '#000000',
                  paddingLeft: 0,
                },
              }}
            />

            <Input
              placeholder={'Zip'}
              name={'Zip'}
              value={zip}
              keyboardType={'numeric'}
              onChangeText={(text) => setZip(text)}
            />

            <AutocompleteDropdown
              clearOnFocus={false}
              closeOnBlur={true}
              closeOnSubmit={false}
              onSelectItem={setSelectedCountry}
              dataSet={JSON.parse(countries)}
              onChangeText={(text) => setCountry(text)}
              inputContainerStyle={{
                width: '80%',
                height: 60,
                backgroundColor: 'white',
                margin: 10,
                borderRadius: 20,
                padding: 10,
                borderWidth: 2,
                borderColor: 'orange',
              }}
              textInputProps={{
                placeholderTextColor: '#9b9a9a',
                placeholder: 'Country',
                autoCorrect: false,
                autoCapitalize: 'none',
                style: {
                  color: '#000000',
                  paddingLeft: 0,
                },
              }}
            />

            <View style={{ width: '80%', alignItems: 'center' }}>
              {!!error ? <Error message={error} /> : null}
              <Button title='Confirm' onPress={() => checkOut()} />
            </View>
          </FormContainer>
        </KeyboardAwareScrollView>
      </Box>
    </NativeBaseProvider>
  )
  
}

const mapStateToProps = (state) => {
  const { cartItems } = state
  return {
    cartItems: cartItems,
  }
}

export default connect(mapStateToProps)(Checkout)
