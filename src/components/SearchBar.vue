<script>
import { getImgUrl } from '@/utils/helper'

import debounce from 'lodash/debounce'
import { mapState, mapActions } from 'vuex'

const CITIES_MOCK = [
  {
    name: 'Mumbai',
    state: 'Maharashtra',
    icon: 'rain',
    temp: '29'
  },
  {
    name: 'Delhi',
    state: 'New Delhi',
    icon: 'clear',
    temp: 42
  },
  {
    name: 'Agra',
    state: 'Uttar Pradesh',
    icon: 'clouds',
    temp: 38

  },
  {
    name: 'Pune',
    state: 'Maharashtra',
    icon: 'rain',
    temp: 28
  }
]

export default {
  name: 'SearchBar',
  data () {
    return {
      searchText: '',
      cityOptions: CITIES_MOCK,
      hideCityOption: false,
      isSearching: false
    }
  },
  computed: {
    ...mapState('weather', ['location']),
    showableCities () {
      return this.cityOptions.filter(option => {
        return option.name.toLowerCase().includes(this.searchText.toLowerCase())
      })
    },
    isCitySelectionVisible () {
      return !!this.showableCities.length && this.showableCities.length !== this.cityOptions.length && !this.hideCityOption
    },
    city: {
      get () {
        if (this.searchText) {
          return this.searchText
        } else if (!this.isSearching) {
          return this.location.name
        }
        return ''
      },
      set (newValue) {
        if (this.hideCityOption) {
          this.hideCityOption = false
        }
        this.searchText = newValue
      }
    }
  },
  methods: {
    debounce,
    getImgUrl,
    ...mapActions('weather', ['updateUserLocation']),
    selectCity (name) {
      this.searchText = name
      this.hideCityOption = true
    },
    fetchCityTemp () {
      if (this.searchText) {
        this.updateUserLocation({ q: this.searchText })
      }
    },
    resetInput () {
      this.isSearching = false
    }
  }
}
</script>

<template>
  <div class="search">
    <form>
      <img src="../assets/location.svg" class="search__icon" alt="location logo">
      <input type="text" class="search__input" v-model="city" @focus="isSearching = true" @blur="resetInput" @keypress.enter.prevent="fetchCityTemp" >
    </form>
    <button class="button-wrapper" @click.prevent="fetchCityTemp"><img src="../assets/search.svg" class="search__icon" alt="location logo"></button>

    <ul class="search__options" :class="{ 'search__options--hide' : !isCitySelectionVisible }">
      <li v-for="(city, index) in showableCities" :key="`city--${index}`" @click="selectCity(city.name)" class="city">
        <p class="city__name">{{ city.name }}, <span> {{ city.state }} </span> </p>
        <div class="city__weather">
          <p>{{ city.temp }}&deg;C <span> {{ city.icon }} </span></p>
          <img :src="getImgUrl(city.icon)" class="search__icon" alt="rain" >
        </div>
      </li>
    </ul>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.search {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: $border-radius;
  box-shadow: $shadow;
  position: relative;

  form {
    width: 100%;
    display: flex;
    padding: $spacer/2 $spacer/1.5;
  }
  .button-wrapper {
    padding: $spacer/3;
  }
  &__input {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    font-size: 14px;
    // font-family: "Roboto", sans-serif;
    letter-spacing: 1px;
    padding-left: 10px;
    font-weight: bold;
    text-transform: capitalize;
    border: none;
    &:focus {
      outline: none;
    }
  }

  &__icon {
    width: 20px;
    height: 20px;
  }

  &__options {
    font-size: 14px;
    letter-spacing: 1px;
    font-weight: bold;
    position: absolute;
    border-radius: $border-radius;
    box-shadow: 0 5px 10px 0 rgba(32, 33, 36, 0.28);
    top: 101%;
    background: #ffffff;
    width: 100%;
    left: 0;
    z-index: 1;
    .city {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: $spacer/2 $spacer/1.5;
      &__name span {
        color: gray;
      }
      &__weather {
        display: flex;
        align-items: center;
        p {
          font-weight: bold;
          span {
            font-weight: normal;
            display: block;
            font-size: 12px;
          }
        }
        p + img {
          margin-left: $spacer/5;
        }
      }
    }
    &--hide {
      display: none;
    }
    li + li {
      border-top: 1px solid lightgray
    }
  }
}
</style>
