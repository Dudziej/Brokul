<template>
    <v-container>
      <!-- Lista produktów -->
      <v-row justify="center">
        <v-col md="6">
          <v-card>
            <v-card-title>
              Lista Produktów
              <v-spacer></v-spacer>
              <v-btn icon @click="showAddProductDialog">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-card-title>
            <ProductList />
          </v-card>
        </v-col>  
        <v-col md="6">
          <v-card>
            <v-card-title>
              Lista Klientów
              <v-spacer></v-spacer>
              <v-btn icon @click="showAddCustomerDialog">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-card-title>
            <CustomerList />
          </v-card>
        </v-col>
      </v-row>
  
      <AddDialog :dialog="addProductDialog"
                 @update:dialog="addProductDialog = $event" 
                 tag="product"/>
  
      <AddDialog :dialog="addCustomerDialog"
                 @update:dialog="addCustomerDialog = $event" 
                 tag="customer"/>

    </v-container>
  </template>
  
  <script>
  import ProductList from '../components/ProductsList.vue';
  import CustomerList from '../components/CustomerList.vue';
  import AddDialog from '../components/AddDialog.vue';
  
  export default {
    name: 'AdminPanel',
    components: {
      ProductList,
      CustomerList,
      AddDialog,
    },
    data() {
      return {
        addProductDialog: false,
        addCustomerDialog: false,
      };
    },
    methods: {
      showAddProductDialog() {
        this.addProductDialog = true;
      },
      showAddCustomerDialog() {
        this.addCustomerDialog = true;
      },
    },
  };
  </script>
  