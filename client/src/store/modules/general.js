const state = {
    error: '',
    msg: ''
}

const getters = {
    getError: state => state.error,
    getMsg: state => state.msg
}

const actions = {
    setError: ({ commit }, error) => {
        commit('setError', error)
    },
    setMsg: ({ commit }, msg) => {
        commit('setMsg', msg)
    }
}

const mutations = {
    setError: (state, error) => state.error = error,
    setMsg: (state, msg) => state.msg = msg
}

export default {
    state,
    getters,
    actions,
    mutations
}
