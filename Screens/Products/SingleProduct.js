import React, { useState, useEffect } from 'react'
import { Image, View, StyleSheet, ScrollView, Button } from 'react-native'
import {
  Divider,
  HStack,
  VStack,
  Text,
  NativeBaseProvider,
  Icon,
  Box
} from 'native-base'
import Toast from 'react-native-toast-message'
import EasyButton from '../../Shared/StyledComponents/EasyButton'
import TrafficLight from '../../Shared/StyledComponents/TrafficLight'
import { connect } from 'react-redux'
import * as actions from '../../Redux/Actions/cartActions'
import { SITE_URL, UPLOAD_URL } from '../../Shared/variables'

const SingleProduct = (props) => {
  const [item, setItem] = useState(props.route.params.item)
  const [availability, setAvailability] = useState(null)
  const [availabilityText, setAvailabilityText] = useState('')

  useEffect(() => {
    if (props.route.params.item.countInStock == 0) {
      setAvailability(<TrafficLight unavailable></TrafficLight>)
      setAvailabilityText('Unavailable')
    } else if (props.route.params.item.countInStock <= 5) {
      setAvailability(<TrafficLight limited></TrafficLight>)
      setAvailabilityText('Limited Stock')
    } else {
      setAvailability(<TrafficLight available></TrafficLight>)
      setAvailabilityText('Available')
    }
    return () => {
      setAvailability(null)
      setAvailabilityText('')
    }
  }, [])

  return (
    <NativeBaseProvider style={styles.container}>
      <ScrollView style={{ marginBottom: 0 }}>
        <VStack style={{ padding: 10 }}>
          <Image
            source={{
              uri: item.image ? item.image : `${SITE_URL}${UPLOAD_URL}Logo.png`,
            }}
            resizeMode='contain'
            style={styles.image}
          />
        </VStack>
        <VStack space={1} alignItems='center'>
          <Text fontSize='3xl'>{item.name}</Text>
          <Text fontSize='md'>{item.brand}</Text>
        </VStack>
        <VStack>
          <View style={styles.availabilityContainer}>
            <View style={styles.availability}>
              <Text style={{ marginRight: 10 }}>
                Availability: {availabilityText}
              </Text>
              {availability}
            </View>
            <Text style={{ padding: 10 }}>{item.description}</Text>
          </View>
        </VStack>
        <HStack
          space={3}
          divider={<Divider />}
          w='100%'
          marginTop={10}
          justifyContent='space-between'>
          <VStack justifyContent='space-between'>
            <Text style={styles.price}>$ {item.price.toFixed(2)}</Text>
          </VStack>
          <VStack justifyContent='space-between'>
            <EasyButton
              primary
              medium
              onPress={() => {
                props.addItemToCart(item),
                  Toast.show({
                    topOffSet: 60,
                    type: 'success',
                    text1: `${item.name} added to Cart`,
                    text2: 'Go to your Cart to complete the order.',
                  })
              }}>
              <Text style={{ color: 'white' }}>Add</Text>
            </EasyButton>
          </VStack>
        </HStack>
      </ScrollView>
    </NativeBaseProvider>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(actions.addToCart({ quantity: 1, product })),
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: '100%',
  },
  imageContainer: {
    backgroundColor: 'white',
    padding: 0,
    margin: 0,
  },
  image: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentHeader: {
    marginBottom: 20,
  },
  contentText: {
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'white',
  },
  price: {
    padding: 10,
    fontSize: 20,
    color: 'orange',
  },
  availabilityContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  availability: {
    flexDirection: 'row',
    marginBottom: 10,
  },
})

export default connect(null, mapDispatchToProps)(SingleProduct)
