<template>
  <v-app-bar app color="grey darken-3" dark>
    <v-btn color="primary" class="nav-button" to="/">
      Diety od Brokuła
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn color="primary" class="nav-button" to="/products">Produkty</v-btn>
    <v-btn color="primary" class="nav-button" to="/sales-report">Raport sprzedaży</v-btn>
    <v-btn color="primary" class="nav-button" to="/order-form">Formularz zamówień</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavbarComponent'
}
</script>

<style>
.nav-button {
  margin-left: 10px;
}
</style>
