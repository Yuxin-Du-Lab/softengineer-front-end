const user = {
    state: {
        //属性
        TokenStored: ''
    },
    mutations: {
        //set方法
        setTokenStored(state, TokenValue) {
            console.log('$store run setTokenStored: TokenValue:' + TokenValue)
            state.TokenStored = TokenValue
        }
    },
    getters: {
        getTokenStored: state => state.TokenStored
    },
}

export default user

