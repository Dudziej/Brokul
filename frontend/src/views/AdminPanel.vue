<template>
    <v-container>
      <v-row>
        <!-- Karta do dodawania produktów -->
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Dodaj Produkt</v-card-title>
            <v-card-text>
              <v-form ref="formProduct" v-model="validProduct" @submit.prevent="submitProduct">
                <v-text-field label="Nazwa produktu" v-model="product.name" :rules="[rules.required]" required></v-text-field>
                <v-text-field label="Cena produktu" v-model="product.price" :rules="[rules.required, rules.number]" required type="number"></v-text-field>
                <v-btn :disabled="!validProduct" type="submit" color="success">Dodaj</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
  
        <!-- Karta do dodawania klientów -->
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Dodaj Klienta</v-card-title>
            <v-card-text>
              <v-form ref="formCustomer" v-model="validCustomer" @submit.prevent="submitCustomer">
                <v-text-field label="Nazwa organizacji" v-model="customer.name" :rules="[rules.required]" required></v-text-field>
                <v-text-field label="Adres" v-model="customer.address" :rules="[rules.required]" required></v-text-field>
                <v-btn :disabled="!validCustomer" type="submit" color="success">Dodaj</v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
  
        <!-- Karta do dodawania zamówień -->
        <v-col cols="12" md="4">
          <v-card>
            <v-card-title>Dodaj Zamówienie</v-card-title>
            <v-card-text>
              <v-form ref="formOrder" v-model="validOrder" @submit.prevent="addOrder">
                <!-- Tutaj formularz zamówienia -->
                <v-text-field label="ID Klienta" v-model="order.customerId" :rules="[rules.required]" required></v-text-field>
                <v-text-field label="ID Produktu" v-model="order.productId" :rules="[rules.required]" required></v-text-field>
                <v-text-field label="Ilość" v-model="order.quantity" :rules="[rules.required, rules.number]" required type="number"></v-text-field>
                <v-btn :disabled="!validOrder" type="submit" color="success">Dodaj</v-btn>
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
    ...mapActions('orders', ['addOrder']),

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
  
    submitOrder() {
      if (this.$refs.formOrder.validate()) { 
        const orderData = {
          customer: this.order.customerId,
          products: [{
            product: this.order.productId,
            quantity: parseInt(this.order.quantity)
          }]
        };

        this.addOrder(orderData) 
          .then(() => {
            alert('Zamówienie zostało dodane.');
            this.resetForm('formOrder');
          }).catch(error => {
            console.error('Wystąpił błąd:', error);
            alert('Nie udało się dodać zamówienia.');
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
      } else if (formRef === 'formOrder') {
        this.validOrder = false;
        this.order = { customerId: '', productId: '', quantity: null };
      }
    },
  },
  };
  </script>
