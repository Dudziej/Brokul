<template>
    <v-dialog v-model="localDialog" 
              @keydown.esc="closeDialog" 
              max-width="400px"
              :data-testid="`add-${tag}-dialog`">
      <v-card>
        <v-card-title class="justify-space-between">
          <span>{{ dialogTitle }}</span>
          <v-btn icon @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" 
                  v-model="valid" 
                  @submit.prevent="submit">
            <div v-if="tag === 'product'">
              <v-text-field label="Nazwa produktu"
                            name="nazwa prodktu"
                            v-model="product.name"
                            :rules="[rules.required]"
                            required
                            data-testid="product-name-input">
                </v-text-field>
              <v-text-field label="Cena produktu"
                            v-model="product.price"
                            :rules="[rules.required, rules.number]"
                            required
                            type="number"
                            data-testid="product-price-input">
                </v-text-field>
            </div>
            <div v-if="tag === 'customer'">
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
            </div>
            <v-btn :disabled="!valid" 
                   type="submit" 
                   color="success"
                   data-testid="submit-button">
              Dodaj
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
</template>
  
<script>
import { mapActions } from 'vuex';

export default {
    name: 'AddDialog',
    props: {
        tag: {
            type: String,
            default: 'product',
        },
        dialog: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            localDialog: this.dialog,
            valid: false,
            product: {
                name: '',
                price: null,
            },
            customer: {
                name: '',
                address: '',
            },
            rules: {
                required: (value) => !!value || 'Pole wymagane.',
                number: (value) => !isNaN(parseFloat(value)) || 'Musi być liczbą.',
            },
        };
    },
    watch: {
        dialog(val) {
            this.localDialog = val;
        },
        localDialog(val) {
            this.$emit('update:dialog', val);
        },
    },
    computed: {
        dialogTitle() {
            return this.tag === 'product' ? 'Dodaj Produkt' : 'Dodaj Klienta';
        },
    },
    methods: {
        ...mapActions('products', ['addProduct']),
        ...mapActions('customers', ['addCustomer']),

        submit() {
            if (this.tag === 'product') {
                this.addProduct(this.product).then(() => {
                    this.closeDialog();
                });
            } else if (this.tag === 'customer') {
                this.addCustomer(this.customer).then(() => {
                    this.closeDialog();
                });
            }
        },
        resetForm() {
            this.$refs.form.reset();
            this.valid = false;
            this.product = { name: '', price: null };
            this.customer = { name: '', address: '' };
        },
        closeDialog() {
            this.localDialog = false;
            this.resetForm();
        },
    },
};
</script>
  