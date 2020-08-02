export const getImgUrl = pic => {
  const images = require.context('../assets/', false, /\.svg$/)
  return images('./' + pic.toLowerCase() + '.svg')
}
