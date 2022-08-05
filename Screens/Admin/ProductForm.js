import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native'
import { Select, Icon, NativeBaseProvider, Center, Box } from 'native-base'
import FormContainer from '../../Shared/Form/FormContainer'
import Input from '../../Shared/Form/Input'
import EasyButton from '../../Shared/StyledComponents/EasyButton'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import baseURL from '../../assets/common/baseUrl'
import axios from 'axios'
import * as ImagePicker from 'expo-image-picker'
import mime from 'mime'
import Error from '../../Shared/Error'

const ProductForm = (props) => {
  let [selectValue, setSelectValue] = React.useState('')
  const [brand, setBrand] = useState('')
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [mainImage, setMainImage] = useState('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])
  const [token, setToken] = useState()
  const [error, setError] = useState()
  const [countInStock, setCountInStock] = useState(0)
  const [rating, setRating] = useState(0)
  const [isFeatured, setIsFeatured] = useState(false)
  const [richDescription, setRichDescription] = useState('')
  const [numReviews, setNumReviews] = useState(0)
  const [item, setItem] = useState(null)

  useEffect(() => {
    if (!props.route.params) {
      setItem(null)
    } else {
      setItem(props.route.params.item)
      setBrand(props.route.params.item.brand)
      setName(props.route.params.item.name)
      setPrice(props.route.params.item.price.toString())
      setDescription(props.route.params.item.description)
      setMainImage(props.route.params.item.image)
      setImage(props.route.params.item.image)
      setCategory(props.route.params.item.category._id)
      setCountInStock(props.route.params.item.countInStock.toString())
    }

    // AsyncStorage
    AsyncStorage.getItem('jwt')
      .then((res) => {
        setToken(res)
      })
      .catch((error) => console.log(error))

    // Categories
    axios
      .get(`${baseURL}categories`)
      .then((res) => setCategories(res.data))
      .catch((error) => alert('Error loading categories...'));

      // Image Picker
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestCameraPermissionsAsync()
          if (status !== 'granted') {
            alert('Sorry, we need camera permission to make this work!')
          }
        }
      })()

    return () => {
      setCategories([])
    }
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })
    if (!result.cancelled) {
      setMainImage(result.uri)
      setImage(result.uri)
    }
  }

  const addProduct = () => {
    if (
      image == '' ||
      name == '' ||
      brand == '' ||
      price == '' ||
      description == '' ||
      category == '' ||
      countInStock == ''
    ) {
      setError('Please fill in the form completely')
    } else {
      const formData = new FormData()

      let newImageUri = image
      newImageUri = 'file:///' + newImageUri.split('file:/').join('')
      newImageUri = newImageUri.replace('/////', '///')

      if (newImageUri.includes('http')){
        newImageUri = newImageUri.replace(
          'http://10.0.2.2:3000/public/uploads/',
          'data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Feasy-shop-c5f81801-1e2a-485a-8b32-adeba743c3be/ImagePicker/'
        )
        newImageUri = newImageUri.replace(
          'http://localhost:3000/public/uploads/',
          'data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Feasy-shop-c5f81801-1e2a-485a-8b32-adeba743c3be/ImagePicker/'
        )
      }

      formData.append('image', {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: newImageUri.split('/').pop(),
      })
      formData.append('name', name)
      formData.append('brand', brand)
      formData.append('price', price)
      formData.append('description', description)
      formData.append('category', category)
      formData.append('countInStock', countInStock)
      formData.append('richDescription', richDescription)
      formData.append('rating', rating)
      formData.append('numReviews', numReviews)
      formData.append('isFeatured', isFeatured)
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }

      if (item !== null) {
        axios
          .put(`${baseURL}products/${item.id}`, formData, config)
          .then((res) => {
            if (res.status == 200 || res.status == 201) {
              Toast.show({
                topOffset: 60,
                type: 'success',
                text1: 'Product successfully updated!',
                text2: 'Thank you.',
              })

              setTimeout(() => {
                props.navigation.navigate('Products')
              }, 500)
            }
          })
          .catch((error) => {
            console.log(error)
            Toast.show({
              topOffset: 60,
              type: 'error',
              text1: 'Something went wrong',
              text2: 'Please try again!',
            })
          })
      } else {
        axios
          .post(`${baseURL}products`, formData, config)
          .then((res) => {
            if (res.status == 200 || res.status == 201) {
              Toast.show({
                topOffset: 60,
                type: 'success',
                text1: 'New product added',
                text2: ' ',
              })

              setTimeout(() => {
                props.navigation.navigate('Products')
              }, 500)
            }
          })
          .catch((error) => {
            Toast.show({
              topOffset: 60,
              type: 'error',
              text1: 'Something went wrong :(',
              text2: 'Please try again!',
            })
          })
      }
    }
  }

  return (
    <NativeBaseProvider>
      <FormContainer title='Add Product'>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: mainImage }} />
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <Icon color={'white'} name='camera' as={FontAwesome} />
          </TouchableOpacity>
        </View>
        <View style={styles.label}>
          <Text style={{ textDecorationLine: 'underline' }}>Brand</Text>
        </View>
        <Input
          placeholder='Brand'
          name='brand'
          id='brand'
          value={brand}
          onChangeText={(text) => setBrand(text)}
        />
        <View style={styles.label}>
          <Text style={{ textDecorationLine: 'underline' }}>Name</Text>
        </View>
        <Input
          placeholder='Name'
          name='name'
          id='name'
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <View style={styles.label}>
          <Text style={{ textDecorationLine: 'underline' }}>Price</Text>
        </View>
        <Input
          placeholder='Price'
          name='price'
          id='price'
          value={price.toString()}
          keyboardType={'numeric'}
          onChangeText={(text) => setPrice(text)}
        />

        <View style={styles.label}>
          <Text style={{ textDecorationLine: 'underline' }}>Stock</Text>
        </View>
        <Input
          placeholder='Stock'
          name='stock'
          id='stock'
          value={countInStock.toString()}
          keyboardType={'numeric'}
          onChangeText={(text) => setCountInStock(text)}
        />
        <View style={styles.label}>
          <Text style={{ textDecorationLine: 'underline' }}>Description</Text>
        </View>
        <Input
          placeholder='Description'
          name='description'
          id='description'
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <Center>
          <Box maxW='300'>
            <Select
              selectedValue={selectValue}
              minWidth='200'
              accessibilityLabel='Choose Service'
              placeholder='Select your Category'
              _selectedItem={{
                bg: 'gainsboro',
                endIcon: (
                  <Icon color={'#007aff'} name='arrow-down' as={FontAwesome} />
                ),
              }}
              mt={1}
              iosIcon={
                <Icon color={'#007aff'} name='arrow-down' as={FontAwesome} />
              }
              placeholderStyle={{ color: '#007aff' }}
              placeholderIconColor='#007aff'
              _actionSheetContent={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
              onValueChange={(e) => [setSelectValue(e), setCategory(e)]}>
              {categories.map((c) => {
                return <Select.Item key={c._id} label={c.name} value={c._id} />
              })}
            </Select>
          </Box>
        </Center>
        <View style={styles.buttonContainer}>
          {!!error ? <Error message={error} /> : null}
          <EasyButton large primary onPress={() => addProduct()}>
            <Text style={styles.buttonText}>Confirm</Text>
          </EasyButton>
        </View>
      </FormContainer>
    </NativeBaseProvider>
  )
}

const styles = StyleSheet.create({
  label: {
    width: '80%',
    marginTop: 10,
  },
  buttonContainer: {
    width: '80%',
    marginBottom: 80,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderStyle: 'solid',
    borderWidth: 8,
    padding: 0,
    justifyContent: 'center',
    borderRadius: 100,
    borderColor: '#E0E0E0',
    elevation: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  imagePicker: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    backgroundColor: 'gray',
    padding: 8,
    borderRadius: 100,
    elevation: 20,
  },
})

export default ProductForm
