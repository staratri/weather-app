<template>
  <div id="app">
    <WeatherWidget />
  </div>
</template>

<script>
import WeatherWidget from './components/WeatherWidget.vue'

export default {
  name: 'App',
  components: {
    WeatherWidget
  }
}
</script>

<style lang="scss">
// Reset properties
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
ol, ul {
  list-style: none;
}
* {
  font-family: 'Roboto', sans-serif!important;
}

body {
   background: #96d1dc;
}
#app {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.button-wrapper {
  // Borrowed from https://gist.github.com/MoOx/9137295
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  overflow: visible;
  color: inherit;
  font: inherit;
  line-height: normal;

  /* Corrects font smoothing for webkit */
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;

    /* Corrects inability to style clickable `input` types in iOS */
  -webkit-appearance: none;
}
</style>
