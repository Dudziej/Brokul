<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-5" elevation="2">
          <v-card-title class="text-h5">
            Generowanie Raportu Sprzedaży
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-menu
                  ref="startMenu"
                  v-model="menu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateRange.start"
                      label="Data początkowa"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="dateRange.start" @input="menu1 = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="4">
                <v-menu
                  ref="endMenu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateRange.end"
                      label="Data końcowa"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="dateRange.end" @input="menu2 = false"></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  :items="customers"
                  item-text="name"
                  item-value="_id"
                  label="Wybierz klienta"
                  return-object
                  v-model="selectedCustomer"
                ></v-select>
              </v-col>
            </v-row>
            <v-btn @click="generateReport">Generuj Raport</v-btn>
          </v-card-text>
          <v-card-text>
            <v-data-table
              :headers="reportHeaders"
              :items="salesData"
              :items-per-page="5"
              class="elevation-1"
            ></v-data-table>
            <v-divider></v-divider>
            <div class="text-right pa-4">
              <span><strong>Łączna ilość:</strong> {{ totalQuantity }}</span>
              <span class="pl-4"><strong>Łączna wartość sprzedaży:</strong> {{ totalPrice | currency }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'SalesReport',
  data() {
    return {
      menu1: false,
      menu2: false,
      selectedCustomer: null,
      dateRange: {
        start: null,
        end: null
      },
      reportHeaders: [
        { text: 'Nazwa Produktu', value: 'name' },
        { text: 'Cena Jednostkowa', value: 'price' },
        { text: 'Sprzedana Ilość', value: 'soldQuantity' },
        { text: 'Całkowita Wartość Sprzedaży', value: 'totalSales' },
        { text: 'Nazwa Klienta', value: 'customerNames', sortable: false },
      ],
    };
  },
  computed: {
    ...mapGetters('sales', ['salesData']),
    ...mapGetters('customers', ['customers']),

    totalQuantity() {
      return this.salesData.reduce((sum, item) => sum + item.soldQuantity, 0);
    },
    totalPrice() {
      return this.salesData.reduce((sum, item) => sum + item.totalSales, 0);
    },
  },
  filters: {
    currency(value) {
      const formatter = new Intl.NumberFormat('pl-PL', {
        style: 'currency',
        currency: 'PLN',
        minimumFractionDigits: 2,
      });
      return formatter.format(value);
    },
  },
  methods: {
    ...mapActions('sales', ['fetchSalesData']),
    ...mapActions('customers', ['fetchCustomers']),

    generateReport() {
      const startDate = this.dateRange.start ? this.formatDate(this.dateRange.start) : undefined;
      const endDate = this.dateRange.end ? this.formatDate(this.dateRange.end) : undefined;
      const customerId = this.selectedCustomer ? this.selectedCustomer._id : undefined;
      this.fetchSalesData({ startDate, endDate, customerId });
    },

    formatDate(date) {
        if (date) {
            let dateObj = date instanceof Date ? date : new Date(date);
            return dateObj.toISOString().split('T')[0];
        }
        return null;
    },
  },
  mounted() {
    this.fetchCustomers();
  },
};
</script>
