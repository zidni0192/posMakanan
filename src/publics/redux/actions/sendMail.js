import axios from 'axios'
import host from '../host'
export const postMail = (email) => {
    return {
        type: 'POST_MAIL',
        payload: axios.post(`${host}/mail`,{email:email})
    }
}