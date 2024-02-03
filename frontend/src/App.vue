<template>
  <v-app>
    <Navbar/>
    <v-main class="container-background">
      <router-view></router-view>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  }
}
</script>

<style scoped>
/* Nie dodałem pliku globalnego ze względu na tak małą ilość styli */
.container-background {
  background-image: url('~@/assets/brokul_pattern.jpg');
  background-size: cover; 
  background-repeat: no-repeat;
}
</style>
