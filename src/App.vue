<script setup>
import { RouterView } from 'vue-router'
import NavbarComponent from './components/NavbarComponent.vue'
import SidebarComponent from './components/SidebarComponent.vue';
</script>

<template>
  <v-app id="inspire">
    <NavbarComponent />

    <SidebarComponent />

    <v-main>
      <v-container class="py-8 px-6" fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
