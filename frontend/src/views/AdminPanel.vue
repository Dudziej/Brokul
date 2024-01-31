<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>Dodaj Produkt</v-card-title>
                    <v-card-text>
                        <v-form ref="formProduct" 
                                v-model="validProduct" 
                                @submit.prevent="submitProduct">
                            <v-text-field label="Nazwa produktu" 
                                          v-model="product.name" 
                                          :rules="[rules.required]"
                                          required>
                                        </v-text-field>
                            <v-text-field label="Cena produktu" 
                                          v-model="product.price"
                                          :rules="[rules.required, rules.number]" 
                                          required 
                                          type="number">
                                        </v-text-field>
                            <v-btn :disabled="!validProduct" 
                                   type="submit" 
                                   color="success">
                                   Dodaj
                                </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>

            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>Dodaj Klienta</v-card-title>
                    <v-card-text>
                        <v-form ref="formCustomer" 
                                v-model="validCustomer" 
                                @submit.prevent="submitCustomer">
                            <v-text-field label="Nazwa organizacji" 
                                          v-model="customer.name" 
                                          :rules="[rules.required]"
                                          required>
                                        </v-text-field>
                            <v-text-field label="Adres" 
                                          v-model="customer.address" 
                                          :rules="[rules.required]"
                                          required>
                                        </v-text-field>
                            <v-btn :disabled="!validCustomer" 
                                   type="submit" 
                                   color="success">
                                   Dodaj
                                </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
import { mapActions } from 'vuex';

export default {
    name: 'Admin-Panel',
    data() {
        return {
            validProduct: false,
            product: {
                name: '',
                price: null,
            },
            validCustomer: false,
            customer: {
                name: '',
                address: '',
            },
            validOrder: false,
            order: {
                customerId: '',
                productId: '',
                quantity: null,
            },
            rules: {
                required: value => !!value || 'Pole wymagane.',
                number: value => !isNaN(parseFloat(value)) || 'Musi być liczbą.',
            },
        };
    },
    methods: {
        ...mapActions('products', ['addProduct']),
        ...mapActions('customers', ['addCustomer']),

        submitProduct() {
            if (this.$refs.formProduct.validate()) {
                this.addProduct({
                    name: this.product.name,
                    price: this.product.price,
                }).then(() => {
                    alert('Produkt został dodany.');
                    this.resetForm('formProduct');
                }).catch(error => {
                    console.error('Wystąpił błąd:', error);
                    alert('Nie udało się dodać produktu.');
                });
            }
        },

        submitCustomer() {
            if (this.$refs.formCustomer.validate()) {
                this.addCustomer({
                    name: this.customer.name,
                    address: this.customer.address,
                }).then(() => {
                    alert('Klient został dodany.');
                    this.resetForm('formCustomer');
                }).catch(error => {
                    console.error('Wystąpił błąd:', error);
                    alert('Nie udało się dodać klienta.');
                });
            }
        },

        resetForm(formRef) {
            this.$refs[formRef].reset();
            if (formRef === 'formProduct') {
                this.validProduct = false;
                this.product = { name: '', price: null };
            } else if (formRef === 'formCustomer') {
                this.validCustomer = false;
                this.customer = { name: '', address: '' };
            }
        },
    },
};
</script>
