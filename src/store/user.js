const user = {
    state: {
        token: sessionStorage.getItem('token'),
        userInfo: {
            username: sessionStorage.getItem('username'),
            nickname: sessionStorage.getItem('nickname'),
            id: sessionStorage.getItem('id'),
        },
    },
    mutations: {
        setUser (state, info) {
            state.userInfo = info
            sessionStorage.setItem('username', info.username)
            sessionStorage.setItem('id', info.id)
            sessionStorage.setItem('nickname', info.nickname)
        },
        setToken (state, tokenIn) {
            state.token = tokenIn
            sessionStorage.setItem('token', tokenIn)
        },
        setNickName(state, nickname) {
            state.userInfo.nickname = nickname
            sessionStorage.setItem('nickname', nickname)
        },
        logout (state) {
            state.token = ''
            state.userInfo = {
                username: '',
                nickname: '',
                id: '',
            }
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('username')
            sessionStorage.removeItem('nickname')
            sessionStorage.removeItem('id')
        },
    },
    getters: {
        TokenStored: state => state.token,
        Name: state => state.userInfo.name,
        NickName: state => state.userInfo.nickname,
        Id: state => state.userInfo.id,
    },
}

export default user

