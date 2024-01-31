<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        Lista Produktów
                        <v-spacer></v-spacer>
                    </v-card-title>
                    <v-data-table :headers="headers" :items="products" :items-per-page="5"
                        class="elevation-1"></v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'ProductsList',
    computed: {
        ...mapState('products', ['products']),
    },
    methods: {
        ...mapActions('products', ['fetchProducts']),
    },
    mounted() {
        this.fetchProducts();
    },
    data() {
        return {
            headers: [
                { text: 'Nazwa Produktu', value: 'name' },
                { text: 'Cena', value: 'price' },
            ],
        };
    },

};
</script>
  
  