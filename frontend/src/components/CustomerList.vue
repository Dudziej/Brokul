<template>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-data-table :headers="headers"
                          :items="customers"
                          :items-per-page="5"
                          class="elevation-1">
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'CustomersList',
    computed: {
        ...mapGetters('customers', ['customers']),
    },
    methods: {
        ...mapActions('customers', ['fetchCustomers']),
    },
    mounted() {
        this.fetchCustomers();
    },
    data() {
        return {
            headers: [
                { text: 'Nazwa Organizacji', value: 'name' },
                { text: 'Adres', value: 'address' },
            ],
        };
    },
};
</script>
  