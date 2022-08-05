import { Platform } from 'react-native'

// UNCOMMENT below to run off Heroku
let baseURL = 'https://mcd-shop-server.herokuapp.com/api/v1/'

// UNCOMMENT below to run locally
// let baseURL = ''

// {
//   Platform.OS == 'android'
//     ? (baseURL = 'http://10.0.2.2:3000/api/v1/')
//     : (baseURL = 'http://localhost:3000/api/v1/')
// }

export default baseURL
