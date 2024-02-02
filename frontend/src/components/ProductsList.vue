<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-data-table :headers="headers"
                        :items="products"
                        :items-per-page="5"
                        class="elevation-1">
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small class="mr-2" @click="startEdit(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
            <template v-slot:[`item.price`]="props">
              <div v-if="!props.item.isEditing">
                {{ formatCurrency(props.item.price) }}
              </div>
              <v-text-field v-else
                            type="number"
                            v-model="props.item.editedPrice"
                            dense
                            single-line
                            @blur="stopEdit(props.item)"
                            @keyup.enter="stopEdit(props.item)">
                </v-text-field>
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
    ...mapGetters('products', ['products']),
  },
  methods: {
    ...mapActions('products', ['fetchProducts', 'editProduct', 'deleteProduct']),

    formatCurrency(value) {
      return `${Number(value).toFixed(2)} zł`;
    },
    startEdit(item) {
      this.$set(item, 'isEditing', true);
      this.$set(item, 'editedPrice', item.price);
    },
    stopEdit(item) {
      this.$set(item, 'isEditing', false);
      this.editProduct({
        ...item,
        price: item.editedPrice
      });
    },
    deleteItem(item) {
      const confirmDelete = confirm('Czy na pewno chcesz usunąć ten produkt?');
      if (confirmDelete) {
        this.deleteProduct(item._id);
      }
    }
  },
  mounted() {
    this.fetchProducts();
  },
  data() {
    return {
      headers: [
        { text: 'Nazwa Produktu', value: 'name' },
        { text: 'Cena', value: 'price' },
        { text: 'Akcje', value: 'actions', sortable: false },
      ],
    };
  },
};
</script>