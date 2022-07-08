import axios from 'axios'
import router from './router';
import store from "./store"
const baseURL = 'http://localhost:3000'

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true

function refreshToken() {
    return new Promise((resolve, reject) => {
        axios({
            method: 'GET',
            url: 'http://localhost:3000/auth/newToken',
        })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

axios.interceptors.response.use(function (response) {
    return response;
}, async function (error) {
    try {
        const originalRequest = error.config
        const status = error.response.status;
        if (status == 409 || (status == 403 && !error.response.data.isRefreshTokenError)) return store.commit('setError', error.response.data.error);
        if (status == 400) return store.commit('setError', error.response.data.error)
        if (status == 302) router.push({ name: "login" })
        if (status == 401) {
            await refreshToken();
            return axios(originalRequest);
        }
        return Promise.reject(error);

    } catch (err) {
        return Promise.reject(err)
    }
})