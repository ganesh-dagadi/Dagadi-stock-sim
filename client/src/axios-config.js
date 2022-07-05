import axios from 'axios'
import store from "./store"
const baseURL = 'http://localhost:3000'

axios.defaults.baseURL = baseURL;

axios.interceptors.response.use(function (response) {
    return response;
}, async function (error) {
    const status = error.response.status;
    if (status == 409 || status == 403) return store.commit('setError', error.response.data.error);
    return Promise.reject(error);
})