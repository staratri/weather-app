<template>
  <div  class="detail">
      <template v-if="!isLoading">
        <div v-if="selectedDayWeather" class="detail__header">
          <h1> {{ Math.floor(selectedDayWeather.temp) }}&deg;C </h1>
          <img :src="getImgUrl(selectedDayWeather.icon)" alt="sun image">
        </div>
        <HourChart />
        <div v-if="selectedDayWeather" class="detail__weather">
          <div class="detail__weather--label">
            <p class="label">Pressure</p>
            <p class="value">{{ selectedDayWeather.pressure }} hpa</p>
          </div>
          <div class="detail__weather--label">
            <p class="label">Humitdity</p>
            <p class="value">{{ selectedDayWeather.humidity }}%</p>
          </div>
        </div>
        <div v-if="selectedDayWeather" class="detail__day-time">
          <p> Sunrise <span> {{ getTimeSuffix(selectedDayWeather.sunrise) }} </span> </p>
          <p>Sunset <span>{{ getTimeSuffix(selectedDayWeather.sunset) }}</span> </p>
        </div>
      </template>
      <Loader v-else />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import { getImgUrl } from '@/utils/helper'
import { getTimeSuffix } from '@/utils/dateHelpers'
import HourChart from '@/components/HourChart'

import Loader from '@/components/Loader'

export default {
  name: 'DetailCard',
  components: {
    Loader,
    HourChart
  },
  computed: {
    ...mapState('weather', ['isLoading']),
    ...mapGetters('weather', ['selectedDayWeather'])
  },
  methods: {
    getImgUrl,
    getTimeSuffix
  }
}
</script>

<style lang="scss" scoped>
.detail {
    box-shadow: $shadow;
    background: #ffffff;
    border-radius: $border-radius;
    padding: $spacer/1.5;
    font-weight: bold;
    height: 323px;
    &__header {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: $spacer/6;
        h1 {
            font-size: 42px;
            font-weight: bold;
        }
        img {
            margin-left: $spacer/4;
            width: 48px;
            height: 48px;
        }
    }

    &__weather, &__day-time  {
      margin-top: $spacer/2;
      display: flex;
    }

    &__weather {
      &--label {
        background: #f5faff;
        flex: 1;
        padding: $spacer/3 $spacer/2;
        & + & {
          margin-left: $spacer/2;
        }
        .value {
          margin-top: $spacer/6;
          font-size: 14px;
        }
      }
    }

    &__day-time {
      justify-content: space-between;
      span {
        display: block;
        color: $secondary-color;
        margin-top: $spacer/6;
      }
    }
}
</style>
