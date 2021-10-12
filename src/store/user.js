const user = {
    state: {
        token: sessionStorage.getItem('token'),
        userInfo: {
            username: sessionStorage.getItem('username'),
            nickname: sessionStorage.getItem('nickname'),
            id: sessionStorage.getItem('id'),
        },
        img_url: sessionStorage.getItem('img_url'),
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
        setImgUrl(state, img_url) {
            state.img_url = img_url
            sessionStorage.setItem('img_url', img_url)
        },
        logout (state) {
            state.token = ''
            state.userInfo = {
                username: '',
                nickname: '',
                id: null,
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
        Img_url: state => state.img_url,
    },
}

export default user

