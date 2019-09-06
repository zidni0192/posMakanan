import axios from 'axios'
import host from '../host'
export const getAllMenus = () => {
    return {
        type: 'GET_ALL_MENUS',
        payload: axios.get(`${host}/menu`)
    }
}
export const postMenu = (data) => {
    return {
        type: 'POST_MENUS',
        payload: axios.post(`${host}/menu`,data)
    }
}
export const patchMenu = (data,idMenu) => {
    return {
        type: 'PATCH_MENUS',
        payload: axios.patch(`${host}/menu/${idMenu}`,data)
    }
}
