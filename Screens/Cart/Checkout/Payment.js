import React, { useState } from 'react'
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Dimensions
} from 'react-native'
import { Radio, Icon, Select, Box, NativeBaseProvider, Center, HStack, Heading, VStack } from 'native-base'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { Picker } from 'react-native-web'

var { height, width } = Dimensions.get('window')

const methods = [
  { name: 'Cash on Delivery', value: 1, id: 1 },
  { name: 'Bank Transfer', value: 2, id: 2 },
  { name: 'Card Payment', value: 3, id: 3 },
]

const paymentCards = [
  { name: 'Wallet', value: 1 },
  { name: 'VISA', value: 2 },
  { name: 'MasterCard', value: 3 },
  { name: 'Other', value: 4 },
]

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.name}</Text>
  </TouchableOpacity>
)

const Payment = (props) => {
  const order = props.route.params

  const [selected, setSelected] = useState()
  const [card, setCard] = useState()

  const renderItem = ({ item }) => {
    const backgroundColor = item.value === selected ? '#6e3b6e' : '#f9c2ff'
    const color = item.value === selected ? 'white' : 'black'

    return (
      <Item
        item={item}
        onPress={() => setSelected(item.value)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    )
  }

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <NativeBaseProvider>
        <VStack style={{ height: '100%', padding: 10 }}>
          <Center>
            <Heading size='sm'>Choose your payment method:</Heading>
          </Center>
          <View>
            <FlatList
              data={methods}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              extraData={selected}
            />
          </View>
          <View>
            {selected == 3 ? (
              <Center>
                <Select
                  selectedValue={card}
                  minWidth='200'
                  accessibilityLabel='Choose Payment Method'
                  placeholder='Choose Payment Method'
                  _selectedItem={{
                    bg: 'teal.600'
                  }}
                  mt={1}
                  onValueChange={(x) => setCard(x)}>
                  {paymentCards.map((c, index) => {
                    return (
                      <Select.Item key={c.name} label={c.name} value={c.name} />
                    )
                  })}
                </Select>
              </Center>
            ) : null}
          </View>
          {order !== undefined ? (
            <View style={{ marginTop: 0, paddingBottom: 60, alignSelf: 'center', height: '100%' }}>
              <Button
                title={'Confirm'}
                onPress={() => props.navigation.navigate('Confirm', { order })}
              />
            </View>
          ) : null}
        </VStack>
      </NativeBaseProvider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  item: {
    padding: 10,
    marginVertical: 2,
    marginHorizontal: 0,
    flex: 1,
  },
  title: {
    fontSize: 32,
  },
  imageContainer: {
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 2,
    padding: 0,
    justifyContent: 'center',
    borderColor: '#000',
    elevation: 10,
  },
})

export default Payment
