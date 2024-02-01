<template>
    <v-container class="container-background">
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6">
                <v-card class="pa-5" elevation="2">
                    <v-card-title class="text-h4">
                        Witaj w moim zadaniu testowym! 
                    </v-card-title>
                    <v-card-text>
                        <p>Celem zadania było: Stworzenie aplikacji raportującej sprzedaż produktów w formie tabelarycznej dla klientów
                            za wybrany okres z możliwością filtrowania po atrybutach zamówienia.
                        </p>
                        <p>Aby dodać produkty oraz klientów do bazy danych proszę skorzystać z widoku Admin Panel.</p>
                        <p>Do uzyskania poprawnych danych w raportach i tabelkach potrzebne będą również zamówienia. Jako iż aplikacja została postawiona 
                            na lokalnej bazie danych, proszę o dodanie kilku produktów oraz klientów. Następnie proszę o dodanie kilku zamówień na widoku "Formularz zamówień".
                        </p>
                        <p>Po tych kilku prostych krokach, aplikacja powinna działać w pełnej okazałości! </p>
                        <p>Skorzystaj z menu nawigacji, aby odkryć więcej funkcji.</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
  
<script>
export default {
    name: 'Home-View',
}
</script>

<style scoped>
.container-background {
  background-image: url('~@/assets/OG_Diety_od_Broku_a.jpg');
  background-size: cover;
  background-position: center center; 
  height: 80vh;
}
</style>

