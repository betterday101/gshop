<template>
  <div id="app">
    <router-view/>
    <foot-guide v-show="$route.meta.isShow"></foot-guide>
  </div>
</template>

<script>
import FootGuide from '@/components/FooterGuide/footerGuide.vue'

export default {
  name: 'App',
  components: {
    FootGuide
  },
  mounted(){
    this.$store.dispatch("getUserinfo");
  }
}
</script>

<style>

</style>
