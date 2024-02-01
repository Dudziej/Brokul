<template>
  <v-app-bar app color="grey darken-3" dark>
    <v-btn color="secondary" class="nav-button" to="/">
      <v-icon dark>mdi-home</v-icon>
    </v-btn>

    <v-spacer></v-spacer>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
          <v-icon dark class="nav-button" v-bind="attrs" v-on="on">mdi-menu</v-icon>
      </template>
      <v-list>
        <!-- <v-list-item to="/products">
          <v-list-item-title>Produkty</v-list-item-title>
        </v-list-item> -->
        <v-list-item to="/sales-report">
          <v-list-item-title>Raport sprzedaży</v-list-item-title>
        </v-list-item>
        <v-list-item to="/order-form">
          <v-list-item-title>Formularz zamówień</v-list-item-title>
        </v-list-item>
        <v-list-item to="/admin-panel">
          <v-list-item-title>Admin Panel</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>

export default {
  name: 'NavbarComponent'
}

</script>