<style>

</style>

<template>

  <NavBar />

  <ImageIntroduction />

  <v-container>

    <!-- Menu user -->
    <v-select
      label="Aller vers ..."
      :items="['Mes informations', 'Mes reservations']"
    ></v-select>

    <h2 class="mt-5 mb-7">Modifier mes informations</h2>
    <v-form>
      <div>
        <v-label>Nom</v-label>
        <v-text-field placeholder="HINDERSCHIETTE"></v-text-field>
      </div>
      <div>
        <v-label>Prénom</v-label>
        <v-text-field placeholder="Maxime"></v-text-field>
      </div>
      <div>
        <v-label>Nom d'utilisateur</v-label>
        <v-text-field placeholder="elmax67"></v-text-field>
      </div>
      <div>
        <v-label>Email</v-label>
        <v-text-field disabled>mhin******@myges.fr</v-text-field>
        <small>Contactez l'administrateur du site pour changer votre adresse mail.</small>
      </div>
      <v-btn color="brown-darken-3" width="100%" class="mt-5" type="submit">Enregistrer</v-btn>
    </v-form>
  </v-container>



</template>

<script>


</script>
