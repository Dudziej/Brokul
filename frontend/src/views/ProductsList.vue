<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        Lista Produktów
                        <v-spacer></v-spacer>
                    </v-card-title>
                    <v-data-table :headers="headers" 
                                  :items="salesData" 
                                  :items-per-page="5"
                                  class="elevation-1">
                                  <template v-slot:[`item.totalSales`]="{ item }">
                                        {{ formatCurrency(item.totalSales) }}
                                  </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ProductsList',
  computed: {
    ...mapGetters('sales', ['salesData']),
  },
  methods: {
    ...mapActions('sales', ['fetchSalesData']),

    formatCurrency(value) {
    return `${Number(value).toFixed(2)} zł`;
    },

  },
  mounted() {
    this.fetchSalesData();
  },
  data() {
    return {
      headers: [
        { text: 'Nazwa Produktu', value: 'name' },
        { text: 'Cena', value: 'price' },
        { text: 'Sprzedana ilość', value: 'soldQuantity' },
        { text: 'Całkowita wartość sprzedaży', value: 'totalSales' },
      ],
    };
  },
};
</script>

  
  