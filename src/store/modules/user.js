import { login, logout, getInfo, getActionByRoleId } from '@/api/user'
import { getToken, setToken, removeToken, setId, getId, removeId, setAuth, removeAuth, getAuth, getRouter } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: getId(),
  avatar: '',
  router: [],
  auth: getAuth()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROUTER: (state, router) => {
    state.router = router
  }
}

const actions = {
  // user login
  setRouter({ commit }, router) {
    commit('SET_ROUTER', router)
  },
  login({ commit }, userInfo) {
    const { phone, code } = userInfo
    console.log(123)
    return new Promise((resolve, reject) => {
      login({ phone: phone, code: code }).then(response => {
        const { data } = response
        console.log(data)
        commit('SET_TOKEN', data.token)
        commit('SET_NAME', data.id)
        setToken(data.token)
        setId(data.id)
        setAuth(data.type)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getRoles({ commit }, userInfo) {
    console.log(123)
    return new Promise((resolve, reject) => {
      getActionByRoleId({ roleId: state.name }).then(response => {
        const { data } = response
        console.log(response)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        removeId()
        removeAuth()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    console.log('resetTokenresetTokenresetTokenresetToken')
    // return new Promise(resolve => {
    //   commit('SET_TOKEN', '')
    //   removeToken()
    //   resolve()
    // })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

