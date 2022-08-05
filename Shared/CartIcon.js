import React from 'react'
import { StyleSheet } from 'react-native'
import { Badge, Text } from 'native-base'
import { connect } from 'react-redux'

const CartIcon = (props) => {
  return (
    <>
      {props.cartItems.length ? (
        <Badge
        position={'absolute'}
          colorScheme='danger'
          rounded='full'
          right={-10}
          top={0}
          zIndex={1}
          variant='solid'
          alignSelf='flex-end'
          _text={{
            fontSize: 12,
          }}>
          <Text style={{ color: 'white' }}>{props.cartItems.length}</Text>
        </Badge>
      ) : null}
    </>
  )
}

const mapStateToProps = (state) => {
  const { cartItems } = state
  return {
    cartItems: cartItems,
  }
}

const styles = StyleSheet.create({
  badge: {
    width: 25,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    top: -4,
    right: -15,
  },
  text: {
    fontSize: 12,
    width: 100,
    fontWeight: 'bold',
  },
})

export default connect(mapStateToProps)(CartIcon)
