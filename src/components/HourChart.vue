<template>
<div v-if="hoursVariation" class="chartWrapper">
    <div class="chartAreaWrapper">
        <canvas id="myChart" height="500" width="4000"></canvas>
    </div>
</div>
</template>
<script>
import Chart from 'chart.js'
import { mapGetters } from 'vuex'

export default {
  name: 'HourChart',
  data: () => ({
    state: 0
  }),
  computed: {
    ...mapGetters('weather', ['hoursVariation'])
  },

  mounted () {
    var ctx = document.getElementById('myChart') && document.getElementById('myChart').getContext('2d')
    const chart = ctx && new Chart(ctx, {
      type: 'line',
      // The data for our dataset
      data: {
        labels: this.hoursVariation?.labels || [],
        datasets: [{
          label: 'My First dataset',
          fill: false,
          pointBorderWidth: 3,
          pointRadius: 5,
          pointStyle: 'circle',
          borderColor: '#77c3ef',
          backgroundColor: '#ffffff',
          data: this.hoursVariation?.data || []
        }]
      },

      options: {
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.yLabel
            }
          }
        },
        scales: {
          scaleLineColor: 'transparent',
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value, index, values) {
                return ''
              }
            },
            gridLines: {
              drawBorder: false,
              display: false
            }
          }],
          xAxes: [{
            gridLines: {
              display: true,
              drawBorder: false
            }
          }]
        }
      }
    })
    console.log(chart)
  }
}
</script>

<style lang="scss" scoped>
.chartWrapper {
    position: relative;
    overflow: auto;
}

.chartWrapper > canvas {
    position: absolute;
    left: 0;
    top: 0;
    pointer-events:none;
}

.chartAreaWrapper {
    width: 1000px;
}

.chartWrapper::-webkit-scrollbar {
  width: 1em;
  height: 8px;
  border-radius: $border-radius;
}

.chartWrapper::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

.chartWrapper::-webkit-scrollbar-thumb {
  background-color: $outline-color;
  outline: 1px solid $outline-color;
}
</style>
