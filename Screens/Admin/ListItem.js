import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Button,
  Modal,
} from 'react-native'
import {
  Icon,
  Content,
  Left,
  Body,
  Thumbnail,
  Text,
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Spacer,
  Center,
  ScrollView,
} from 'native-base'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import EasyButton from '../../Shared/StyledComponents/EasyButton'
import moment from 'moment'
import { SITE_URL, UPLOAD_URL } from '../../Shared/variables'

var { width } = Dimensions.get('window')

const ListItem = (props) => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <View>
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false)
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              underlayColor='#E8E8E8'
              onPress={() => {
                setModalVisible(false)
              }}
              style={{
                alignSelf: 'flex-end',
                position: 'absolute',
                top: 5,
                right: 10,
              }}>
              <Icon name='close' size={5} as={FontAwesome} />
            </TouchableOpacity>
            <EasyButton
              medium
              secondary
              onPress={() => [
                props.navigation.navigate('ProductForm', { item: props }),
                setModalVisible(false),
              ]}>
              <Text style={styles.textStyle}>Edit</Text>
            </EasyButton>
            <EasyButton
              medium
              danger
              onPress={() => [props.delete(props._id), setModalVisible(false)]}>
              <Text style={styles.textStyle}>Delete</Text>
            </EasyButton>
          </View>
        </View>
      </Modal>
      <TouchableHighlight
        onPress={() => {
          props.navigation.navigate('Product Detail', { item: props })
        }}
        style={[
          {
            backgroundColor: props.index % 2 == 0 ? 'white' : 'gainsboro',
          },
        ]}
        onLongPress={() => setModalVisible(true)}>
        <View>
          <Box
            borderBottomWidth='1'
            _dark={{
              borderColor: 'gray.600',
            }}
            borderColor='coolGray.200'
            pl='4'
            pr='5'
            py='2'>
            <HStack space={3} justifyContent='flex-start' alignItems={'center'}>
              <Avatar
                backgroundColor={'white'}
                borderWidth={1}
                size='48px'
                source={{
                  uri: props.image
                    ? props.image
                    : `${SITE_URL}${UPLOAD_URL}medium_product-placeholder.png`,
                }}
                resizeMode='contain'
                style={styles.image}
                flex={1}
              />
              <Text
                _dark={{
                  color: 'warmGray.50',
                }}
                color='coolGray.800'
                numberOfLines={1}
                ellipsizeMode='tail'
                flex={2}>
                {props.brand}
              </Text>
              <Text
                style={styles.item}
                numberOfLines={1}
                ellipsizeMode='tail'
                flex={2}>
                {props.name}
              </Text>
              <Text
                style={styles.item}
                numberOfLines={1}
                ellipsizeMode='tail'
                flex={2}>
                {props.category.name}
              </Text>
              <Text
                style={styles.item}
                numberOfLines={1}
                ellipsizeMode='tail'
                flex={2}>
                $ {props.price.toFixed(2)}
              </Text>
            </HStack>
          </Box>
        </View>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    width: width,
  },
  image: {
    borderRadius: 50,
    width: width / 20,
    height: 20,
    margin: 2,
  },
  item: {
    flexWrap: 'wrap',
    margin: 3,
    width: width / 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
})

export default ListItem
