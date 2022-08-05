import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import cartItems from './Reducers/cartItem'

const reducers = combineReducers({
  cartItems: cartItems,
})

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(reducers, composedEnhancer)

export default store
