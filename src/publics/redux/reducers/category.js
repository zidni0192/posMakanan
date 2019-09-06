const intialState = {
    categoryList: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false
}
const category = (state = intialState, action) => {
    switch (action.type) {
        case 'GET_ALL_CATEGORY_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'GET_ALL_CATEGORY_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_ALL_CATEGORY_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                categoryList: action.payload.data
            }
        default:
            return state
    }
}

export default category