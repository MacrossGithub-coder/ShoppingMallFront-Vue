import axios from 'axios'

const service = axios.create({
    baseURL : "http://112.124.18.163",
    // baseURL : "http://192.168.0.106:8888",
    timeout : 5000
})

export default service