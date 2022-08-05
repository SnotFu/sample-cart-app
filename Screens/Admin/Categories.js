import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Dimensions, TextInput, StyleSheet } from 'react-native'
import { Center, NativeBaseProvider } from 'native-base'
import baseUrl from '../../assets/common/baseUrl'
import EasyButton from '../../Shared/StyledComponents/EasyButton'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

var { width } = Dimensions.get('window')

const Item = (props) => {
  return (
    <View style={styles.item}>
      <Text numberOfLines={1} ellipsizeMode='tail' style={{maxWidth: '50%'}}>
        {props.item.name}
      </Text>
      <EasyButton danger medium onPress={() => props.delete(props.item._id)}>
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Delete</Text>
      </EasyButton>
    </View>
  )
}

const Categories = (props) => {
  const [categories, setCategories] = useState([])
  const [categoryName, setCategoryName] = useState()
  const [token, setToken] = useState()

  useEffect(() => {
    AsyncStorage.getItem('jwt')
    .then((res) => {
      setToken(res)
    })
    .catch((error) => console.log(error))

    axios
    .get(`${baseUrl}categories`)
    .then((res) => setCategories(res.data))
    .catch((error) => alert('Error loading categories...'))

    return () => {
      setCategories()
      setToken()
    }
  }, [])

  const addCategory = () => {
    const category = {
      name: categoryName,
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }

    axios
    .post(`${baseUrl}categories`, category, config)
    .then((res) => setCategories([...categories, res.data]))
    .catch((error) => alert('Error loading categories...'))

    setCategoryName('')
  }

  const deleteCategory = (id) => {

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    axios
      .delete(`${baseUrl}categories/${id}`, config)
      .then((res) => {
        const newCategories = categories.filter((item) => item.id !== id)
        setCategories(newCategories)
      })
      .catch((error) => alert('Error loading categories...'))
  }

  return (
    <View style={{ position: 'relative', height: '100%' }}>
      <View style={{ marginBottom: 60 }}>
        <FlatList
          data={categories}
          renderItem={({ item, index }) => <Item item={item} index={index} delete={deleteCategory} />}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.bottomBar}>
        <NativeBaseProvider>
          <Center>
            <Center>
              <Text>Add Category</Text>
            </Center>
          </Center>
        </NativeBaseProvider>
        <View style={{ width: width / 2.5 }}>
          <TextInput
            value={categoryName}
            style={styles.input}
            onChangeText={(text) => setCategoryName(text)}
          />
        </View>
        <View>
          <EasyButton
            medium
            primary
            onPress={() => addCategory()}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>
          </EasyButton>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: 'white',
    width: width,
    height: 60,
    padding: 2,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0

  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  item: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    padding: 5,
    margin: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 5,
  }

})

export default Categories
