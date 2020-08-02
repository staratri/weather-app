import { weatherApi } from '@/api'
import { getDay, getTimeSuffix } from '@/utils/dateHelpers'

export const state = {
  isLoading: false,
  location: {},
  forecast: {},
  selectedDayId: 0
}

export const getters = {
  dailyForecasts: state => {
    const dayForecasts = state.forecast?.daily?.reduce((acc, crr, index) => {
      const obj = {
        min: Math.floor(crr.temp.min),
        max: Math.floor(crr.temp.max),
        weather: crr.weather[0].main,
        day: getDay(crr.dt * 1000),
        id: index
      }
      acc.push(obj)
      return acc
    }, []) || []
    return dayForecasts
  },
  selectedDayWeather: state => {
    const forecast = state.forecast
    if (forecast?.current) {
      return state.selectedDayId === 0
        ? {
          temp: forecast.current.temp,
          icon: forecast.current.weather[0].main,
          humidity: forecast.current.humidity,
          pressure: forecast.current.pressure,
          sunset: new Date(forecast.current.sunset * 1000).getHours(),
          sunrise: new Date(forecast.current.sunrise * 1000).getHours()
        }
        : {
          temp: forecast.daily[state.selectedDayId].temp.max,
          humidity: forecast.daily[state.selectedDayId].humidity,
          pressure: forecast.daily[state.selectedDayId].pressure,
          icon: forecast.daily[state.selectedDayId].weather[0].main,
          sunset: new Date(forecast.current.sunset * 1000).getHours(),
          sunrise: new Date(forecast.current.sunrise * 1000).getHours()
        }
    }
  },
  hoursVariation: state => {
    const maxThreshold = 24
    if (state.forecast.hourly) {
      return state.forecast.hourly.reduce((acc, crr, index) => {
        if (index < maxThreshold) {
          acc.labels.push([Math.floor(crr.temp), getTimeSuffix(new Date(crr.dt * 1000).getHours())])
          acc.data.push(Math.floor(crr.temp))
        }
        return acc
      }, { data: [], labels: [] })
    }
  }
}

export const mutations = {
  setLocation (state, location) {
    state.location = location
  },
  setForecast (state, forecast) {
    console.log(forecast)
    state.forecast = forecast
  },
  setSelectedDayId (state, dayId) {
    console.log(dayId)
    state.selectedDayId = dayId
  },
  setLoader (state, loadingState) {
    state.isLoading = loadingState
  }
}

export const actions = {
  updateUserLocation ({ commit, dispatch }, passedParams = {}) {
    navigator.geolocation.getCurrentPosition(async position => {
      let params
      if (passedParams.q) {
        params = passedParams
      } else if (position.coords.latitude) {
        params = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }
      } else {
        params = { q: 'Delhi' }
      }
      try {
        commit('setLoader', true)
        const location = await weatherApi('weather', params)
        await commit('setLocation', location)
        await dispatch('updateForecasts')
      } catch (err) {
        console.error(err)
      } finally {
        commit('setLoader', false)
      }
    })
  },
  async updateForecasts ({ commit, state }) {
    if (!state.location.coord) {
      return
    }
    const res = await weatherApi('onecall', {
      lat: state.location.coord.lat,
      lon: state.location.coord.lon,
      units: 'metric'
    })
    console.log(res)
    commit('setSelectedDayId', 0)
    return commit('setForecast', res)
  }
}
