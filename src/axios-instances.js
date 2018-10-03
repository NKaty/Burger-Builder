import axios from 'axios'

export const axiosOrders = axios.create({
  baseURL: 'https://react-my-burger-4a9c3.firebaseio.com/'
})

export const axiosAuth = axios.create({
  baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/'
})
