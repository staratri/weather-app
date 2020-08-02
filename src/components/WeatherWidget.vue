<template>
  <div class="widget">
    <SearchBar :current-location="currentLocation" />
    <DayTabs :forecasts="forecasts" />
    <DetailCard />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import DayTabs from '@/components/DayTabs.vue'
import SearchBar from '@/components/SearchBar.vue'
import DetailCard from '@/components/DetailCard.vue'

export default {
  name: 'WeatherWidget',
  components: {
    DayTabs,
    SearchBar,
    DetailCard
  },
  data () {
    return {
      currentLocation: {},
      forecasts: []
    }
  },
  computed: {
    ...mapState('weather', ['location'])
  },
  async created () {
    await this.updateUserLocation()
  },
  methods: {
    ...mapActions('weather', ['updateUserLocation'])
  }
}
</script>

<style lang="scss" scoped>
.widget {
  width: 300px;
  // Widget should be expected to place where the width is fixed by parent
  background: #ffffff;
  box-shadow: $shadow;
  padding: $spacer/2;
  border-radius: $border-radius;
  border: 3px solid #d0d9d9;
}
</style>
