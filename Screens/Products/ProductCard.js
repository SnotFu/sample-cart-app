import React from 'react'
import { StyleSheet, View, Dimensions, Image, Text, Button } from 'react-native'
import Toast from 'react-native-toast-message'
import EasyButton from '../../Shared/StyledComponents/EasyButton'
import { connect } from 'react-redux'
import * as actions from '../../Redux/Actions/cartActions'
import { Center, VStack } from 'native-base'
import { SITE_URL, UPLOAD_URL } from '../../Shared/variables'

var { width } = Dimensions.get('window')

const ProductCard = (props) => {
  const { name, price, image, countInStock } = props

  return (
    <View style={styles.container}>
      <VStack>
        <Center>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              resizeMode='contain'
              source={{
                uri: image
                  ? image
                  : `${SITE_URL}${UPLOAD_URL}medium_product-placeholder.png`,
              }}
            />
          </View>
          {/* <View style={styles.card} /> */}
          <Text style={styles.title}>
            {name.length > 15 ? name.substring(0, 15 - 3) + '...' : name}
          </Text>
          <Text style={styles.price}>$ {price.toFixed(2)}</Text>

          {countInStock > 0 ? (
            <View style={{ marginBottom: 10 }}>
              <EasyButton
                primary
                medium
                onPress={() => {
                  props.addItemToCart(props),
                    Toast.show({
                      topOffset: 60,
                      type: 'success',
                      text1: `${name} added to Cart`,
                      text2: 'Go to your Cart to complete the order.',
                    })
                }}>
                <Text style={{ color: 'white' }}>Add</Text>
              </EasyButton>
            </View>
          ) : (
            <Text style={{ marginTop: 20 }}>Currently Unavailable</Text>
          )}
        </Center>
      </VStack>
    </View>
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
    width: width / 2 - 20,
    padding: 0,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 10,
    elevation: 8,
    backgroundColor: 'white',
  },
  imageContainer: {
    width: 200,
    height: 200,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E0E0E0',
  },
  image: {
    width: '80%',
    height: '100%',
    backgroundColor: 'transparent',
  },
  card: {
    marginBottom: 10,
    backgroundColor: 'transparent',
    width: width / 2 - 20 - 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: 'orange',
  },
})

export default connect(null, mapDispatchToProps)(ProductCard)
