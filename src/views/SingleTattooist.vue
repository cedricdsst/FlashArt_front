<style>
.author-name {
  font-size: 1.3rem;
  font-weight: 500;
}

.img-list {
  overflow: hidden;
  object-fit: cover;
}
</style>

<template>

  <NavBar />

  <v-container>
    <div class="d-flex align-center mb-5 justify-center">
      <div>
        <v-img width="75" class="rounded-circle" src="https://picsum.photos/100"></v-img>
      </div>
      <div class="ml-3">
        <v-card-text class="author-name pa-0">Jodie SABUCO</v-card-text>
        <p class="location"><strong>29</strong> Tattoos</p>
      </div>
    </div>
    <v-divider><h2>Tattoos</h2></v-divider>

    <v-container class="pl-0 pr-0">
      <v-row class="pa-0 ma-0">
        <v-col class="pa-1 mb-1">
          <v-img class="img-list" cover aspect-ratio="1" src="https://picsum.photos/500/1000"></v-img>
        </v-col>
        <v-col class="pa-1 mb-1">
          <v-img class="img-list" cover aspect-ratio="1" src="https://picsum.photos/501"></v-img>
        </v-col>
      </v-row>
      <v-row class="pa-0 ma-0">
        <v-col class="pa-1 mb-1">
          <v-img class="img-list" cover aspect-ratio="1" src="https://picsum.photos/502"></v-img>
        </v-col>
        <v-col class="pa-1 mb-1">
          <v-img class="img-list" cover aspect-ratio="1" src="https://picsum.photos/503"></v-img>
        </v-col>
      </v-row>
      <v-row class="pa-0 ma-0">
        <v-col class="pa-1 mb-1">
          <v-img class="img-list" cover aspect-ratio="1" src="https://picsum.photos/504"></v-img>
        </v-col>
        <v-col class="pa-1 mb-1">
          <v-img class="img-list" cover aspect-ratio="1" src="https://picsum.photos/505"></v-img>
        </v-col>
      </v-row>
      <v-row class="pa-0 ma-0">
        <v-col class="pa-1 mb-1">
          <v-img class="img-list" cover aspect-ratio="1" src="https://picsum.photos/506"></v-img>
        </v-col>
        <v-col class="pa-1 mb-1">
          <v-img class="img-list" cover aspect-ratio="1" src="https://picsum.photos/507"></v-img>
        </v-col>
      </v-row>
      <v-row class="pa-0 ma-0">
        <v-col class="pa-1 mb-1">
          <v-img class="img-list" cover aspect-ratio="1" src="https://picsum.photos/508"></v-img>
        </v-col>
        <v-col class="pa-1 mb-1">
          <v-img class="img-list" cover aspect-ratio="1" src="https://picsum.photos/509"></v-img>
        </v-col>
      </v-row>
      <v-row class="pa-0 ma-0">
        <v-col class="pa-1 mb-1">
          <v-img class="img-list" cover aspect-ratio="1" src="https://picsum.photos/300/3200"></v-img>
        </v-col>
        <v-col class="pa-1 mb-1">
          <v-img class="img-list" cover aspect-ratio="1" src="https://picsum.photos/511"></v-img>
        </v-col>
      </v-row>
    </v-container>


  </v-container>
</template>
<script setup lang="ts">

</script>
