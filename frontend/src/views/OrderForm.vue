<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>
                        Tworzenie Zamówienia
                    </v-card-title>
                    <v-card-text>
                        <v-autocomplete label="Wybierz klienta" 
                                        v-model="selectedCustomer" 
                                        :items="customers"
                                        item-text="name" 
                                        item-value="_id" 
                                        return-object>
                                    </v-autocomplete>
                        <v-menu ref="menu" 
                                v-model="menu" 
                                :close-on-content-click="false" 
                                transition="scale-transition"
                                offset-y 
                                min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field v-model="orderDate" 
                                              label="Data zamówienia" 
                                              prepend-icon="mdi-calendar"
                                              readonly 
                                              v-bind="attrs" 
                                              v-on="on">
                                            </v-text-field>
                            </template>
                            <v-date-picker v-model="orderDate" 
                                           no-title 
                                           @input="menu = false">
                                        </v-date-picker>
                        </v-menu>
                        <v-autocomplete label="Wybierz produkt" 
                                        v-model="selectedProduct" 
                                        :items="productsWithDetails"
                                        item-text="nameWithPrice" 
                                        item-value="_id" 
                                        return-object>
                                    </v-autocomplete>
                        <v-text-field label="Ilość" 
                                      type="number" 
                                      v-model="productQuantity">
                                    </v-text-field>
                        <v-btn class="mr-4" 
                               color="success" 
                               @click="addProductToOrder">
                            Dodaj produkt do zamówienia
                        </v-btn>
                        <v-list>
                            <v-list-item v-for="(item, index) in orderProducts" :key="index">
                                <v-list-item-content>
                                    {{ item.product.name }} - {{ item.quantity }} szt.
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn icon @click="removeProductFromOrder(index)">
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                        <div>
                            <h3>Całkowita kwota: {{ totalAmount.toFixed(2) }} zł</h3>
                        </div>
                        <v-btn color="primary" @click="submitOrder">Złóż zamówienie</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>

import { mapActions, mapState } from 'vuex';

export default {
    data() {
        return {
            selectedCustomer: null,
            selectedProduct: null,
            productQuantity: 1,
            orderDate: new Date().toISOString().substr(0, 10),
            menu: false,
            orderProducts: [],
        };
    },
    computed: {
        ...mapState('customers', ['customers']),
        ...mapState('products', ['products']),
        productsWithDetails() {
            return this.products.map(product => ({
                ...product,
                nameWithPrice: `${product.name} - ${product.price} zł`
            }));
        },
        totalAmount() {
            return this.orderProducts.reduce((total, product) => {
                return total + (product.quantity * product.product.price);
            }, 0);
        }
    },

    created() {
        this.fetchCustomers();
        this.fetchProducts();
    },
    methods: {
        ...mapActions('customers', ['fetchCustomers']),
        ...mapActions('products', ['fetchProducts']),
        ...mapActions('orders', ['addOrder', 'fetchOrders']),

        addProductToOrder() {
            if (this.selectedProduct && this.productQuantity > 0) {
                this.orderProducts.push({
                    product: this.selectedProduct,
                    quantity: this.productQuantity,
                });
                this.selectedProduct = null;
                this.productQuantity = 1; 
            }
        },
        removeProductFromOrder(index) {
            this.orderProducts.splice(index, 1);
        },
        submitOrder() {
            if (!this.selectedCustomer) {
                alert('Proszę wybrać klienta.');
                return;
            }

            if (this.orderProducts.length === 0) {
                alert('Proszę dodać przynajmniej jeden produkt do zamówienia.');
                return;
            }

            const newOrder = {
                customer: this.selectedCustomer._id,
                date: this.orderDate,
                products: this.orderProducts.map(op => ({
                    product: op.product._id,
                    quantity: op.quantity
                }))
            };

            this.addOrder(newOrder)
                .then(() => {
                    alert('Zamówienie zostało złożone pomyślnie.');
                    this.resetOrderForm();
                })
                .catch(error => {
                    console.error('Wystąpił błąd przy składaniu zamówienia:', error);
                    alert('Nie udało się złożyć zamówienia.');
                });
        },
        resetOrderForm() {
            this.selectedCustomer = null;
            this.orderDate = new Date().toISOString().substr(0, 10);
            this.orderProducts = [];
        },

    },
};
</script>
  