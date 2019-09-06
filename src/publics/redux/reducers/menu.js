const intialState = {
    menuList: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false
}
const menu = (state = intialState, action) => {
    switch (action.type) {
        case 'GET_ALL_MENUS_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'GET_ALL_MENUS_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_ALL_MENUS_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                menuList: action.payload.data
            }
        case 'POST_MENUS_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'POST_MENUS_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'POST_MENUS_FULFILLED':
            state.menuList.push(action.payload.data)
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
            }
        case 'PATCH_MENUS_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'PATCH_MENUS_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'PATCH_MENUS_FULFILLED':
            let data = state.menuList.find((item)=>Number(item.idMenu)===Number(action.payload.data.idMenu))
            let index = state.menuList.indexOf(data)
            state.menuList[index] = action.payload.data
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
            }
        default:
            return state
    }
}

export default menu