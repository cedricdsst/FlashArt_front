<template>

  <ImageIntroduction class="mb-5"></ImageIntroduction>

  <v-container>

       <router-link :to="{ name: 'UserBookedPage' }" class="text-decoration-none custom-link">
         <v-btn class="mb-9">< Revenir à la liste de mes rendez-vous</v-btn>
       </router-link>


       <v-divider></v-divider>

      <h2 class="mt-5 mb-5">Informations sur le rendez-vous :</h2>


       <MapDisplay />
  </v-container>
</template>

<script lang="ts">

</script>
