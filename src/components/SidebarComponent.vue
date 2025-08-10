<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const links = [
    ['mdi-home', 'Home', '/'],
    ['mdi-domain', 'Department', '/departments'],
    ['mdi-account', 'Employee', '/employees'],
]

const drawer = ref(null)
</script>

<template>
    <v-navigation-drawer v-model="drawer">
        <v-sheet class="pa-4" color="grey-lighten-4">
            <v-avatar class="mb-4" color="grey-darken-1" size="64"></v-avatar>

            <div>frans@gmail.com</div>
        </v-sheet>

        <v-divider></v-divider>

        <v-list>
            <v-list-item v-for="[icon, text, to] in links" :key="icon">
                <RouterLink :to="to" class="d-flex align-center text-decoration-none w-100"
                    active-class="sidebar-link-active">
                    <v-icon class="me-2">{{ icon }}</v-icon>
                    <span>{{ text }}</span>
                </RouterLink>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<style scoped>
a:visited {
    color: inherit;
}

.sidebar-link-active {
    color: #4f70d3 !important;
}
</style>
