import axios from 'axios'

import Request from './request'

const API_CONSTANTS = {
  BASE_URL: 'http://api.openweathermap.org/data/2.5/',
  timeout: 3000
}

Request.init(axios, API_CONSTANTS, (err) => {
  console.error('Error occured', err)
})

export const weatherApi = (url, params = {}) => Request.fetch(url, params)
