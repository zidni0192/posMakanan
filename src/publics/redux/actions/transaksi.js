import axios from 'axios'
import host from '../host'
export const getAllTransaksi = (sort) => {
    return {
        type: 'GET_ALL_TRANSAKSI',
        payload: axios.get(`${host}/transaksi?sort=${sort}`)
    }
}
export const postTransaksi = (idTransaksi,total,detail,jumlah) => {
    return {
        type: 'POST_TRANSAKSI',
        payload: axios.post(`${host}/transaksi`,{idTransaksi:idTransaksi,total:total,detail:detail,jumlah:jumlah})
    }
}