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
                        <p> Jako iż aplikacja jest postawiona na lokalnym serwerze i bazie danych, proszę dodaj klika produktów oraz klientów w zakładce
                            <strong>"Admin Panel"</strong> za pomocą guzika <v-icon size="small">mdi-plus</v-icon> w prawym górnym rogu listy. 
                        </p>
                        <p> Następnie przejdź do zakładki <strong>"Formularz zamówień"</strong> i dodaj tam kilka zamówień.

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

