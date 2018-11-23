<template>
  <div id="app">
    <div class="content-div">
        <router-view/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '@/demo/components/Footer'
export default {
  name: 'App',
  components: {
      Footer,
  }
}
</script>
