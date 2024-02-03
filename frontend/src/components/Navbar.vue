<template>
  <v-app-bar app color="grey darken-3">
    <v-btn color="secondary" class=" mx-4 nav-button" to="/" icon>
      <v-img src="@/assets/logo.svg"
             alt="Logo"
             max-height="48"
             contain
             class="mx-2"/>
    </v-btn>

    <v-spacer></v-spacer>
    <v-menu offset-y transition="slide-x-transition">
      <template v-slot:activator="{ on, attrs }">
          <v-icon dark v-bind="attrs" v-on="on">mdi-menu</v-icon>
      </template>
      <v-list>
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