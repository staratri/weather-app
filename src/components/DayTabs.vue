<template>
  <Carousel v-if="!isLoading && dailyForecasts.length" :paginationEnabled="false" :per-page="3" class="tabs" :class="{'loader-active': !dailyForecasts.length }">
      <template>
          <Slide v-for="(forecast, index) in dailyForecasts" :key="`tab--${index}`" >
            <button :class="{'tab--selected': (selectedDayId === index)}" class="button-wrapper tab" @click="setSelectedDayId(index)">
                <p class="tab__day">{{ forecast.day }}</p>
                <p class="tab__temp">{{ forecast.min }}&deg; <span> {{ forecast.max }}&deg; </span></p>
                <img :src="getImgUrl(forecast.weather)" class="icon tab__icon">
                <p class="tab__weather">{{ forecast.weather }}</p>
            </button>
        </Slide>
      </template>
  </Carousel>
  <Loader v-else />
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'

import { Carousel, Slide } from 'vue-carousel'

import Loader from '@/components/Loader'
import { getImgUrl } from '@/utils/helper'

export default {
  name: 'DayTabs',
  components: {
    Carousel,
    Slide,
    Loader
  },
  computed: {
    ...mapState('weather', ['isLoading', 'selectedDayId']),
    ...mapGetters('weather', ['dailyForecasts'])
  },
  methods: {
    ...mapMutations('weather', ['setSelectedDayId']),
    getImgUrl
  }
}
</script>

<style lang="scss" scoped>
.tabs {
    display: flex;
    margin: $spacer/1.5 0;
    padding: 0 $spacer/3;
    .VueCarousel-slide  {
        padding: 1px;
    }
}

.tab {
    padding: $spacer/3;
    font-weight: bold;
    letter-spacing: 1px;
    &:focus {
        outline: none;
    }
    &--selected {
        border: 2px solid $outline-color;
        background: #fffdf5;
    }

    &__icon {
        margin: $spacer/4 0;
    }
    &__temp {
        // white-space: no-wrap;
        display: flex;
        span {
            margin-left: $spacer/6;
            color: $secondary-color;
        }
    }

    &__weather {
        color: $secondary-color;
        font-size: 14px;
        font-weight: normal;
    }
}

.loader-active {
    min-height: 115px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
