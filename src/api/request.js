let axiosInstance

function init (axios, config, callback) {
  axiosInstance = axios.create({
    baseURL: config.BASE_URL,
    timeout: config.TIMEOUT
  })

  axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config
  })

  // Add a response interceptor
  axiosInstance.interceptors.response.use(response => {
    // Do something with response data
    return response.data
  }, error => {
    // Mutate error state
    const serverErrorCode = 500
    const { status } = error.response
    if (status === serverErrorCode) {
      callback && callback(error)
    }
    // Temporarily return of promise, components not required to catch error,
    // Root Component (Supplier Framework) will watch error state and perform desrired actions
    return Promise.reject(error.response)
  })
}

const request = {
  init,
  fetch (url, data) {
    data.appId = 'ebb174f68e4e5dd0b55f5ba34d9e5ac4'
    return axiosInstance.get(url, {
      params: data
    })
  }
}

export default request
