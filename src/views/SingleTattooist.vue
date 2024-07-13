<template>
  <v-container>
    <div class="d-flex align-center mb-5 justify-center">
      <div>
        <v-img width="75" class="rounded-circle" :src="currentUser?.image || 'https://picsum.photos/100'"></v-img>
      </div>
      <div class="ml-3">
        <v-card-text class="author-name pa-0">{{ currentUser?.username }}</v-card-text>
        <p class="location"><strong>{{ currentUser?.flash.length }}</strong> Tattoos</p>
      </div>
    </div>
    <v-divider><h2>Tattoos</h2></v-divider>

    <v-container class="pl-0 pr-0">
      <v-row>
        <v-col v-for="flash in currentUser?.flash" :key="flash._id" cols="12" sm="6" md="4">
          <router-link :to="{ name: 'SingleTattooPage', params: { flashId: flash.id } }">
            <v-img class="img-list" cover aspect-ratio="1" :src="flash.image"></v-img>
          </router-link>
        </v-col>
      </v-row>
    </v-container>


  </v-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore';

const route = useRoute();
const userStore = useUserStore();
const { currentUser } = storeToRefs(userStore);

const fetchUserByUsername = async (username: string) => {
  try {
    await userStore.fetchUserByUsername(username);
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

onMounted(() => {
  const username = route.params.username;
  console.log('Fetching user with username:', username);
  fetchUserByUsername(username);
});
</script>

<style scoped>
.author-name {
  font-size: 1.3rem;
  font-weight: 500;
}

.img-list {
  overflow: hidden;
  object-fit: cover;
}

.time {
  padding: 5px;
  background-color: rgba(61, 17, 5, 0.2);
}
</style>