import axios from 'axios';

const instanse = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': '2dabb5ba-96df-4f73-ab92-c98e6cb2ad10'
  }
})

const usersAPI = {
  getUsers: (currentPage = 1, pageSize = 10) => {
    return instanse.get(`users?page=${currentPage}&count=${pageSize}`)
      .then( response => response.data )
  },

  follow: (userId) => {
    return instanse.post(`follow/${userId}`, {})
  },

  unfollow: (userId) => {
    return instanse.delete(`follow/${userId}`, {})
  }
}


export const authAPI = {
  me: () => {
    return instanse.get(`auth/me`)
  },
  login: (email, password, rememberMe = false) => {
    return instanse.post(`auth/login`, {email, password, rememberMe})
  },
  logout: () => {
    return instanse.delete(`auth/login`)
  }
}

export const profileAPI = {
  getProfile: (userId) => {
    return instanse.get(`profile/${userId}`)
  },
  getStatus: (userId) => {
    return instanse.get(`profile/status/${userId}`)
  },
  updateStatus: (status) => {
    return instanse.put(`profile/status`, {status})
  }
}

export const securityAPI = {
  getCaptchaUrl: () => {
    return instanse.get(`security/get-captcha-url`)
  }
}

export default usersAPI