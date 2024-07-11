<template>
  <v-container bg-color="#FFFFFF" class="border-b-thin">
    <v-img
      :width="100"
      aspect-ratio="16/9"
      center
      cover
      class="mx-auto"
      src="https://artfrankly.com/home/wp-content/uploads/2019/10/flash-art-logo.png"
    ></v-img>
  </v-container>

  <v-bottom-navigation grow swipe bg-color="brown-darken-3">

    <v-btn value="home" to="/">
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn value="search" to="/search">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn value="like" to="/like">
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn value="account" to="/login">
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script setup lang="ts"></script>
