<template>
  <div class="loader">
      <img src="../assets/loader.svg" >
  </div>
</template>

<script>

export default {
  name: 'Loader'
}
</script>

<style lang="scss" scoped>
.loader {
    width: 100%;
    height: 116px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    img {
        width: 24px;
        height: 24px;
        animation: rotate 0.8s infinite;
    }
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
