<style scoped>
.flash-title {
  font-size: 1.5rem;
  font-weight: 500;
}

.price {
  font-size: 1.5rem;
  font-weight: 500;
}

.profile-img + img {
  width: 10px !important;
}

.start-at {
  font-size: 0.6rem;
  width: 50%;
}

.location {
  font-size: 0.7rem;
}

.tags span {
  background-color: #f5f5f5;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  margin-right: 0.5rem;
  font-size: 0.7rem;
}
</style>

<template>

<v-card class="pb-5">
    <v-img width="100%" aspect-ratio=1/1 src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/08db6a5283557.560e68e7732c6.jpg"></v-img>
    <v-container class="tags pt-4 pb-0 ma-0">
      <span>Tag 1</span>
      <span>Tag 2</span>
      <span>Tag 3</span>
    </v-container>
    <v-container width="100%" class="pt-2 pb-1 d-flex justify-space-between align-center">
      <v-container class="pa-0 d-flex align-center">
        <div>
          <v-img :width="45" aspect-ratio="1/1" class="profile-img rounded-circle" src="https://img.freepik.com/photos-gratuite/portrait-homme-riant_23-2148859448.jpg?size=338&ext=jpg&ga=GA1.1.1413502914.1720310400&semt=ais_user"></v-img>
        </div>
        <div class="pl-4">
          <v-card-text class="pa-0">Jodie SABUCO</v-card-text>
          <p class="location"><v-icon>mdi-map-marker</v-icon> Lyon</p>
        </div>

      </v-container>
      <p class="pa-0 text-right start-at">à partir de<br> <span class="price">60€</span></p>
    </v-container>

</v-card>

</template>
<script setup lang="ts">
</script>
