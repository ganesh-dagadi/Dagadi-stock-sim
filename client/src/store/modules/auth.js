const state = {
    loggedInUser: {

    },
    isLoggedIn: false
}

const getters = {
    loggedInUser: state => state.loggedInUser,
    isLoggedIn: state => state.isLoggedIn
}

const actions = {
    setLoggedInUser: ({ commit }, user) => {
        commit("setLoggedInUser", user);
    },
    syncAuthLocalStorage({ commit }) {

        const authData = JSON.parse(localStorage.getItem('auth_data'));

        if (authData) {

            commit("syncAuthLocalStorage", authData);
        }
    },
    clearAuthState: ({ commit }) => {
        commit("clearAuthState")
    }
}

const mutations = {
    setLoggedInUser: (state, user) => {
        state.loggedInUser = user;
        state.isLoggedIn = true;
        localStorage.setItem('auth_data', JSON.stringify(state));
    },
    syncAuthLocalStorage(state, authData) {
        state.loggedInUser = authData.loggedInUser;
        state.isLoggedIn = authData.isLoggedIn;
    },
    clearAuthState: state => {
        state.loggedInUser = {};
        state.isLoggedIn = false;
        localStorage.removeItem("auth_data");
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
