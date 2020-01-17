const state = {
  options: []
}

const mutations = {
  SET_BLOG_OPTIONS: (state, options) => {
    console.log(options, 'optionsoptionsoptions')
    state.options = options
  }
}

const actions = {

  // 存储帖子类型options
  setOptionsData({ commit, options }) {
    return new Promise(resolve => {
      commit('SET_BLOG_OPTIONS', options)
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

