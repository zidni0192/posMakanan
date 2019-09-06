import axios from 'axios'
import host from '../host'
export const getAllCategory = () => {
    return {
        type: 'GET_ALL_CATEGORY',
        payload: axios.get(`${host}/category`)
    }
}