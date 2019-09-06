const intialState = {
    transaksiList: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false
}
const transaksi = (state = intialState, action) => {
    switch (action.type) {
        case 'GET_ALL_TRANSAKSI_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'GET_ALL_TRANSAKSI_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_ALL_TRANSAKSI_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                transaksiList: action.payload.data
            }
        case 'POST_TRANSAKSI_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'POST_TRANSAKSI_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'POST_TRANSAKSI_FULFILLED':
            state.transaksiList.push(action.payload.data)
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
            }
        default:
            return state
    }
}

export default transaksi