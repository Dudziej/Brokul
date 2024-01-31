<template>
    <v-app-bar app color="grey darken-3" dark>
      <v-toolbar-title>Diety od Brokuła</v-toolbar-title>
  
      <v-spacer></v-spacer>
  
      <v-btn color="primary" to="/products">Produkty</v-btn>
      <v-btn color="primary" to="/sales-report">Raport sprzedaży</v-btn>
    </v-app-bar>
  </template>
  
  <script>
  export default {
    name: 'Navbar-Component'
  }
  </script>
  