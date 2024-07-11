<style scoped>

.time {
  padding: 5px;
  background-color: rgba(61, 17, 5, 0.2);
}

</style>

<template>

<v-container>
  <h2>Créneaux disponibles</h2>

<v-row v-for="index in 5" :key="index" align="center" class="mt-1">
  <v-col class="v-col-4">
    <div class="time rounded">
      <p class="text-center">01/07/25 08:00</p>
    </div>
  </v-col>
  <v-col>
    <div class="location v-col-auto pa-0">
      <p><v-icon>mdi-map-marker</v-icon> <span>Marseille</span></p>
    </div>
  </v-col>
  <v-col class="v-col-auto">
    <v-btn color="brown-darken-3" @click="book"><v-icon>mdi-calendar-month</v-icon></v-btn>
  </v-col>
</v-row>
</v-container>

</template>
<script setup lang="ts">
</script>
