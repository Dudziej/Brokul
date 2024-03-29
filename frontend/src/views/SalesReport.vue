<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-5" elevation="2">
          <v-card-title class="text-h5">
            Generowanie Raportu Sprzedaży
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-menu ref="startMenu"
                        v-model="menu1"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="dateRange.start"
                                  label="Data początkowa"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on">
                    </v-text-field>
                  </template>
                  <v-date-picker v-model="dateRange.start" 
                                 @input="menu1 = false">
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="4">
                <v-menu ref="endMenu"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field v-model="dateRange.end"
                                  label="Data końcowa"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-bind="attrs"
                                  v-on="on">
                                </v-text-field>
                  </template>
                  <v-date-picker v-model="dateRange.end" 
                                 @input="menu2 = false">
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="4">
                <v-select :items="customers"
                          item-text="name"
                          item-value="_id"
                          label="Wybierz klienta"
                          return-object
                          v-model="selectedCustomer">
                </v-select>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-row justify="space-between">
                <v-col cols="12" sm="auto">
                  <v-btn color="primary" class="mx-1" @click="generateReport" data-testid="generate-raport-button">Generuj Raport</v-btn>
                  <v-btn color="error" class="mx-1" @click="resetReport" data-testid="reset-raport-button">Resetuj Raport</v-btn>
                </v-col>
                <v-col cols="12" sm="auto" class="d-flex justify-end">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn v-bind="attrs"
                             v-on="on"
                             :disabled="!canExportReport"
                             @click="exportToCsv">
                        <v-icon>mdi-file-export-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>Eksportuj raport do CSV</span>
                  </v-tooltip>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card-text>
          <v-card-text>
            <v-data-table :headers="reportHeaders"
                          :items="salesData"
                          :items-per-page="5"
                          class="elevation-1">
                <template v-slot:[`item.price`]="{ item }">
                    {{ item.price | currency }}
                </template>
                <template v-slot:[`item.totalSales`]="{ item }">
                    {{ item.totalSales | currency }}
                </template>
            </v-data-table>
            <v-divider></v-divider>
            <div class="text-right pa-4">
              <span><strong>Łączna ilość:</strong> {{ totalQuantity }}</span>
              <span class="pl-4"><strong>Łączna wartość sprzedaży:</strong> {{ totalPrice | currency }}</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-5" elevation="2">
          <v-card-title class="text-h5">Udział Sprzedaży Produktów</v-card-title>
          <v-card-text>
            <pie-chart :chart-data="chartData"
                       :options="chartOptions"
                       v-if="chartData && chartData.datasets && chartData.datasets.length > 0"
                       :key="chartDataKey"/>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PieChart from '../components/PieChart.vue';

export default {
  name: 'SalesReport',
  components: {
    PieChart,
  },
  data() {
    return {
      menu1: false,
      menu2: false,
      isReportGenerated: false,
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
      chartDataKey: 0,
      chartData: {
        labels: [],
        datasets: [
          {
            label: 'Sprzedaż',
            backgroundColor: [],
            data: []
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
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

    canExportReport() {
      return this.isReportGenerated && this.salesData && this.salesData.length > 0;
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
    ...mapActions('sales', ['fetchSalesData', 'resetSalesData']),
    ...mapActions('customers', ['fetchCustomers']),

    async generateReport() {
      const startDate = this.dateRange.start ? this.formatDate(this.dateRange.start) : undefined;
      const endDate = this.dateRange.end ? this.formatDate(this.dateRange.end) : undefined;
      const customerId = this.selectedCustomer ? this.selectedCustomer._id : undefined;

      try {
        await this.fetchSalesData({ startDate, endDate, customerId });
        this.generateChartData();
        this.isReportGenerated = true;
      } catch (error) {
        console.error('Error generating report:', error);
        this.isReportGenerated = false;
      }
    },

    generateChartData() {
      const productNames = this.salesData.map(data => data.name);
      const productSales = this.salesData.map(data => data.totalSales);

      this.chartData = {
        labels: productNames,
        datasets: [
          {
            label: 'Sprzedaż',
            backgroundColor: this.generateColors(productNames.length),
            data: productSales
          }
        ]
      };
      this.chartDataKey++;
    },

    generateColors(count) {
      const colors = [];
      for (let i = 0; i < count; i++) {
        const color = `hsl(${360 * Math.random()}, 50%, 50%)`;
        colors.push(color);
      }
      return colors;
    },

    resetReport() {
      this.dateRange.start = null;
      this.dateRange.end = null;
      this.selectedCustomer = null;
      this.chartData = null;
      this.chartDataKey++;
      this.resetSalesData();
      this.isReportGenerated = false;
    },

    formatDate(date) {
      if (date) {
        let dateObj = date instanceof Date ? date : new Date(date);
        return dateObj.toISOString().split('T')[0];
      }
      return null;
    },

    exportToCsv() {
      const headers = this.reportHeaders.map(h => `"${h.text}"`).join(',');

      const data = this.salesData.map(row =>
        this.reportHeaders.map(header => `"${row[header.value]}"`).join(',')
      );

      const csvContent = `data:text/csv;charset=utf-8,${headers}\n${data.join('\n')}`;

      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'raport_sprzedazy.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  },
  mounted() {
    this.fetchCustomers();
  },
};
</script>
