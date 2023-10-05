import { login, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import MyStorage from '@/utils/cache'
// import { setItem } from '@/utils/cache'
import qs from 'qs'

const state = {
  token: getToken(),
  name: MyStorage.getItem('name') || '',
  avatar: MyStorage.getItem('avatar') || ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    MyStorage.setItem('name', name)
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    MyStorage.setItem('avatar', avatar)
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login(qs.stringify({ phone: username.trim(), verifCode: password, loginType: 0 })).then(response => {
        const { result } = response;
        if(result.userType!='100'){
          MyStorage.setItem('companyId', result.id)
          MyStorage.setItem('companyName', result.name)
          MyStorage.setItem('lng', result.lng)
          MyStorage.setItem('lat', result.lat)

          commit('SET_TOKEN', response.token || '123456789')
          commit('SET_NAME', result.name)
          commit('SET_AVATAR', result.icon)
          setToken(response.token || '123456789')
          resolve()
        }else{
          reject(new Error("无效账号"));
        }
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
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      MyStorage.clear()
      commit('SET_TOKEN', '')
      commit('SET_NAME', '')
      commit('SET_AVATAR', '')
      removeToken()
      resetRouter()
      resolve()
    })
  },
  // logout({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token).then(() => {
  //       commit('SET_TOKEN', '')
  //       removeToken()
  //       resetRouter()
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
