import {combineReducers} from 'redux'
import category from './category'
import menu from './menu'
import transaksi from './transaksi'
const appReducer = combineReducers({
    category,
    menu,
    transaksi
})


export default appReducer   